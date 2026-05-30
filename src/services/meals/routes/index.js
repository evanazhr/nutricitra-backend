    import { Router } from "express";
    import authenticateToken from "../../../middlewares/auth.js";
    import { createMeal, deleteMeal, getMeals, updateMeal } from "../controller/meal-controller.js";
    import { postMealPayloadSchema, putMealPayloadSchema } from "../validator/schema.js";
    import { validate } from "../../../middlewares/validate.js";
    import upload from "../../../middlewares/multer.js";

    const router = Router();


    router.get('/meals', authenticateToken, getMeals);
    router.post('/meals', authenticateToken, upload.single('image'), validate(postMealPayloadSchema), createMeal);
    router.put('/meals/:id', authenticateToken, upload.single('image'), validate(putMealPayloadSchema), updateMeal);
    router.delete('/meals/:id', authenticateToken, deleteMeal);

    export default router;