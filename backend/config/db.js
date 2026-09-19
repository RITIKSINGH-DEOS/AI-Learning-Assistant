import mongoose from 'mongoose';

const connectDB = async () => {
    const primaryUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ai-learning-assistant';
    try {
        const conn = await mongoose.connect(primaryUri);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.warn(`Primary MongoDB connection failed (${error.message}). Attempting local fallback...`);
        try {
            const fallbackUri = 'mongodb://127.0.0.1:27017/ai-learning-assistant';
            const conn = await mongoose.connect(fallbackUri);
            console.log(`MongoDB Connected (Local Fallback): ${conn.connection.host}`);
        } catch (fallbackError) {
            console.error(`Error connecting to MongoDB: ${fallbackError.message}`);
            process.exit(1);
        }
    }
};

export default connectDB;