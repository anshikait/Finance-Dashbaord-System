import { Router } from 'express';
import * as recordController from '../controllers/record.controller.js';
import { protect } from '../middlewares/auth.middleware.js';
import { restrictTo } from '../middlewares/role.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { createRecordSchema, updateRecordSchema } from '../validations/record.validation.js';

const router = Router();

// Require Login
router.use(protect);

// Viewers can't access these, only Admin and Analyst
router.get('/', restrictTo('Admin', 'Analyst'), recordController.getRecords);

// Only Admins can manipulate records
router.post('/', restrictTo('Admin'), validate(createRecordSchema), recordController.createRecord);
router.patch('/:id', restrictTo('Admin'), validate(updateRecordSchema), recordController.updateRecord);
router.delete('/:id', restrictTo('Admin'), recordController.deleteRecord);

export default router;
