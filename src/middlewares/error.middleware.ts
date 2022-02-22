import { NextFunction, Request, Response } from 'express';
import { Error as MongoError } from 'mongoose';
import ApiError from '../utils/apiError.util';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import { logger } from '../utils/logger.util';

export const errorConverter = (err: any, req: Request, res: Response, next: NextFunction) => {
    let error = err;
    if (!(error instanceof ApiError)) {
        const statusCode =
            error.statusCode || error instanceof MongoError
                ? StatusCodes.BAD_REQUEST
                : StatusCodes.INTERNAL_SERVER_ERROR;
        const message = error.message || getReasonPhrase(statusCode);
        error = new ApiError(statusCode, message, false, err.stack);
    }
    next(error);
};

export const errorHandler = (err: ApiError, req: Request, res: Response, next: NextFunction) => {
    let { statusCode, message } = err;
    if (process.env.NODE_ENV === 'production' && !err.isOperational) {
        statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
        message = getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR);
    }

    res.locals.errorMessage = err.message;

    const response = {
        code: statusCode,
        message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    };

    if (process.env.NODE_ENV === 'development') {
        logger.error(err);
    }

    res.status(statusCode).send(response);
};
