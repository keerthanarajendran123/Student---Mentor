import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            dbName: process.env.DB_NAME,
        });
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Error connecting to database:', error.message);
        process.exit(1);
    }
};

export default connectDB;

