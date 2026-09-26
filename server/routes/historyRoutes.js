import express from 'express';
import History from '../models/History.js';
import upload from '../middleware/upload.js';

const router = express.Router();

// 1. Get all history data
router.get('/', async (req, res) => {
  try {
    const historyData = await History.find().sort({ year: -1, createdAt: -1 });
    res.json(historyData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 2. Add new history / drama event
router.post('/', upload.any(), async (req, res) => {
  try {
    const { year, theme, director, dayName, dayNumber, date, type, category, title, desc, description, cast, maincast } = req.body;
    
    // Check if any file was uploaded -> Cloudinary gives full URL in .path
    const uploadedFile = req.files && req.files.length > 0 ? req.files[0] : null;
    const photoUrl = uploadedFile ? uploadedFile.path : ''; // Yahan .path use karna hai!

    const newHistory = new History({
      year,
      theme,
      director,
      dayName: dayName || dayNumber,
      date,
      type: type || category,
      title,
      desc: desc || description,
      cast: cast || maincast,
      photo: photoUrl
    });

    const savedHistory = await newHistory.save();
    // Frontend me agar data.data ya data.savedHistory expect kar rahe hain, 
    // toh hum dono bhej dete hain taaki kahin mismatch na ho:
    res.status(201).json({ message: "नया कार्यक्रम सफलतापूर्वक जोड़ा गया!", data: savedHistory, savedHistory });
  } catch (error) {
    console.error("History Save Error:", error);
    res.status(400).json({ message: error.message });
  }
});

// 3. Update history event
router.put('/:id', upload.any(), async (req, res) => {
  try {
    const { year, theme, director, dayName, dayNumber, date, type, category, title, desc, description, cast, maincast } = req.body;
    
    const updateData = {
      year,
      theme,
      director,
      dayName: dayName || dayNumber,
      date,
      type: type || category,
      title,
      desc: desc || description,
      cast: cast || maincast
    };

    const uploadedFile = req.files && req.files.length > 0 ? req.files[0] : null;
    if (uploadedFile) {
      updateData.photo = uploadedFile.path; // Yahan bhi .path use karna hai!
    }

    const updatedHistory = await History.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    res.json({ message: "कार्यक्रम सफलतापूर्वक अपडेट कर दिया गया!", updatedHistory });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 4. Delete history event
router.delete('/:id', async (req, res) => {
  try {
    await History.findByIdAndDelete(req.params.id);
    res.json({ message: "कार्यक्रम सफलतापूर्वक हटा दिया गया!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;