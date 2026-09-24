import express from 'express';
import { getMurtiBariList, createMurtiBari, updateMurtiBari, deleteMurtiBari } from '../controllers/murtiBariController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getMurtiBariList);
router.post('/', protect, createMurtiBari);
router.put('/:id', protect, updateMurtiBari);
router.delete('/:id', protect, deleteMurtiBari);

export default router;