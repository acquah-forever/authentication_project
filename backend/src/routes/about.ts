import express from "express"
import{ getAuthenticatedUser, createAbout, updateAbout } from "../controllers/about"

const router = express.Router()

router.get("/", getAuthenticatedUser)
router.post("/", createAbout)
router.post("/:id", updateAbout)

export default router