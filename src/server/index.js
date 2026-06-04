import 'dotenv/config';
import express from 'express';
import errorHandler from '../middlewares/error.js';
import router from '../routes/index.js';
import cors from 'cors';

import { globalLimiter } from '../middlewares/rateLimiter.js';

const app = express();

app.use(express.json());

const allowedOrigins = [
  // For Development
  'http://localhost:5173',
  // For Production
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    // If "*" is in the array, allow all origins
    if (allowedOrigins.includes("*") || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Blocked by CORS policy'));
    }
  },
  credentials: true
}));

app.set('trust proxy', 1);

// global limiter
app.use(globalLimiter);


app.use('/', router);

app.use(errorHandler);

export default app;

