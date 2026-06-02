import Joi from "joi";

export const postAuthenticationPayloadSchema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }).required().messages({
    'string.email': 'Email harus berupa alamat email yang valid',
    'string.empty': 'Email tidak boleh kosong',
    'any.required': 'Email wajib diisi',
  }),
  password: Joi.string().required().messages({
    'string.empty': 'Kata sandi tidak boleh kosong',
    'any.required': 'Kata sandi wajib diisi',
  }),
});

export const putAuthenticationPayloadSchema = Joi.object({
  refreshToken: Joi.string().required()
});

export const deleteAuthenticationPayloadSchema = Joi.object({
  refreshToken: Joi.string().required()
});
