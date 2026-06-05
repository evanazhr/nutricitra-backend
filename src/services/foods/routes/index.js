import { Router } from "express";
import { searchFoods } from "../controller/food-controller.js";
import authenticateToken from '../../../middlewares/auth.js';

const router = Router();

router.get('/foods/search', authenticateToken, searchFoods);

export default router;
