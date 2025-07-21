import User from '@/model/user.model';
import {
    BadRequestException,
    UnauthorizedException,
} from '@/utils/customerror';
import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface DecodedToken extends JwtPayload {
    id: string;
}
const authenticateUser = async (
    req: Request,
    _: Response,
    next: NextFunction,
) => {
    // 1) Get token from header & check if it exists
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) throw new UnauthorizedException('Unauthorized Access');

    try {
        // 2) Verify token
        const decodedToken = jwt.verify(
            token,
            process.env.JWT_SECRET as jwt.Secret,
        ) as DecodedToken;

        if (!decodedToken || !decodedToken.id)
            throw new UnauthorizedException('Token verification failed');

        // 3) Check if user exists
        const user = await User.findById(decodedToken.id).select('-password');
        if (!user) throw new BadRequestException('User not found');

        // 4) Attach user to request
        req.user = user;
        next();
    } catch (error) {
        console.error(`Error authenticating user: ${error}`);
        throw new UnauthorizedException('Unauthorized Access');
    }
};

export default authenticateUser;
