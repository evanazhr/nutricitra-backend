import { Router } from "express";
import authRouter from '../services/authentications/routes/index.js';
import userRouter from '../services/users/routes/index.js';
import predictRouter from '../services/predicts/routes/index.js';
import profileRouter from '../services/profiles/routes/index.js';
import mealRouter from '../services/meals/routes/index.js';
import NutritionRouter from '../services/nutrition/routes/index.js';

const router = Router();

router.use('/', authRouter);
router.use('/', userRouter);
router.use('/', predictRouter);
router.use('/', profileRouter);
router.use('/', mealRouter);
router.use('/', NutritionRouter);

export default router;