import Profile from '../models/profile'
import createHttpError, { CreateHttpError } from 'http-errors'
import { RequestHandler } from 'express'
import mongoose from 'mongoose'

export const getProfile: RequestHandler = async (req, res, next) => {
    try {
        const userId = req.session.userId
        if (!userId) {
            throw createHttpError(401, "User not authenticated")
        }
        const userProfile = await Profile.findOne({ user: userId }).exec()
        if (!userProfile) {
            throw createHttpError(404, "Profile not found")
        }
        res.status(200).json(userProfile)
    }
    catch (error) {
        next(error)
    }
}

interface Update {
    firstName?: string,
    lastName?: string,
    country?: string,
    education?: string,
    industry?: string,
    phoneNumber?: number,
    website?: string

}

export const updateProfile: RequestHandler<{ id: string }, unknown, Update, unknown> = async (req, res, next) => {
    try {
        const { firstName, lastName, country, education, industry, phoneNumber, website } = req.body

        const profileId = req.params.id

        if (!mongoose.isValidObjectId(profileId)) {
            throw createHttpError(401, "Invalid id")
        }

        const updatedProfile = await Profile.findByIdAndUpdate(profileId, {
            firstName,
            lastName,
            country,
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