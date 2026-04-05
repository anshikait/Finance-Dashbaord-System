import dotenv from 'dotenv';
import app from './app.js';
import { connectDB } from './config/db.config.js';
import logger from './utils/logger.util.js';

// Load Env variables
dotenv.config();

const PORT = process.env.PORT || 5000;

// Connect to DB and Start Server
connectDB().then(() => {
  app.listen(PORT, () => {
    logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  });
});