import express from 'express';
import Gallery from '../models/Gallery.js';
import { protect } from '../middleware/authMiddleware.js';
import upload from '../middleware/upload.js'; // Cloudinary wala upload middleware import kiya

const router = express.Router();

// 1. Get All Gallery Photos (Public - कोई भी देख सकता है)
router.get('/', async (req, res) => {
  try {
    const galleries = await Gallery.find().sort({ createdAt: -1 });
    res.status(200).json(galleries);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching gallery', error: err.message });
  }
});

// 2. Add Gallery Photo with Cloudinary Upload (Protected - सिर्फ लॉगिन यूजर इमेज अपलोड कर पाएगा)
router.post('/', protect, upload.single('image'), async (req, res) => {
  try {
    const { year, category, title, description } = req.body;
    
    // Cloudinary se direct secure URL milta hai req.file.path mein
    const imageUrl = req.file ? req.file.path : '';

    if (!imageUrl) {
      return res.status(400).json({ message: 'Please upload an image file' });
    }

    const newGallery = new Gallery({
      year: Number(year),
      category,
      imageUrl,
      title,
      description
    });
    
    await newGallery.save();
    res.status(201).json({ message: 'Gallery item added successfully!', data: newGallery });
  } catch (err) {
    res.status(500).json({ message: 'Error adding gallery item', error: err.message });
  }
});

// 3. Delete Gallery Photo (Protected)
router.delete('/:id', protect, async (req, res) => {
  try {
    await Gallery.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Gallery item deleted successfully!' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting gallery item', error: err.message });
  }
});

export default router;