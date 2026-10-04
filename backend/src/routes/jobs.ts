import express from "express"
import { createJob, getJobs, getJobById } from "../controllers/jobs";
import upload from "../middleware/upload";

const router = express.Router();

router.post("/", upload.single("logo"), createJob);

router.get("/", getJobs);

router.get("/:jobId", getJobById)

export default router
