import express from "express"
import { getAuthenticatedUser, signup, login, logout} from '../controllers/users'

const route = express.Router()

app.get("/", getAuthenticatedUser);

app.post("/signup", signup);

app.post("/login", login);

app.post("/logout", logout);

export default route