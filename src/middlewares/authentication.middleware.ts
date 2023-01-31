import { RequestHandler } from "express";
import { JsonWebTokenError } from "jsonwebtoken";
import { verifyToken } from "../utils/token";
import { catchAsync } from "../utils/catchAndThrow";
import AppError from "../utils/AppError";
import Token from "../interface/token.interface";
import { BeforeRegistration, IUser } from "../repo/users.repo";

export const authenticate: RequestHandler = catchAsync(async (req, res,next) => {
    const bearer = req.headers.authorization
    if(!bearer || !bearer.startsWith('Bearer ')) return next(new AppError(401, 'Token not found, or Token error'))
    const accessToken = bearer.split('Bearer ')[1].trim()

    const payload: Token | JsonWebTokenError = await verifyToken(accessToken)
    if(payload instanceof JsonWebTokenError) return next(new AppError(401, 'Unauthorized'))
    const user: IUser = await req.env.usersRepo.fetchUser(payload.id)
    if(!user) return next(new AppError(404, 'User not encrypted with this id'))
    
    req.user = user
    
    next()
})

export const beforeRegistration: RequestHandler = catchAsync( async( req, res, next) => {
    const { email, username, phoneNumber } = req.body
    const user: BeforeRegistration = Object.assign({
        email,
        username,
        phoneNumber
    })
    const result = await req.env.usersRepo.isUserValid(user)

    if(!result) return next()
    else return next(new AppError(400, 'User with thi credentials already exists'))
})