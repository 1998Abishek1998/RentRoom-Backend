import { NextFunction, Request, Response } from "express";

export const catchAsync = (fn: (arg0: Request, arg1: Response, arg2: NextFunction) => Promise<any>) => {
    return (req: Request, res: Response, next: NextFunction) => {
      fn(req, res, next).catch(next);
    };
};

export const responseHandler = (message: string, Data: any, res: Response, statusCode: number) => {
  res.status(statusCode).json({
    message,
    Data
  })
}