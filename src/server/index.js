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
    callback(null, origin || true);
  },
  credentials: true
}));

app.set('trust proxy', 1);

// global limiter
app.use(globalLimiter);


app.use('/', router);

app.use(errorHandler);

export default app;

