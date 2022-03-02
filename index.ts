import mongoose from 'mongoose';
import 'dotenv/config';
import app from './app';
import { logger } from './utils/logger.util';

const PORT = process.env.PORT || 5000;
const start = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || '');
        logger.info('Connected to MongoDB');
        app.listen(PORT, () => {
            logger.info(`Server start on port ${PORT}`);
        });
    } catch (e) {
        logger.info(e);
        process.exit(1);
    }
};

start();
