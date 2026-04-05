import { Record } from '../models/record.model.js';
import { AppError } from '../utils/appError.util.js';

export const createRecord = async (data, userId) => {
  return await Record.create({ ...data, createdBy: userId });
};

export const getRecords = async (query) => {
  const { page = 1, limit = 10, search, type, category, startDate, endDate } = query;
  const filter = { isDeleted: false };

  // Filter functionality
  if (type) filter.type = type;
  if (category) filter.category = category;
  if (startDate && endDate) filter.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
  
  // Search functionality (Regex)
  if (search) {
    filter.$or = [
      { category: { $regex: search, $options: 'i' } },
      { notes: { $regex: search, $options: 'i' } }
    ];
  }

  // Pagination logic
  const skip = (Number(page) - 1) * Number(limit);
  const records = await Record.find(filter).skip(skip).limit(Number(limit)).sort('-date');
  const total = await Record.countDocuments(filter);

  return { records, total, page: Number(page), limit: Number(limit) };
};

export const updateRecord = async (id, data) => {
  const record = await Record.findOneAndUpdate({ _id: id, isDeleted: false }, data, { new: true, runValidators: true });
  if (!record) throw new AppError('Record not found', 404);
  return record;
};

export const deleteRecord = async (id) => {
  const record = await Record.findOneAndUpdate({ _id: id, isDeleted: false }, { isDeleted: true, deletedAt: new Date() });
  if (!record) throw new AppError('Record not found', 404);
};
