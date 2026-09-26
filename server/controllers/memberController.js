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
    const uploadedFile = req.file || (req.files && req.files.length > 0 ? req.files[0] : null);
    
    // Agar file upload hui hai toh Cloudinary ka URL hi priority pe rahega
    let photoPath = 'https://via.placeholder.com/150';
    if (uploadedFile && uploadedFile.path) {
      photoPath = uploadedFile.path;
    } else if (req.body.photo && req.body.photo.startsWith('http')) {
      photoPath = req.body.photo;
    }

    const memberData = {
      name: req.body.name,
      position: req.body.position || 'Member',
      responsibility: req.body.responsibility || 'प्रबंधन / Management',
      phone: req.body.phone || '',
      year: req.body.year ? Number(req.body.year) : 2026,
      order: req.body.order ? Number(req.body.order) : 99,
      photo: photoPath,
      image: photoPath
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
    if (uploadedFile && uploadedFile.path) {
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
    console.error("Error status 500:", err);
    res.status(500).json({ message: err.message });
  }
};