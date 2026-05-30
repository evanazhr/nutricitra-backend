import Joi from "joi";

export const postMealPayloadSchema = Joi.object({
    predictLogId: Joi.string().allow(null, '').optional(),
    food_name: Joi.string().required(),
    image_url: Joi.string().uri().optional(),
    mealType: Joi.string().valid('BREAKFAST', 'LUNCH', 'DINNER', 'SNACK').required(),
    portion: Joi.number().positive().default(1.0),
    fat: Joi.number().positive().required(),
    confident_score: Joi.number().min(0).max(1).allow(null).optional(),
    carbohydrate: Joi.number().positive().required(),
    protein: Joi.number().positive().required(),
    calorie: Joi.number().positive().required()
});

export const putMealPayloadSchema = Joi.object({
    predictLogId: Joi.string().allow(null, '').optional(),
    food_name: Joi.string().required(),
    image_url: Joi.string().uri().optional(),
    mealType: Joi.string().valid('BREAKFAST', 'LUNCH', 'DINNER', 'SNACK').required(),
    portion: Joi.number().positive().default(1.0),
    fat: Joi.number().positive().required(),
    confident_score: Joi.number().min(0).max(1).allow(null).optional(),
    carbohydrate: Joi.number().positive().required(),
    protein: Joi.number().positive().required(),
    calorie: Joi.number().positive().required()
});