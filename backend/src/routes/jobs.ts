import express from "express"
import { getDatum, getData } from "../controllers/jobs";

const router = express.Router();

router.get("/", getDatum);

router.get("/:jodId", getData)

export default router
