import { UserController } from '@/controllers/user.controller';
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

export default userRoutes;
