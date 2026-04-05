import { User } from '../models/user.model.js';
import { AppError } from '../utils/appError.util.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
};

export const registerUser = async (data) => {
  const existingUser = await User.findOne({ email: data.email });
  if (existingUser) throw new AppError('Email already in use', 400);

  const user = await User.create(data);
  const token = signToken(user._id.toString());
  
  // Remove password from output
  user.password = undefined;
  return { user, token };
};

export const loginUser = async (email, pass) => {
  const user = await User.findOne({ email, isDeleted: false }).select('+password');
  if (!user || !(await bcrypt.compare(pass, user.password))) {
    throw new AppError('Incorrect email or password', 401);
  }
  if (user.status === 'Inactive') throw new AppError('Account is inactive', 403);

  const token = signToken(user._id.toString());
  user.password = undefined; 
  return { user, token };
};