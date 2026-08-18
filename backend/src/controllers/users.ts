import { RequestHandler } from "express";
import bcrypt from "bcrypt"
import users from "../models/users"
import createHttpError from "http-errors";

function userResponse(user: { username: string; email: string }) {
    return {
        username: user.username,
        email: user.email,
    };
}

export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {
    const authenticatedUser = req.session.userId
    try {

        if (!authenticatedUser) {
            throw (createHttpError(401, "User not authenticated"))
        }
        const user = await users.findById(authenticatedUser).select("+email").exec()
        if (!user) {
            throw (createHttpError(404, "User not found"))
        }
        res.status(200).json(userResponse(user))

    }
    catch (error) {
        next(error)
    }
}

interface SignUp {
    username: string
    email: string
    password: string
}

export const signup: RequestHandler<unknown, unknown, SignUp, unknown> = async (req, res, next) => {
    const { username, email, password: passwordRaw } = req.body

    try {
        if (!username || !email || !passwordRaw) {
            throw (createHttpError(400, "Parameters missing"))
        }

        const existingUsername = await users.findOne({ username: username }).exec()
        if (existingUsername) {
            throw (createHttpError(409, "Username Already Exists"))
        }

        const existingEmail = await users.findOne({ email: email }).exec()
        if (existingEmail) {
            throw (createHttpError(409, "Email Already Exists"))
        }

        const passwordHashed = await bcrypt.hash(passwordRaw, 12)

        const newUser = await users.create({ username, email, password: passwordHashed })

        req.session.userId = newUser._id.toString()

        res.status(201).json(userResponse(newUser))
    }
    catch (error) {
        next(error)
    }
}

interface LogIn {
    username: string
    password: string
}

export const login: RequestHandler<unknown, unknown, LogIn, unknown> = async (req, res, next) => {
const { username, password: passwordRaw } = req.body

    try {
        if (!username || !passwordRaw) {
            throw (createHttpError(400, "Parameters missing"))
        }

        const user = await users.findOne({ username: username }).select("+password +email").exec()
        if (!user) {
            throw (createHttpError(401, "Invalid Credentials"))
        }

        const passwordMatch = await bcrypt.compare(passwordRaw, user.password)
        if (!passwordMatch) {
            throw (createHttpError(401, "Invalid Credentials"))
        }

        req.session.userId = user._id.toString()

        res.status(201).json(userResponse(user))

    }
    catch (error) {
        next(error)
    }
}

export const logout: RequestHandler = (req, res, next) => {
    req.session.destroy((error) => {
        if (error) {
            next(error)
        } else {
            res.status(201).json({ message: "Logged out successfully" })
        }
    })
}