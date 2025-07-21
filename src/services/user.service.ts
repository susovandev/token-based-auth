import UserDAO from '@/dao/user.dao';
import { IUserRequestBody } from '@/interface/user.interface';
import { ConflictException, InternalServerError } from '@/utils/customerror';

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
}

export default new UserService(new UserDAO());
