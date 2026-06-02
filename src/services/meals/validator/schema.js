import Joi from "joi";

export const postMealPayloadSchema = Joi.object({
    predictLogId: Joi.string().allow(null, '').optional(),
    foodName: Joi.string().required(),
    imageUrl: Joi.string().uri().optional(),
    mealType: Joi.string().valid('BREAKFAST', 'LUNCH', 'DINNER', 'SNACK').required(),
    portion: Joi.number().positive().default(1.0),
    fat: Joi.number().positive().required(),
    confidentScore: Joi.number().min(0).max(1).allow(null).optional(),
    carbohydrate: Joi.number().positive().required(),
    protein: Joi.number().positive().required(),
    calorie: Joi.number().positive().required(),
    water: Joi.number().min(0).allow(null).optional(),
    fiber: Joi.number().min(0).allow(null).optional()
});

export const putMealPayloadSchema = Joi.object({
    predictLogId: Joi.string().allow(null, '').optional(),
    foodName: Joi.string().required(),
    imageUrl: Joi.string().uri().optional(),
    mealType: Joi.string().valid('BREAKFAST', 'LUNCH', 'DINNER', 'SNACK').required(),
    portion: Joi.number().positive().default(1.0),
    fat: Joi.number().positive().required(),
    confidentScore: Joi.number().min(0).max(1).allow(null).optional(),
    carbohydrate: Joi.number().positive().required(),
    protein: Joi.number().positive().required(),
    calorie: Joi.number().positive().required(),
    water: Joi.number().min(0).allow(null).optional(),
    fiber: Joi.number().min(0).allow(null).optional()
});

export const getRecommendationMealsQuerySchema = Joi.object({
   sisaKuota : Joi.number().positive().required(),
   kaloriMakanan: Joi.number().positive().required()
});