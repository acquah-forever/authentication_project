import express from "express"
import{ getAbout, createAbout, updateAbout } from "../controllers/about"

const router = express.Router()

router.get("/", getAbout)
router.post("/", createAbout)
router.post("/:id", updateAbout)