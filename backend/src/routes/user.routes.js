import { Router } from 'express';
import * as userController from '../controllers/user.controller.js';
import { protect } from '../middlewares/auth.middleware.js';
import { restrictTo } from '../middlewares/role.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { updateUserStatusSchema, updateUserRoleSchema } from '../validations/user.validation.js';

const router = Router();

// Apply Authentication and Admin Role to all user routes
router.use(protect);
router.use(restrictTo('Admin')); 

router.get('/', userController.getAllUsers);
router.patch('/:id/status', validate(updateUserStatusSchema), userController.updateStatus);
router.patch('/:id/role', validate(updateUserRoleSchema), userController.updateRole);
router.delete('/:id', userController.deleteUser);

export default router;