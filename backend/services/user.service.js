import { User } from '../models/user.model.js';
import { AppError } from '../utils/appError.util.js';

export const getAllUsers = async (page, limit) => {
  const skip = (page - 1) * limit;
  const users = await User.find({ isDeleted: false }).skip(skip).limit(limit).select('-password');
  const total = await User.countDocuments({ isDeleted: false });
  return { users, total, page, limit };
};

export const updateUserStatus = async (id, status) => {
  const user = await User.findOneAndUpdate({ _id: id, isDeleted: false }, { status }, { new: true }).select('-password');
  if (!user) throw new AppError('User not found', 404);
  return user;
};

export const updateUserRole = async (id, role) => {
  const user = await User.findOneAndUpdate({ _id: id, isDeleted: false }, { role }, { new: true }).select('-password');
  if (!user) throw new AppError('User not found', 404);
  return user;
};

export const softDeleteUser = async (id) => {
  const user = await User.findByIdAndUpdate(id, { isDeleted: true, deletedAt: new Date() });
  if (!user) throw new AppError('User not found', 404);
};