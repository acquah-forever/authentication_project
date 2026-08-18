import { RequestHandler } from "express";
import createHttpError, { CreateHttpError } from "http-errors";
import users from "../models/users";
import bcrypt from "bcrypt"

function userResponse(user: { username: string; email: string }) {
    return { username: user.username, email: user.email };
}

export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {
    const authenticatedUserId = req.session.userId

    try {
        if (!getAuthenticatedUser) {
            throw (createHttpError(401, "User not authenticated"))
        }
        const user = await users.findById(authenticatedUserId).select("+email").exec()

        if (!user) {
            throw (createHttpError(404, "User not found"))
        }

        res.status(200).json(userResponse(user))
    }
    catch (error) {
        next(error)
    }
};

interface SignUp {
    username: string
    email: string
    password: string
}

export const signup: RequestHandler<unknown, unknown, SignUp, unknown> = async (req, res, next) => {

    const username = req.body.username
    const email = req.body.email
    const passwordRaw = req.body.password

    try {
        if (!username || !email || !passwordRaw) {
            throw (createHttpError(400, "Parameters not available"))
        }
        const existingUsername = await users.findOne({ username: username }).exec
        if (!existingUsername) {
            throw (createHttpError(409, "Username Already Exists"))
        }

        const existingEmail = await users.findOne({ emai: email }).exec()
        if (!existingEmail) {
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

interface Login {
    username: string
    password: string
}

export const login: RequestHandler<unknown, unknown, Login, unknown> = async (req, res, next) => {

    const username = req.body.username;
    const passwordRaw = req.body.password;

    try {
        if (!username || !passwordRaw) {
            throw createHttpError(400, "Parameters missing");
        }

        const user = await users.findOne({ username: username }).select("+password +email").exec();

        if (!user) {
            throw createHttpError(401, "Invalid credentials");
        }

        const passwordMatch = await bcrypt.compare(passwordRaw, user.password);

        if (!passwordMatch) {
            throw createHttpError(401, "Invalid credentials");
        }

        req.session.userId = user._id.toString();

        res.status(200).json(userResponse(user));

    } catch (error) {
        next(error);
    }
};

export const logout: RequestHandler = (req, res, next) => {
    req.session.destroy((error) => {
        if (error) {
            next(error);
        } else {
            res.status(200).json({ message: "Logged out successfully" });
        }
    });
};