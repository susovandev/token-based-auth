import UserDAO from '@/dao/user.dao';
import { IUserRequestBody } from '@/interface/user.interface';
import {
    ConflictException,
    InternalServerError,
    UnauthorizedException,
} from '@/utils/customerror';

/**
 * Service class for handling auth and user related business logic.
 */
class UserService {
    /**
     * Constructs a new UserService instance.
     * @param userDAO - The UserDAO instance for database operations.
     */
    constructor(private readonly userDAO: UserDAO) {}

    /**
     * Registers a new user.
     * @param userData - The user registration data.
     * @throws ConflictException - If user already exists in the database.
     * @throws InternalServerError - If user registration fails.
     * @returns The registered user details.
     */
    async registerUser(userData: IUserRequestBody) {
        const userExists =
            await this.userDAO.checkUserExistsByEmailOrUsername(userData);

        if (userExists) throw new ConflictException('User already exists');

        const user = await this.userDAO.registerUser(userData);

        if (!user) throw new InternalServerError('User not created');
        return {
            username: user.username,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };
    }

    /**
     * Log in a user.
     * @param userData - The user login data.
     * @throws UnauthorizedException - If user not exists in the database.
     * @throws InternalServerError - If user registration fails.
     * @returns An object containing the access token.
     */

    async loginUser(userData: IUserRequestBody) {
        // 1) check if user exists by email or username
        const userExists =
            await this.userDAO.checkUserExistsByEmailOrUsername(userData);
        console.log(userExists);
        if (!userExists) throw new UnauthorizedException('User not found');

        // 2) check if password match
        const ifPasswordMatch = await userExists.comparePassword(
            userData.password,
        );
        if (!ifPasswordMatch)
            throw new UnauthorizedException('Password not match');

        // 3) Generate JWT token
        const token = userExists.getSignedJwtToken();

        // 4) return user details
        return {
            accessToken: token,
            userInfo: {
                username: userExists.username,
                email: userExists.email,
                role: userExists.role,
                createdAt: userExists.createdAt,
                updatedAt: userExists.updatedAt,
            },
        };
    }
}

export default new UserService(new UserDAO());
