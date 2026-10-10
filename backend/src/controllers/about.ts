import About from "../models/about"
import Profile from "../models/profile"
import { RequestHandler } from "express"
import createHttpError from "http-errors"
import mongoose from "mongoose"
import { ZodError } from 'zod'
import { aboutSchema } from '../validation/about'


export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {
    try {
        const authenticatedUser = req.session.userId

        if (!authenticatedUser) {
            throw createHttpError(401, "User not authenticated")
        }

        const existingUser = await Profile.findOne({ user: authenticatedUser }).exec()
        if (!existingUser) {
            throw createHttpError(404, "User not found")
        }
        res.status(200).json({ user: existingUser })

    }
    catch (error) {
        next(error)
    }

}

export const getAbout: RequestHandler = async (req, res, next) => {
    try {
        const authenticatedUser = req.session.userId

        if (!authenticatedUser) {
            throw createHttpError(401, "User not authenticated")
        }

        const existingAbout = await About.findOne({ user: authenticatedUser, }).exec()

        if (!existingAbout) {
            throw createHttpError(404, "About details not found")
        }

        res.status(200).json(existingAbout)
    }
        catch (error) {
            if (error instanceof ZodError) {
                throw createHttpError(400, "Invalid application data")
            }
            next(error)
        }
}

interface AboutData {
    about: string
}

export const createAbout: RequestHandler<unknown, unknown, AboutData, unknown> = async (req, res, next) => {
    try {

        const authenticatedUser = req.session.userId
        if (!authenticatedUser) {
            throw createHttpError(401, "User not authenticated")

        }

        const validateData = aboutSchema.parse(req.body)

        const { about } = validateData


        const existingAbout = await About.exists({ user: authenticatedUser, about })
        if (existingAbout) {
            throw createHttpError(409, "About details already exists")
        }

        const newAbout = await About.create({
            user: authenticatedUser,
            about,
        })

        res.status(201).json(newAbout)

    }
    catch (error) {
        next(error)
    }
}

export const updateAbout: RequestHandler<{ id: string }, unknown, AboutData, unknown> = async (req, res, next) => {
    try {
        const authenticatedUser = req.session.userId

        if (!authenticatedUser) {
            throw createHttpError(401, "User not authenticated")
        }

        const validateData = aboutSchema.parse(req.body)
        
        const { about } = validateData


        const aboutId = req.params.id
        if (!mongoose.isValidObjectId(aboutId)) {
            throw createHttpError(400, "Invalid about id")
        }

        const updatedAbout = await About.findOneAndUpdate({ _id: aboutId, user: authenticatedUser }, {
            about,
        },
            {
                new: true,
                runValidators: true
            }
        ).exec()

        res.status(200).json(updatedAbout)


    }
    catch (error) {
        next(error)
    }
}

