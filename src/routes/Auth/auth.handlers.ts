import { RequestHandler } from "express";
import { catchAsync, responseHandler } from "../../utils/catchAndThrow";
import AppError from "../../utils/AppError";
import { createToken } from "../../utils/token";
import { IUser, LoginKey } from "../../repo/users.repo";
import { isValidEmail, isValidPhoneNumber } from "../../utils/validators";

export const signUp: RequestHandler = catchAsync( async(req, res, next) => {
    const {usersRepo, addressRepo, citizenShipRepo } = req.env

    const citizen = await citizenShipRepo.citizenshipRegistration(req.body)
    const addr = await addressRepo.addressRegistration(req.body)
    const val  = await usersRepo.userRegistration(req.body, addr, citizen)
    
    if (!val) return next(new AppError(500, 'Unexpected error occured. Could not create an user at the moment. Please try again later'))
    const user = await usersRepo.fetchUser(`${val}`)
    
    const token = createToken({
        id: user.id,
        role: user.role,
        is_active: user.is_active
    })
    const payload = Object.assign({
        ...user,
        token: token,
    })
    
    responseHandler('registration successfull', payload,res, 200)
})

export const login: RequestHandler = catchAsync( async( req, res, next) => {
    const { username, password } = req.body
    let key = LoginKey.USERNAME;
    if (isValidEmail(username)) {
      key = LoginKey.EMAIL;
    } else if (isValidPhoneNumber(username)) {
      key = LoginKey.PHONE;
    }

    const Id = await req.env.usersRepo.loginUser({key, username, password})

    if(Id === 0)  return next(new AppError(404, 'User not found'))
    const returnUser: IUser = await req.env.usersRepo.fetchUser(Id)
    
    const token = createToken({
        id: returnUser.id,
        role: returnUser.role,
        is_active: returnUser.is_active
    })

    const payload = Object.assign({
        ...returnUser,
        token: token,
    })

    responseHandler('log in success', payload, res, 200)
})