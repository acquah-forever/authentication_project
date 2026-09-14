import express from "express"
import { createProfile, getProfile, updateProfile } from "../controllers/profile"

const router = express.Router()

router.get("/", getProfile)
router.post("/", createProfile)
router.patch("/:id", updateProfile)

export default router
