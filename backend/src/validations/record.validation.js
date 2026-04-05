import Joi from 'joi';

export const createRecordSchema = Joi.object({
  amount: Joi.number().positive().required(),
  type: Joi.string().valid('Income', 'Expense').required(),
  category: Joi.string().required(),
  date: Joi.date().iso().required(),
  notes: Joi.string().allow('', null).optional()
});

export const updateRecordSchema = Joi.object({
  amount: Joi.number().positive().optional(),
  type: Joi.string().valid('Income', 'Expense').optional(),
  category: Joi.string().optional(),
  date: Joi.date().iso().optional(),
  notes: Joi.string().allow('', null).optional()
});