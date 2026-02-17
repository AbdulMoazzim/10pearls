
import app from './app';
import connectDB from './config/database';
import { env } from './config/env';
import logger from './utils/logger';
import http from "node:http";

// Connect to database
connectDB();

const PORT = env.PORT || 5000;

const server = http.createServer(app);
server.listen(PORT, ()=> {
    logger.info(`Server running at http://localhost:${PORT}`);
})