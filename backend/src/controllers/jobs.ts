import { RequestHandler } from "express"
import { CreateHttpError } from "http-errors"
import Jobs from "../models/jobs"
import mongoose from "mongoose"

export const getDatum: RequestHandler = async (req, res, next) => {
    try {
        const jobs = await Jobs.find().exec();
        res.status(200).json(jobs);
    }
    catch (error) {
        next(error)
    }
}

export const getData: RequestHandler = async (req, res, next) => {
    try {

    }
    catch(error) {
        next(error)
    }
}