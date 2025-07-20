import { config } from '@/config/_config';
import { CustomError } from '@/utils/customerror';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { MongooseError } from 'mongoose';
const globalErrorMiddleware = <T>(
    err: T,
    _: Request,
    res: Response,
    next: NextFunction,
) => {
    console.error(err);

    if (err instanceof CustomError) {
        res.status(err.statusCode).json({
            success: false,
            statusCode: err.statusCode,
            message: err.message,
        });
    }
    if (err instanceof MongooseError) {
        res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            statusCode: StatusCodes.BAD_REQUEST,
            message: `Mongoose Error: ${err.name}: ${err.message}`,
        });
    }
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        message: 'Internal Server Error',
        stack: config.node_env === 'development' ? err : undefined,
    });
    next();
};

export default globalErrorMiddleware;
