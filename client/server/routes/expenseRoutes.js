import express from 'express';
import { getExpenseByYear, createExpense, deleteExpense } from '../controllers/expenseController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getExpenseByYear);
router.get('/year/:year', getExpenseByYear);
router.post('/', protect, createExpense);
router.delete('/:id', protect, deleteExpense);

export default router;