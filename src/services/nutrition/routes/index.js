import { Router } from "express";
import authenticateToken from '../../../middlewares/auth.js'
import { getDailySummary, getWeeklySummary } from "../controller/nutrition-controller.js";

const router = Router();


router.get('/nutrition/daily-summary', authenticateToken, getDailySummary);
router.get('/nutrition/weekly-summary', authenticateToken, getWeeklySummary);

export default router;
