import { Router } from "express";
import { searchFoods, getFoodNutrition } from "../controller/food-controller.js";
import authenticateToken from '../../../middlewares/auth.js';

const router = Router();

router.get('/foods/search', authenticateToken, searchFoods);
router.get('/foods/:name', authenticateToken, getFoodNutrition);

export default router;
