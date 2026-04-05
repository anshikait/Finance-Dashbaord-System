import jwt from 'jsonwebtoken';
import { AppError } from '../utils/appError.util.js';
import { User } from '../models/user.model.js';

export const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) return next(new AppError('You are not logged in.', 401));

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const currentUser = await User.findById(decoded.id);

    if (!currentUser || currentUser.isDeleted) {
      return next(new AppError('User no longer exists.', 401));
    }
    if (currentUser.status === 'Inactive') {
      return next(new AppError('Your account is deactivated.', 403));
    }

    req.user = currentUser;
    next();
  } catch (error) {
    return next(new AppError('Invalid or expired token.', 401));
  }
};