import express from "express"
import { getAuthenticatedProfile, createApplication } from "../controllers/application"


const router = express.Router()

router.get("/", getAuthenticatedProfile )

router.post("/", createApplication) 

export default router

