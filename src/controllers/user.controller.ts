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
}
