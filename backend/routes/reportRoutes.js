import express from 'express';
import { generateInventoryReport, generateStockLevelReport, generateCategoryReport } from '../controllers/reportController.js';

const router = express.Router();

// Get comprehensive inventory report
router.get('/inventory', generateInventoryReport);

// Get stock level report with optional threshold parameter
router.get('/stock-level', generateStockLevelReport);

// Get category-wise report
router.get('/category', generateCategoryReport);

export default router; 