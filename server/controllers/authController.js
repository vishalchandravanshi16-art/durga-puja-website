import User from '../models/User.js';
import jwt from 'jsonwebtoken';

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'कृपया ईमेल और पासवर्ड दोनों दर्ज करें।' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'गलत ईमेल या पासवर्ड!' });
    }

    // Schema का अपना matchPassword मेथड यूज़ करें
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'गलत ईमेल या पासवर्ड!' });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || 'your_jwt_secret_key',
      { expiresIn: '1d' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: error.message });
  }
};