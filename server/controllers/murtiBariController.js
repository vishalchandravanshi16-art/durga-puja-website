import MurtiBari from '../models/MurtiBari.js';

// Get all Murti Bari records
export const getMurtiBariList = async (req, res) => {
  try {
    const list = await MurtiBari.find().sort({ year: -1 });
    res.status(200).json(list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new Murti Bari record
export const createMurtiBari = async (req, res) => {
  try {
    const { year, familyName, fatherName, address, status, notes } = req.body;

    // Agar multer se file aayi hai toh uska path lo, nahi toh req.body.image ya khali string
    const imagePath = req.file ? `/uploads/${req.file.filename}` : (req.body.image || '');

    const newEntry = new MurtiBari({
      year,
      familyName,
      fatherName,
      address,
      image: imagePath, // Model ke field ke anusaar 'image' ya 'photo' rakhein
      status,
      notes
    });

    const savedEntry = await newEntry.save();
    res.status(201).json(savedEntry);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update an existing Murti Bari record
export const updateMurtiBari = async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    const updatedEntry = await MurtiBari.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedEntry) {
      return res.status(404).json({ message: 'Record not found' });
    }

    res.status(200).json(updatedEntry);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete Murti Bari record
export const deleteMurtiBari = async (req, res) => {
  try {
    const deletedEntry = await MurtiBari.findByIdAndDelete(req.params.id);

    if (!deletedEntry) {
      return res.status(404).json({ message: 'Record not found' });
    }

    res.status(200).json({ message: 'Murti Bari deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};