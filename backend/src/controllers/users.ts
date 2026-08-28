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
    try {
        const authenticatedUser = req.session.userId

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

    try {
        const { username, email, password: passwordRaw } = req.body

        // Runtime type validation
        if (typeof username !== "string" || typeof email !== "string" || typeof passwordRaw !== "string") {
            throw (createHttpError(400, "Invalid Parameters"))
        }

        // Normalize input
        const usernameTrimmed = username.trim()
        const emailTrimmed = email.trim()
        const password = passwordRaw

        // Validate empty values
        if (!usernameTrimmed || !emailTrimmed || !password) {
            throw (createHttpError(400, "Parameters missing"))
        }

        // Enforce field limits before database queries
        if (usernameTrimmed.length > 50) {
            throw (createHttpError(400, "Username is too long"))
        }

        if (emailTrimmed.length > 254) {
            throw (createHttpError(400, "Email is too long"))
        }

        if (!password || password.length > 128) {
            throw createHttpError(400, "Password is too long")
        }

        const existingUsername = await users.findOne({ username: usernameTrimmed }).exec()
        if (existingUsername) {
            throw (createHttpError(409, "Username Already Exists"))
        }

        const existingEmail = await users.findOne({ email: emailTrimmed }).exec()
        if (existingEmail) {
            throw (createHttpError(409, "Email Already Exists"))
        }

        const passwordHashed = await bcrypt.hash(passwordRaw, 12)

        const newUser = await users.create({
            username: usernameTrimmed,
            email: emailTrimmed,
            password: passwordHashed,
        })

        req.session.regenerate((error) => {
            if (error) {
                return next(error)
            }
            req.session.userId = newUser._id.toString()
            res.status(201).json(userResponse(newUser))
        })
    }
    catch (error) {
       return next(error)
    }
}

interface LogIn {
    username: string
    password: string
}

export const login: RequestHandler<unknown, unknown, LogIn, unknown> = async (req, res, next) => {

    try {
        const { username, password: passwordRaw } = req.body

        if (typeof username !== "string" || typeof passwordRaw !== "string") {
            throw (createHttpError(400, "Invalid Parameters"))
        }

        const usernameTrimmed = username.trim()
        const password = passwordRaw

        if (!usernameTrimmed || !password) {
            throw (createHttpError(400, "Parameters missing"))
        }

        const user = await users.findOne({ username: usernameTrimmed }).select("+password +email").exec()
        if (!user) {
            throw (createHttpError(401, "Invalid Credentials"))
        }

        const passwordMatch = await bcrypt.compare(password, user.password)
        if (!passwordMatch) {
            throw (createHttpError(401, "Invalid Credentials"))
        }

        req.session.regenerate((error) => {
            if (error) {
                return next(error)
            }
            req.session.userId = user._id.toString()
            res.status(201).json(userResponse(user))
        })
    }
    catch (error) {
        next(error)
    }
}

export const logout: RequestHandler = (req, res, next) => {
    req.session.destroy((error) => {
        if (error) {
            return next(error)
        } else {
            res.status(201).json({ message: "Logged out" })
        }
    })
}
