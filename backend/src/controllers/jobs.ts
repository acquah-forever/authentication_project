import { RequestHandler } from "express"
import  createHttpError  from "http-errors"
import Jobs from "../models/jobs"
import mongoose from "mongoose"
import { ZodError } from "zod"
import { createJobSchema } from "../validation/jobs"
import { uploadToCloudinary } from "../util/uploadToCloudinary"
import cloudinary from "../util/cloudinary"

export const getJobs: RequestHandler = async (req, res, next) => {
    try {
        const jobs = await Jobs.find().exec();
        res.status(200).json(jobs);
    }
    catch (error) {
        next(error)
    }
}

export const createJob: RequestHandler = async (req, res, next) => {
    let imagePublicId: string | undefined;

    try {
        if (!req.session.userId) {
            throw createHttpError(401, "User not authenticated");
        }

        if (!req.file) {
            throw createHttpError(400, "Company logo is required (file field: logo)");
        }

        const jobData = createJobSchema.parse(req.body);
        const uploadedImage = await uploadToCloudinary(req.file.buffer, "job-company-logos");
        imagePublicId = uploadedImage.public_id;

        const job = await Jobs.create({
            ...jobData,
            imageUrl: uploadedImage.secure_url,
            imagePublicId: uploadedImage.public_id,
        });

        res.status(201).json(job);
    } catch (error) {
        // Avoid leaving an unreferenced Cloudinary image if saving the listing fails.
        if (imagePublicId) {
            try {
                await cloudinary.uploader.destroy(imagePublicId, { resource_type: "image" });
            } catch (cleanupError) {
                console.error("Failed to remove an orphaned job logo from Cloudinary", cleanupError);
            }
        }

        if (error instanceof ZodError) {
            return next(createHttpError(400, "Invalid job data"));
        }
        next(error);
    }
}

export const getJobById: RequestHandler = async (req, res, next) => {
    try {
        const jobId = req.params.jobId
        
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
