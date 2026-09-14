import Profile from '../models/profile'
import createHttpError from 'http-errors'
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

interface ProfileInput {
    firstName: string,
    lastName: string,
    country: string,
    education: string,
    organization: string,
    phoneNumber: string,
    website: string
}

interface Update extends Partial<ProfileInput> {}

export const createProfile: RequestHandler<unknown, unknown, ProfileInput, unknown> = async (req, res, next) => {
    try {
        const userId = req.session.userId
        if (!userId) {
            throw createHttpError(401, "User not authenticated")
        }

        const existingProfile = await Profile.exists({ user: userId })
        if (existingProfile) {
            throw createHttpError(409, "Profile already exists")
        }

        const profile = await Profile.create({ ...req.body, user: userId })
        res.status(201).json(profile)
    }
    catch (error) {
        next(error)
    }
}

export const updateProfile: RequestHandler<{ id: string }, unknown, Update, unknown> = async (req, res, next) => {
    try {
        const userId = req.session.userId
        if (!userId) {
            throw createHttpError(401, "User not authenticated")
        }

        const { firstName, lastName, country, education, organization, phoneNumber, website } = req.body

        const profileId = req.params.id

        if (!mongoose.isValidObjectId(profileId)) {
            throw createHttpError(400, "Invalid profile id")
        }

        const updatedProfile = await Profile.findOneAndUpdate({ _id: profileId, user: userId }, {
            firstName,
            lastName,
            country,
            education,
            organization,
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
