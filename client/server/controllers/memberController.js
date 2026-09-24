import CommitteeMember from '../models/CommitteeMember.js';

export const getMembersByYear = async (req, res) => {
  try {
    const year = Number(req.params.year);
    const members = await CommitteeMember.find({ year }).sort({ order: 1 });
    res.json(members);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createMember = async (req, res) => {
  try {
    // Agar device se photo upload ki gayi hai toh uska path set karein
    let photoPath = req.body.photo || '';
    if (req.file) {
      photoPath = `/uploads/${req.file.filename}`;
    }

    const memberData = {
      ...req.body,
      photo: photoPath
    };

    const member = new CommitteeMember(memberData);
    const saved = await member.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateMember = async (req, res) => {
  try {
    let updateData = { ...req.body };
    if (req.file) {
      updateData.photo = `/uploads/${req.file.filename}`;
    }

    const updated = await CommitteeMember.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteMember = async (req, res) => {
  try {
    await CommitteeMember.findByIdAndDelete(req.params.id);
    res.json({ message: 'Member removed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};