import { IUser, IUserRequestBody } from '@/interface/user.interface';
import User from '@/model/user.model';

/**
 * Data Access Object (DAO) for the User model.
 * Handles all database operations related to users.
 */
export default class UserDAO {
    /**
     * Checks if a user with the provided email or username already exists in the database.
     * @param userData - The user email or username to check.
     * @returns A promise that resolves to true if the user exists, false otherwise.
     */
    async checkUserExistsByEmailOrUsername(
        userData: IUserRequestBody,
    ): Promise<IUser | null> {
        const existingUser = await User.findOne({
            $or: [{ username: userData.username }, { email: userData.email }],
        });
        return existingUser;
    }

    /**
     * Checks if a user with the provided email or username already exists in the database.
     * @param userData - The user email or username to check.
     * @returns A promise that resolves to true if the user exists, false otherwise.
     */
    async getUserById(userId: string) {
        const existingUser = await User.findById(userId);
        return existingUser;
    }

    /**
     * Creates a new user document in the database.
     * @param user - The user data to be saved.
     * @returns A promise that resolves to the newly created user document.
     */
    async registerUser(userData: IUserRequestBody): Promise<IUser | null> {
        return await User.create(userData);
    }
}
