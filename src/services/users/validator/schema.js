import Joi from 'joi';

export const postUserPayloadSchema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  fullname: Joi.string().max(100).required(),
  password: Joi.string().min(6).required(),
});