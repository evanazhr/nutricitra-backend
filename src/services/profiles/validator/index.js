import Joi from 'joi';

export const postProfilePayloadSchema = Joi.object({
  height: Joi.number().integer().positive().required(),
  weight: Joi.number().integer().positive().required(),
  age: Joi.number().integer().positive().required(),
  gender : Joi.string().valid('male', 'female').required()
});

export const putProfilePayloadSchema = Joi.object({
  height: Joi.number().integer().positive().required(),
  weight: Joi.number().integer().positive().required(),
  age: Joi.number().integer().positive().required(),
  gender : Joi.string().valid('male', 'female').required()
});