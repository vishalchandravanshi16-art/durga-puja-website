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
    // Yahan fatherName aur photo ko bhi destructure kar liya gaya hai
    const { year, familyName, fatherName, address, photo, status, notes } = req.body;

    const newEntry = new MurtiBari({
      year,
      familyName,
      fatherName, // <-- Yeh yahan pass hona zaroori hai
      address,
      photo,
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
    const updatedEntry = await MurtiBari.findByIdAndUpdate(
      req.params.id,
      req.body,
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