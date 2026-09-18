import Profile from '../models/profile'
import createHttpError from 'http-errors'
import { RequestHandler } from 'express'
import mongoose from 'mongoose'

export const getProfile: RequestHandler = async (req, res, next) => {
    try {
        const authenticatedUser = req.session.userId

        if (!authenticatedUser) {
            throw createHttpError(401, "User not authenticated")
        }
        const existingUser = await Profile.findOne({ user: authenticatedUser }).exec()
        if (!existingUser) {
            throw createHttpError(404, "Profile not found")
        }
        res.status(200).json(existingUser)
    }
    catch (error) {
        next(error)
    }
}

interface ProfileInput {
    firstName: string,
    lastName: string,
    country: string,
    organization: string,
    education: string,
    industry: string,
    phoneNumber: string,
    website: string
}


export const createProfile: RequestHandler<unknown, unknown, ProfileInput, unknown> = async (req, res, next) => {
    try {
        const authenticatedUser = req.session.userId

        if (!authenticatedUser) {
            throw createHttpError(401, "User not authenticated")
        }

        const { firstName, lastName, country, organization, education, industry, phoneNumber, website } = req.body

        if (typeof firstName !== "string" || typeof lastName !== "string" || typeof organization !== "string" || typeof education !== "string" || industry !== "string" || typeof website !== "string") {
            throw createHttpError(400, "Invalid Parameters")
        }

        if (typeof phoneNumber !== "number") {
            throw createHttpError(400, "Invalid Parameter")
        }

        const existingProfile = await Profile.exists({ user: authenticatedUser })
        if (existingProfile) {
            throw createHttpError(409, "Profile already exists")
        }

        const profile = await Profile.create({
            firstName,
            lastName,
            country,
            organization,
            education,
            industry,
            phoneNumber,
            website,
            user: authenticatedUser
        })
        res.status(201).json(profile)
    }
    catch (error) {
        next(error)
    }
}

interface Update extends Partial<ProfileInput> { }


export const updateProfile: RequestHandler<{ id: string }, unknown, Update, unknown> = async (req, res, next) => {
    try {
        const authenticatedUser = req.session.userId

        if (!authenticatedUser) {
            throw createHttpError(401, "User not authenticated")
        }

        const { firstName, lastName, country, organization, education, industry, phoneNumber, website } = req.body

        if (typeof firstName !== "string" || typeof lastName !== "string" || typeof organization !== "string" || typeof education !== "string" || industry !== "string" || typeof website !== "string") {
            throw createHttpError(400, "Invalid Parameters")
        }

        if (typeof phoneNumber !== "number") {
            throw createHttpError(400, "Invalid Parameter")
        }

        const profileId = req.params.id

        if (!mongoose.isValidObjectId(profileId)) {
            throw createHttpError(400, "Invalid profile id")
        }

        const updatedProfile = await Profile.findOneAndUpdate({ _id: profileId, user: authenticatedUser }, {
            firstName,
            lastName,
            country,
            organization,
            education,
            industry,
            phoneNumber,
            website
        },
            {
                new: true,
                runValidators: true
            }
        ).exec()

        if (!updatedProfile) {
            throw createHttpError(404, "Profile not found")
        }

        res.status(200).json(updatedProfile)

    }
    catch (error) {
        next(error)
    }
}
