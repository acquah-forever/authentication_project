import { RequestHandler } from "express";
import createHttpError, { CreateHttpError } from "http-errors";
import users from "../models/users";
import bcrypt from "bcrypt"

function userResponse(user: { username: string; email: string }) {
    return { username: user.username, email: user.email };
}

export const getAuthenticatedUser:RequestHandler = async ( req, res, next) => {
    const authenticatedUserId = req.session.userId

    try{
        if(!getAuthenticatedUser) {
            throw (createHttpError(401,"User not authenticated"))
        }
        const user = await users.findById(authenticatedUserId).select("+email").exec()

        if(!user) {
            throw (createHttpError(404,"User not found"))
        }

        res.status(200).json(userResponse(user))
    }
    catch(error) {
        next(error)
    }
};

interface SignUp {
    username: string,
    email: string:
    passwordRaw: string
}

export const signup:RequestHandler< unknown, unknown,SignUp, unknown > = async (req, res, next) => {

    const username = req.body.username
    const email = req.body.email
    const password = req.body.passwordRaw

    try {
        if(!username || !email || !password) {
            throw(createHttpError(401, "Parameters not available"))
        }

    }
    catch(error){
        next(error)
    }
}