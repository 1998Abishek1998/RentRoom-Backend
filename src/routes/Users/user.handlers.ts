import { RequestHandler } from "express";
import { catchAsync, responseHandler } from "../../utils/catchAndThrow";

export const updateAddress: RequestHandler = catchAsync( async( req, res, next) => {
    responseHandler('user address has been updated.',{}, res, 200)
})

export const updateCitizenship: RequestHandler = catchAsync( async( req, res, next) => {
    responseHandler('user citizenship has been updated.',{}, res, 200)
})

export const updateUser: RequestHandler = catchAsync( async( req, res, next) => {
    responseHandler('user has been updated.',{}, res, 200)
})

export const deleteAddress: RequestHandler = catchAsync( async( req, res, next) => {
    responseHandler('user address has been deleted.',{}, res, 200)
})

export const deleteCitizenship: RequestHandler = catchAsync( async( req, res, next) => {
    responseHandler('user citizenship has been deleted.',{}, res, 200)
})