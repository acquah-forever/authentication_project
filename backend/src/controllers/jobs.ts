import { RequestHandler } from "express"
import  createHttpError  from "http-errors"
import Jobs from "../models/jobs"
import mongoose from "mongoose"

export const getJobs: RequestHandler = async (req, res, next) => {
    try {
        const jobs = await Jobs.find().exec();
        res.status(200).json(jobs);
    }
    catch (error) {
        next(error)
    }
}

export const getJobById: RequestHandler = async (req, res, next) => {
    const jobId = req.params.jobId
    try {

        if (!mongoose.isValidObjectId(jobId)) {
            throw createHttpError(400, "Invalid Job Id")
        }
        const job = await Jobs.findById(jobId).exec();
        if (!job) {
            throw createHttpError(404, "Job not found")
        }
        res.status(200).json(job);
    }
    catch (error) {
        next(error)
    }
}