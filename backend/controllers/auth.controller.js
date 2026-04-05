import * as authService from '../services/auth.service.js';
import { catchAsync } from '../utils/catchAsync.util.js';
import { sendResponse } from '../utils/response.util.js';

export const register = catchAsync(async (req, res) => {
  const data = await authService.registerUser(req.body);
  sendResponse(res, 201, 'User registered successfully', data);
});

export const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const data = await authService.loginUser(email, password);
  sendResponse(res, 200, 'Login successful', data);
});