import { Request, Response, NextFunction } from 'express';
export const asyncHandler = <
    P = unknown,
    ResBody = unknown,
    ReqBody = unknown,
    ReqQuery = unknown,
>(
    fn: (
        req: Request<P, ResBody, ReqBody, ReqQuery>,
        res: Response,
        next: NextFunction,
    ) => Promise<void>,
) => {
    return (
        req: Request<P, ResBody, ReqBody, ReqQuery>,
        res: Response,
        next: NextFunction,
    ) => {
        fn(req, res, next).catch(next);
    };
};
