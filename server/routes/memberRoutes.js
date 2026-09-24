import express from 'express';
import { getMembersByYear, createMember, updateMember, deleteMember } from '../controllers/memberController.js';
import { protect } from '../middleware/authMiddleware.js';
import CommitteeMember from '../models/CommitteeMember.js';
import upload from '../middleware/upload.js';

const router = express.Router();

// Sabhi members ko ek sath fetch karne ke liye route
router.get('/', async (req, res) => {
  try {
    const members = await CommitteeMember.find().sort({ order: 1 });
    res.json(members);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/year/:year', getMembersByYear);

// 'image' ko 'photo' kar diya gaya hai taaki frontend se match ho jaye
router.post('/', protect, upload.single('photo'), createMember);
router.put('/:id', protect, upload.single('photo'), updateMember);
router.delete('/:id', protect, deleteMember);

export default router;