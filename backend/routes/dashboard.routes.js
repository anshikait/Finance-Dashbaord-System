import { Router } from 'express';
import * as dashboardController from '../controllers/dashboard.controller.js';
import { protect } from '../middlewares/auth.middleware.js';
import { restrictTo } from '../middlewares/role.middleware.js';

const router = Router();

router.use(protect);

// Analyst and Admin can view dashboard summaries
router.get('/summary', restrictTo('Admin', 'Analyst'), dashboardController.getSummary);

export default router;