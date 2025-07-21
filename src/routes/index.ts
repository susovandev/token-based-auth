import { Application } from 'express';
import userRoutes from './user.routes';

export const appRouter = (app: Application) => {
    app.use('/api/v1/users', userRoutes);
};
