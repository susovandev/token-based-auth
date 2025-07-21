import { IUserRequestBody } from '@/interface/user.interface';
import { ApiResponse } from '@/utils/ApiResponse';
import { asyncHandler } from '@/utils/asyncHandler';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import userService from '@/services/user.service';
export class UserController {
    /**
     * register a new user
     * @params IUserRequestBody { username: string, email: string, password: string }
     * @returns ApiResponse with registered user.
     */
    static registerUser = asyncHandler(
        async (
            req: Request<unknown, unknown, IUserRequestBody>,
            res: Response,
        ) => {
            const user = await userService.registerUser(req.body);

            res.status(StatusCodes.CREATED).json(
                new ApiResponse(
                    StatusCodes.CREATED,
                    'Registered successfully',
                    user,
                ),
            );
        },
    );

    /**
     * login a user
     * @params IUserRequestBody { username: string, email: string, password: string }
     * @returns An object containing the access token.
     */

    static loginUser = asyncHandler(
        async (
            req: Request<unknown, unknown, IUserRequestBody>,
            res: Response,
        ) => {
            const user = await userService.loginUser(req.body);

            res.status(StatusCodes.OK).json(
                new ApiResponse(StatusCodes.OK, 'Logged in successfully', user),
            );
        },
    );
    /**
     * Get Current User
     * @returns
     */

    static getCurrentUser = asyncHandler(
        async (req: Request, res: Response) => {
            res.status(StatusCodes.OK).json(
                new ApiResponse(
                    StatusCodes.OK,
                    'User found successfully',
                    req.user,
                ),
            );
        },
    );
}
