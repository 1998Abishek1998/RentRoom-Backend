import { ErrorRequestHandler, NextFunction, Request, Response } from "express"
import AppError from "../utils/AppError"
import env from "../utils/env";

const DBduplicationError = (err: AppError) => {
  const message = err?.detail
  return new AppError(402, message)
}

const sendDevError = (err: AppError, req: Request, res: Response) => {

  if (req.originalUrl.startsWith('/api')) {
        return res.status(err.statusCode).json({
          status: err.status,
          error: err,
          message: err.message,
          stack: err.stack
        });
      }
    
    console.error('ERROR 💥', err);

    return res.status(err.statusCode).render('error', {
      title: 'Something went wrong!',
      msg: err.message
    });
}

const sendProdError = (err: AppError, req: Request, res: Response) => {

  if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message
      });
    }

    console.error('ERROR 💥', err);

    return res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!'
    });
}

export const errorMiddleware: ErrorRequestHandler = (
    error: AppError,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    error.statusCode = error.statusCode || 500
    error.status = error.status || 'Something went wrong'

    let err = error

    if(err?.code === '23505') err = DBduplicationError(err)

    if(env.NODE_ENV === 'development') sendDevError(err, req, res)
    if(env.NODE_ENV === 'production') sendProdError(err, req, res)
}