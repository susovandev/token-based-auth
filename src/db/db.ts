import { connect } from 'mongoose';

const connectDB = async () => {
    try {
        const connectionInstance = await connect(process.env.DATABASE_URL!);
        console.log(
            `Connected to database: ${connectionInstance.connection.db?.databaseName}\n
            Connection host:${connectionInstance.connection.host}\n
            Connection Port: ${connectionInstance.connection.port}
            `,
        );
    } catch (error) {
        console.error(`Error connecting to database: ${error}`);
        process.exit(1);
    }
};

export default connectDB;
