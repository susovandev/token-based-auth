import { UserController } from '@/controllers/user.controller';
import authenticateUser from '@/middlewares/auth.middleware';
import { Router } from 'express';

const userRoutes: Router = Router();

/**
 * register user
 * @route POST /api/v1/users/register
 * @access public
 */
userRoutes.route('/register').post(UserController.registerUser);

/**
 * login user
 * @route POST /api/v1/users/login
 * @access public
 */
userRoutes.route('/login').post(UserController.loginUser);

/**
 * Get Current User
 * @route GET /api/v1/users/me
 * @access private
 */
userRoutes.route('/me').get(authenticateUser, UserController.getCurrentUser);

/**
 * Get Current User
 * @route PATCH /api/v1/users/change-password
 * @access private
 */
userRoutes
    .route('/change-password')
    .patch(authenticateUser, UserController.changePassword);

export default userRoutes;
