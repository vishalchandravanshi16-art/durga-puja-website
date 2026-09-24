import express from 'express';
import { getIncomeByYear, createIncome, deleteIncome } from '../controllers/incomeController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getIncomeByYear);
router.get('/year/:year', getIncomeByYear);
router.post('/', protect, createIncome);
router.delete('/:id', protect, deleteIncome);

export default router;