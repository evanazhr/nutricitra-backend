import Joi from 'joi';

export const postProfilePayloadSchema = Joi.object({
  height: Joi.number().integer().positive().required(),
  weight: Joi.number().integer().positive().required(),
  age: Joi.number().integer().positive().required(),
  gender: Joi.string().valid('male', 'female').required(),
  pregnancyTrimester: Joi.number().integer().valid(0, 1, 2, 3).default(0).optional(),
  breastfeedingStage: Joi.number().integer().valid(0, 1, 2).default(0).optional(),
  calorieTarget: Joi.number().integer().positive().required(),
  proteinTarget: Joi.number().integer().positive().required(),
  carbohydrateTarget: Joi.number().integer().positive().required(),
  fatTarget: Joi.number().integer().positive().required()
});

export const putProfilePayloadSchema = Joi.object({
  height: Joi.number().positive().precision(2).required(),
  weight: Joi.number().positive().precision(2).required(),
  age: Joi.number().integer().positive().required(),
  gender: Joi.string().valid('male', 'female').required(),
  pregnancyTrimester: Joi.number().integer().valid(0, 1, 2, 3).default(0).optional(),
  breastfeedingStage: Joi.number().integer().valid(0, 1, 2).default(0).optional(),
  calorieTarget: Joi.number().positive().precision(2).required(),
  proteinTarget: Joi.number().positive().precision(2).required(),
  carbohydrateTarget: Joi.number().positive().precision(2).required(),
  fatTarget: Joi.number().positive().precision(2).required()
});

export const getDefaultAkgDataPayloadSchema = Joi.object({
  age: Joi.number().integer().min(0).required(),
  gender: Joi.string().valid('male', 'female').required(),

  // 0 = Tidak hamil, 1 = Trimester 1, 2 = Trimester 2, 3 = Trimester 3
  pregnancyTrimester: Joi.number().integer().valid(0, 1, 2, 3).default(0).optional(),

  // 0 = Tidak, 1 = 6 Bulan Pertama, 2 = 6 Bulan Kedua
  breastfeedingStage: Joi.number().integer().valid(0, 1, 2).default(0).optional()
});