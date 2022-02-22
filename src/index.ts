import mongoose from 'mongoose';
import 'dotenv/config';
import app from './app';
import { logger } from './utils/logger.util';

const PORT = process.env.PORT || 5000;

const exitHandler = (e: unknown) => {
    if (process.env.NODE_ENV === 'development') {
        console.log('Server error', e);
        process.exit(1);
    } else {
        logger.info(e);
        process.exit(1);
    }
};

const start = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || '');
        logger.info('Connected to MongoDB');
        app.listen(PORT, () => {
            return process.env.NODE_ENV === 'development'
                ? console.log(`Server start on port ${PORT}`)
                : logger.info(`Server start on port ${PORT}`);
        });
    } catch (e) {
        exitHandler(e);
    }
};

start();
