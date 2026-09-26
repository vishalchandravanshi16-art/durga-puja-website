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
    // Cloudinary file check (upload.any() ya upload.single() dono ke liye safe)
    const uploadedFile = req.file || (req.files && req.files.length > 0 ? req.files[0] : null);
    
    let photoPath = req.body.photo || req.body.image || '';
    if (uploadedFile) {
      photoPath = uploadedFile.path; // Cloudinary ka live URL yahan se milega
    }

    const memberData = {
      ...req.body,
      photo: photoPath,
      image: photoPath // Dono field handle karne ke liye taaki mismatch na ho
    };

    const member = new CommitteeMember(memberData);
    const saved = await member.save();
    res.status(201).json({ message: "सफलतापूर्वक जोड़ा गया!", saved });
  } catch (err) {
    console.error("Error creating member:", err);
    res.status(400).json({ message: err.message });
  }
};

export const updateMember = async (req, res) => {
  try {
    const uploadedFile = req.file || (req.files && req.files.length > 0 ? req.files[0] : null);
    
    let updateData = { ...req.body };
    if (uploadedFile) {
      updateData.photo = uploadedFile.path;
      updateData.image = uploadedFile.path;
    }

    const updated = await CommitteeMember.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json({ message: "सफलतापूर्वक अपडेट किया गया!", updated });
  } catch (err) {
    console.error("Error updating member:", err);
    res.status(400).json({ message: err.message });
  }
};

export const deleteMember = async (req, res) => {
  try {
    await CommitteeMember.findByIdAndDelete(req.params.id);
    res.json({ message: 'Member removed successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};