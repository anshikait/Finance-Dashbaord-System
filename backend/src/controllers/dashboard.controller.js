import * as dashboardService from '../services/dashboard.service.js';
import { catchAsync } from '../utils/catchAsync.util.js';
import { sendResponse } from '../utils/response.util.js';

export const getSummary = catchAsync(async (req, res) => {
  const summary = await dashboardService.getDashboardSummary();
  sendResponse(res, 200, 'Dashboard summary retrieved', summary);
});