import mongoose from 'mongoose';
import logger from '../utils/logger.util.js';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    logger.info(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    logger.error(`Error connecting to DB: ${error.message}`);
    process.exit(1);
  }
};