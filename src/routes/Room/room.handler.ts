import { RequestHandler } from "express";
import { catchAsync, responseHandler } from "../../utils/catchAndThrow";
import AppError from "../../utils/AppError";

export const createRoom: RequestHandler = catchAsync( async(req, res, next) => {
    const { addressRepo, roomRepo, usersRepo }  = req.env
    
    const user = await usersRepo.fetchUser(req.params.userId)
    if(!user) return next(new AppError(403, 'You have no access to this route'))

    const addr = await addressRepo.addressRegistration(req.body)
    if(!addr) return next(new AppError(400, 'Address not created'))

    const room = await roomRepo.createRoom(req.body, addr, req.params.userId)
    
    responseHandler('Room has been created', { room }, res, 200)
})

export const getAllRooms: RequestHandler = catchAsync( async(req, res, next) => {
    const room = await req.env.roomRepo.fetchRooms(req)
    if(!room.room) return next(new AppError(404, 'Could not fetch room currently'))

    const payload = Object.assign({
        room: room.room,
        offset: room.offset,
        limit: room.limit,
        total: room.total
    })
    responseHandler('room list fetch successfully.', payload, res, 200)
})