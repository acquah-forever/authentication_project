import "dotenv/config"
import express, { Request, Response, NextFunction } from "express"
import cors from "cors";
import createHttpError, { isHttpError } from "http-errors"
import router from "./routes/users"
import jobs from "./routes/jobs"
import session from "express-session";
import env from "./util/validateEnv";
import MongoStore from "connect-mongo";


const app = express()

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.set("trust proxy", 1);

app.use(express.json())

app.get("/", (req, res) => {
  res.json({
    message: "Backend is running smoothly"
  });
});



app.use(session({
  name: "sessionId",
  secret: env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  },
  rolling: true, // Reset the cookie expiration time on every request

  // where session data will be stored
  store: MongoStore.create({
    mongoUrl: env.MONGO_CONNECTION_STRING,
    collectionName: "sessions",
  }),
}));

app.use("/api/users", router)
app.use("/api/jobs", jobs)

app.use((req, res, next) => {
  next(createHttpError(404, "Endpoint not found"))
})

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {

  let statusCode = 500;
  let errorMessage = "An unknown error occurred";

  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }

  res.status(statusCode).json({ error: errorMessage });
});

export default app
