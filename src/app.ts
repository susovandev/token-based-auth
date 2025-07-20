import express, { Application, NextFunction, Request, Response } from 'express';
import { config } from '@/config/_config';
import connectDB from './db/db';
import globalErrorMiddleware from './middlewares/error.middleware';
import { NotFoundException } from './utils/customerror';

export class App {
    app: Application;
    constructor() {
        this.app = express();
    }

    start() {
        this.setupDatabase();
        this.setupMiddlewares();
        this.setupGlobalErrors();
        this.serverListen();
    }

    private async setupDatabase() {
        await connectDB();
    }
    private setupMiddlewares() {
        this.app.use(express.json({ strict: true, limit: '100kb' }));
        this.app.use(express.urlencoded({ extended: true, limit: '100kb' }));
    }

    private setupGlobalErrors() {
        this.app.all(
            '/*splat',
            (req: Request, _: Response, next: NextFunction) => {
                next(
                    new NotFoundException(
                        `Can't find ${req.originalUrl} on this server!`,
                    ),
                );
            },
        );

        this.app.use(globalErrorMiddleware);
    }
    private serverListen() {
        this.app.listen(config, () => {
            console.log(
                `Server is running on : http://localhost:${config.port}`,
            );
        });
    }
}
