import Joi from 'joi';

export const updateUserStatusSchema = Joi.object({
  status: Joi.string().valid('Active', 'Inactive').required()
});

export const updateUserRoleSchema = Joi.object({
  role: Joi.string().valid('Viewer', 'Analyst', 'Admin').required()
});