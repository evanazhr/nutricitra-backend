import { Router } from "express";
import authenticateToken from '../../../middlewares/auth.js'
import { getDailySummary } from "../controller/nutrition-controller.js";

const router = Router();


router.get('/nutrition/daily-summary', authenticateToken, getDailySummary)

export default router;
