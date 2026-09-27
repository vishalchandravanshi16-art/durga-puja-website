import express from 'express';
import { getMembersByYear, createMember, updateMember, deleteMember } from '../controllers/memberController.js';
import { protect } from '../middleware/authMiddleware.js';
import upload from '../middleware/upload.js';

const router = express.Router();

// Saare members ya year-wise fetch karne ke liye getMembersByYear controller use karenge
router.get('/', getMembersByYear);
router.get('/year/:year', getMembersByYear);

// Naya member add karne ke liye
router.post('/', protect, upload.any(), createMember);
router.put('/:id', protect, upload.any(), updateMember);
router.delete('/:id', protect, deleteMember);

export default router;