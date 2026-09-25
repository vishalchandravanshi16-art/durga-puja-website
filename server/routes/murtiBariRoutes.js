import express from 'express';
import { getMurtiBariList, createMurtiBari, updateMurtiBari, deleteMurtiBari } from '../controllers/murtiBariController.js';
import { protect } from '../middleware/authMiddleware.js';
import upload from '../middleware/upload.js'; // Agar path alag ho toh apne folder ke hisab se check kar lein

const router = express.Router();

router.get('/', getMurtiBariList);
router.post('/', protect, upload.single('image'), createMurtiBari);
router.put('/:id', protect, upload.single('image'), updateMurtiBari);
router.delete('/:id', protect, deleteMurtiBari);

export default router;