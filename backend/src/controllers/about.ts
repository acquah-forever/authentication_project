import About from "../models/about"
import Profile from "../models/profile"
import { RequestHandler } from "express"
import createHttpError from "http-errors"
import mongoose from "mongoose"

export const getAuthenticatedUser: RequestHandler = async(req, res, next) => {
    try{
        const authenticatedUser = req.session.userId

        if(!authenticatedUser) {
            throw createHttpError(401, "User not authenticated")
        }

        const existingUser = await Profile.findOne({user: authenticatedUser}).exec()
        if(!existingUser) {
            throw createHttpError(404, "User not found")
        }
        res.status(200).json({user: existingUser})

    }
    catch(error) {
        next(error)
    }

}

interface AboutData {
    about: string
}

export const getAbout: RequestHandler<unknown, unknown, AboutData, unknown> = async(req, res, next) => {
    try {

        const{ about } = req.body

        if(typeof about !== "string") {
            throw createHttpError(400, "Invalid Parameters")
        }

        const existingAbout = await About.exists({user: authenticatedUser, about})

        if(existingAbout) {
            throw createHttpError(400, "About details already exists")
        }

        const newAbout = await About.create({
            user: getAuthenticatedUser,
            about
        })

        res.status(201).json(newAbout)

    }
    catch(error) {
        next(error)
    }
}

