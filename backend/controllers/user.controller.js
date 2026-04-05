import * as userService from '../services/user.service.js';
import { catchAsync } from '../utils/catchAsync.util.js';
import { sendResponse } from '../utils/response.util.js';

export const getAllUsers = catchAsync(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const data = await userService.getAllUsers(page, limit);
  sendResponse(res, 200, 'Users retrieved successfully', data.users, { total: data.total, page, limit });
});

export const updateStatus = catchAsync(async (req, res) => {
  const user = await userService.updateUserStatus(req.params.id, req.body.status);
  sendResponse(res, 200, 'User status updated', user);
});

export const updateRole = catchAsync(async (req, res) => {
  const user = await userService.updateUserRole(req.params.id, req.body.role);
  sendResponse(res, 200, 'User role updated', user);
});

export const deleteUser = catchAsync(async (req, res) => {
  await userService.softDeleteUser(req.params.id);
  sendResponse(res, 200, 'User deleted successfully');
});