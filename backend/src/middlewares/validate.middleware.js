import { AppError } from '../utils/appError.util.js';

export const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const errorMessage = error.details.map((details) => details.message).join(', ');
      return next(new AppError(errorMessage, 400));
    }
    next();
  };
};