import express from "express"
import { getJobs, getJobById } from "../controllers/jobs";

const router = express.Router();

router.get("/", getJobs);

router.get("/:jobId", getJobById)

export default router
