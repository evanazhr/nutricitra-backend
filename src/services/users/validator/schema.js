import Joi from 'joi';

export const postUserPayloadSchema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }).required().messages({
    'string.email': 'Email harus berupa alamat email yang valid',
    'string.empty': 'Email tidak boleh kosong',
    'any.required': 'Email wajib diisi',
  }),
  fullname: Joi.string().max(100).required().messages({
    'string.max': 'Nama lengkap tidak boleh lebih dari 100 karakter',
    'string.empty': 'Nama lengkap tidak boleh kosong',
    'any.required': 'Nama lengkap wajib diisi',
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'Kata sandi harus memiliki minimal 6 karakter',
    'string.empty': 'Kata sandi tidak boleh kosong',
    'any.required': 'Kata sandi wajib diisi',
  }),
});