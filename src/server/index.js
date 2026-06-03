import 'dotenv/config';
import express from 'express';
import errorHandler from '../middlewares/error.js';
import router from '../routes/index.js';
import cors from 'cors';

import { globalLimiter } from '../middlewares/rateLimiter.js';

const app = express();

app.use(express.json());

// global limiter
app.use(globalLimiter);

const allowedOrigins = [
  // For Development
  'http://localhost:5173',
  // For Production
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Blocked by CORS policy'));
    }
  },
  credentials: true
}));

app.set('trust proxy', 1);

app.use('/', router);

app.use(errorHandler);

export default app;

