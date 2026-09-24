import PujaYear from '../models/PujaYear.js';

export const getYears = async (req, res) => {
  try {
    const years = await PujaYear.find().sort({ year: -1 });
    res.json(years);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createYear = async (req, res) => {
  try {
    const newYear = new PujaYear(req.body);
    const saved = await newYear.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};