import express from 'express';
import Message from '../models/Message.js';

const router = express.Router();

// 1. Contact Form से मैसेज सेव करने के लिए (POST)
router.post('/send', async (req, res) => {
  try {
    const { name, phone, address, message } = req.body;
    const newMessage = new Message({ name, phone, address, message });
    await newMessage.save();
    res.status(201).json({ success: true, message: 'संदेश सफलतापूर्वक जमा हो गया!' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 2. केवल Admin Dashboard में मैसेज दिखाने के लिए (GET)
router.get('/all', async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 3. मैसेज डिलीट करने के लिए (DELETE)
router.delete('/:id', async (req, res) => {
  try {
    await Message.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'संदेश हटा दिया गया!' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;