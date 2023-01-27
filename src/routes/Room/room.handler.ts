import { RequestHandler } from "express";
import { catchAsync, paginatedResponse, responseHandler } from "../../utils/catchAndThrow";
import AppError from "../../utils/AppError";

export const createRoom: RequestHandler = catchAsync( async(req, res, next) => {
    
    const user = req.user
    if(!user) return next(new AppError(403, 'You have no access to this route'))
    
    const { addressRepo, roomRepo }  = req.env

    const addr = await addressRepo.addressRegistration(req.body)
    if(!addr) return next(new AppError(400, 'Address not created'))

    const room = await roomRepo.createRoom(req.body, addr, req.params.userId)
    
    responseHandler('Room has been created', { room }, res, 200)
})

export const getAllRooms: RequestHandler = catchAsync( async(req, res, next) => {
    const room = await req.env.roomRepo.fetchRooms(req.query)
    if(!room.room) return next(new AppError(404, 'Could not fetch room currently'))
    paginatedResponse('room list fetch successfully.', room.room, res, 200, room.limit, room.offset, room.total)
})

export const getSingleRoom: RequestHandler = catchAsync( async(req, res, next) => {
    const { roomId } = req.params
    const room = await req.env.roomRepo.fetchSingleRoom(Number(roomId))
    if(!room.id) return next(new AppError(404, 'Could not fetch room currently'))
    responseHandler('room updated sucessfully', room, res, 200)
})

export const updateRoom: RequestHandler = catchAsync( async(req, res, next) => {
    const id = Number(req.params.id)
    const room = await req.env.roomRepo.updateRooms(id)
    responseHandler('room updated sucessfully', '', res, 200)
})
