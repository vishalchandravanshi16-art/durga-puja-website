import Gallery from '../models/Gallery.js';

export const getGallery = async (req, res) => {
  try {
    const { year, category } = req.query;
    let query = {};
    if (year) query.year = Number(year);
    if (category && category !== 'All') query.category = category;
    const photos = await Gallery.find(query).sort({ createdAt: -1 });
    res.json(photos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createGalleryItem = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload an image file' });
    }

    // Server ka full image URL banayein taaki frontend par photo saaf dikhe
    const imageUrl = `http://localhost:5000/uploads/${req.file.filename}`;

    const photo = new Gallery({
      year: req.body.year,
      category: req.body.category,
      title: req.body.title,
      description: req.body.description,
      imageUrl: imageUrl
    });

    const saved = await photo.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteGalleryItem = async (req, res) => {
  try {
    await Gallery.findByIdAndDelete(req.params.id);
    res.json({ message: 'Image deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};