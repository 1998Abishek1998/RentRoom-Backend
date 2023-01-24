import { Schema } from 'zod';
import { Request, Response, NextFunction } from 'express';

import AppError from '../utils/AppError';

export default (schema: Schema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    let parsed = schema.safeParse(req.body);

    if (req.method.toUpperCase() === 'GET') {
      parsed = schema.safeParse(req.query);
    }

    if (!parsed.success) {
      const errors = parsed.error.issues.map((issue)=> {
        const val = Object.assign({
          path: issue.path[0],
          message: issue.message
        })
        return val
      })

      return next(new AppError(400, JSON.stringify(errors)));    
    }

    req.body = parsed.data;
    next();
  };
};
