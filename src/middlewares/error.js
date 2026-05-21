import { ClientError } from "../exceptions/index.js";
import response from '../utils/response.js';
import { Prisma } from "../../generated/prisma/index.js";

// eslint-disable-next-line
const errorHandler = (err, req, res, next) => {
  if (err instanceof ClientError) {
    return response(res, err.statusCode || 400, err.message);
  }

  // 3. Handle Joi Validation
  if (err.isJoi) {
    return response(res, 400, err.details[0].message);
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
    case 'P2002':
      // handling duplicate key errors
      return response(res, 400, `Duplicate field value: ${err.message}`);
    case 'P2014':
      // handling invalid id errors
      return response(res, 400, `Invalid ID: ${err.message}`);
    case 'P2003':
      // handling invalid data errors
      return response(res, 400, `Invalid input data: ${err.message}`);
    }
  }

  if (err instanceof Prisma.PrismaClientValidationError) {
    return response(res, 400, err.message);
  }

  const status = err.statusCode || err.status || 500;
  const message = err.message || 'Internal Server Error';

  return response(res, status, message, null);
};

export default errorHandler;