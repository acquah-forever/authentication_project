import express from "express"
import { getAuthenticatedUser, createApplication } from "../controllers/application"


const router = express.Router()

router.get("/", getAuthenticatedUser )

router.post("/", createApplication) 

export default router

