import Joi from 'joi';

export const postProfilePayloadSchema = Joi.object({
  user_id: Joi.string().required(),
  height: Joi.number().integer().positive().required(),
  weight: Joi.number().integer().positive().required(),
  age: Joi.number().integer().positive().required(),
});

export const putProfilePayloadSchema = Joi.object({
  height: Joi.number().integer().positive().required(),
  weight: Joi.number().integer().positive().required(),
  age: Joi.number().integer().positive().required(),
});