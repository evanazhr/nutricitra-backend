import 'dotenv/config';
import express from 'express';
import errorHandler from '../middlewares/error.js';
import router from '../routes/index.js';
import cors from 'cors';

const app = express();

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173',
  credentials : true
}));

app.use('/', router);

app.use(errorHandler);

export default app;

