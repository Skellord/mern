import { NextFunction, Request, Response } from 'express';
import ApiError from '../utils/apiError.util';
import { StatusCodes } from 'http-status-codes';
import { logger } from '../utils/logger.util';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler = (err: unknown, req: Request, res: Response, next: NextFunction) => {
    if (process.env.NODE_ENV === 'development') {
        logger.error(err);
    }

    if (err instanceof ApiError) {
        res.status(err.code).json(err.message);
        return;
    }

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json('Something went wrong');
};
