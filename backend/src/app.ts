import "dot/env"
import route from "./routes/users"
import express {Request, Response, NextFunction} from "express"
import createHttpError, { isHttpError} from "http-errors"


const app = express()

app.use(express.json())

app.use("/api/users", route)

app.use()

export default app