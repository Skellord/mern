import { NextFunction, Request, Response } from 'express';
import ApiError from '../utils/apiError.util';
import { StatusCodes } from 'http-status-codes';
import { logger } from '../utils/logger.util';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler = (err: unknown, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ApiError) {
        logger.error(err);
        res.status(err.code).json(err.message);
        return;
    }

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json('Something went wrong');
};
