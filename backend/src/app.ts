import express {Request, Response, NextFunction} from "express"
import createHttpError, { isHttpError} from "http-errors"


const app = express()

app.use(express.json())

export default app