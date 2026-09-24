import express from 'express';
import { getYears, createYear } from '../controllers/yearController.js';
import { protect } from '../middleware/authMiddleware.js';
import PujaYear from '../models/PujaYear.js';

const router = express.Router();

// 1. Existing Routes
router.get('/', getYears);
router.post('/', protect, createYear);

// ==========================================
// 2. History & Day-to-Day Events Routes
// ==========================================

// Kisi specific saal ke andar naya din/natak (event) add karne ke liye (Sirf Admin)
router.post('/:yearId/events', protect, async (req, res) => {
  try {
    const { yearId } = req.params;
    const { dayNumber, timeSlot, category, dramaTitle, description, mainCast } = req.body;

    const pujaYear = await PujaYear.findById(yearId);
    if (!pujaYear) {
      return res.status(404).json({ message: 'वर्ष (Year) नहीं मिला!' });
    }

    // Events array me naya event push karna
    pujaYear.events.push({
      dayNumber,
      timeSlot,
      category,
      dramaTitle,
      description,
      mainCast
    });

    await pujaYear.save();
    res.status(201).json({ message: 'दैनिक कार्यक्रम सफलतापूर्वक जोड़ दिया गया!', pujaYear });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Kisi specific saal ke andar se galat event/natak ko delete karne ke liye (Sirf Admin)
router.delete('/:yearId/events/:eventId', protect, async (req, res) => {
  try {
    const { yearId, eventId } = req.params;

    const pujaYear = await PujaYear.findById(yearId);
    if (!pujaYear) {
      return res.status(404).json({ message: 'वर्ष (Year) नहीं मिला!' });
    }

    // Mongoose pull ka use karke event ko array se hataana
    pujaYear.events.id(eventId).deleteOne();
    await pujaYear.save();

    res.json({ message: 'कार्यक्रम सफलतापूर्वक डिलीट कर दिया गया!', pujaYear });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;