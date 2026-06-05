import 'dotenv/config';
import express from 'express';
import errorHandler from '../middlewares/error.js';
import router from '../routes/index.js';
import cors from 'cors';

import { globalLimiter } from '../middlewares/rateLimiter.js';

const app = express();

app.use(express.json());

app.use(cors({
  origin: function (origin, callback) {
    const allowedOrigins = [
      'http://localhost:5173',
      'http://127.0.0.1:5173',
      process.env.FRONTEND_URL
    ].filter(Boolean);

    if (!origin || allowedOrigins.includes(origin)) {
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

