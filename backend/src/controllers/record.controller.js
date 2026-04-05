import * as recordService from '../services/record.service.js';
import { catchAsync } from '../utils/catchAsync.util.js';
import { sendResponse } from '../utils/response.util.js';

export const createRecord = catchAsync(async (req, res) => {
  const record = await recordService.createRecord(req.body, req.user._id);
  sendResponse(res, 201, 'Record created successfully', record);
});

export const getRecords = catchAsync(async (req, res) => {
  const data = await recordService.getRecords(req.query);
  sendResponse(res, 200, 'Records retrieved successfully', data.records, { total: data.total, page: data.page, limit: data.limit });
});

export const updateRecord = catchAsync(async (req, res) => {
  const record = await recordService.updateRecord(req.params.id, req.body);
  sendResponse(res, 200, 'Record updated successfully', record);
});

export const deleteRecord = catchAsync(async (req, res) => {
  await recordService.deleteRecord(req.params.id);
  sendResponse(res, 200, 'Record deleted successfully');
});