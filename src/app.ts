import express, { Application } from 'express';
import { config } from '@/config/_config';
import connectDB from './db/db';

export class App {
    app: Application;
    constructor() {
        this.app = express();
    }

    start() {
        this.setupDatabase();
        this.setupMiddlewares();
        this.serverListen();
    }

    private async setupDatabase() {
        await connectDB();
    }
    private setupMiddlewares() {
        this.app.use(express.json({ strict: true, limit: '100kb' }));
        this.app.use(express.urlencoded({ extended: true, limit: '100kb' }));
    }
    private serverListen() {
        this.app.listen(config, () => {
            console.log(
                `Server is running on : http://localhost:${config.port}`,
            );
        });
    }
}
