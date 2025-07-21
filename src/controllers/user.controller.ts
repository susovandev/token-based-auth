import {
    IChangePasswordDTO,
    IUser,
    IUserRequestBody,
} from '@/interface/user.interface';
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
            const response = await userService.registerUser(req.body);

            res.status(StatusCodes.CREATED).json(
                new ApiResponse(
                    StatusCodes.CREATED,
                    'Registered successfully',
                    response,
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
            const response = await userService.loginUser(req.body);

            res.status(StatusCodes.OK).json(
                new ApiResponse(
                    StatusCodes.OK,
                    'Logged in successfully',
                    response,
                ),
            );
        },
    );

    /**
     * Get Current User
     * @returns An object containing the current user.
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

    /**
     * Change Password
     * @returns An object containing the new last password.
     */

    static changePassword = asyncHandler(
        async (
            req: Request<unknown, unknown, IChangePasswordDTO>,
            res: Response,
        ) => {
            const response = await userService.changePassword(
                req.user as IUser,
                req.body,
            );
            res.status(StatusCodes.OK).json(
                new ApiResponse(
                    StatusCodes.OK,
                    'Password changed successfully',
                    response,
                ),
            );
        },
    );
}
