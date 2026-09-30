import Profile from '../models/profile'
import Application from '../models/applications'
import { RequestHandler } from 'express'
import createHttpError from 'http-errors'
import { ZodError } from 'zod'
import { applicationSchema } from '../validation/application'


export const getAuthenticatedProfile: RequestHandler = async (req, res, next) => {
    try {
        const authenticatedProfile = req.session.userId

        if (!authenticatedProfile) {
            throw createHttpError(401, "User not authenticated")
        }

        const existingProfile = await Profile.findOne({ user: authenticatedProfile }).exec()
        if (!existingProfile) {
            throw createHttpError(404, "Profile not found")
        }

        res.status(200).json(existingProfile)
    }
    catch (error) {
        next(error)
    }
}

type SkillLevel =
    | ""
    | "beginner"
    | "intermediate"
    | "advanced"
    | "expert"


interface ApplyValue {
    job:string,
    name: string,
    email: string,
    phone: string,
    location: string,
    linkedin: string,
    github: string,
    portfolio: string,
    resume: string,
    experience: string,
    strongest: string,
    projectLink: string,
    llm: string,
    frontend: SkillLevel,
    backend: SkillLevel,
    databases: SkillLevel,
    aiCodingTools: SkillLevel,
    systems: string,
    interest: string,
    aiTools: string,
    confirm1: boolean,
    confirm2: boolean
}

export const createApplication: RequestHandler<unknown, unknown, ApplyValue, unknown> = async (req, res, next) => {
    try {

        const authenticatedUser = req.session.userId

        if (!authenticatedUser) {
            throw createHttpError(401, "User not authenticated")
        }

        const validateData = applicationSchema.parse(req.body)

        const {
            job,
            name,
            email,
            phone,
            location,
            linkedin,
            github,
            portfolio,
            resume,
            experience,
            strongest,
            projectLink,
            llm,
            frontend,
            backend,
            databases,
            aiCodingTools,
            systems,
            interest,
            aiTools,
            confirm1,
            confirm2
        } = validateData



        const existingApplication = await Application.exists({ user: authenticatedUser, job })

        if (existingApplication) {
            throw createHttpError(409, "Application already sent for this job")
        }

        const newApplication = await Application.create({
            user: authenticatedUser,
            job,
            name,
            email,
            phone,
            location,
            linkedin,
            github,
            portfolio,
            resume,
            experience,
            strongest,
            projectLink,
            llm,
            frontend,
            backend,
            databases,
            aiCodingTools,
            systems,
            interest,
            aiTools,
            confirm1,
            confirm2
        })

        res.status(201).json(newApplication)

    }
    catch (error) {
        if (error instanceof ZodError) {
            throw createHttpError(400, "Invalid application data")
        }
        next(error)
    }
}