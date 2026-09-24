import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema({
  year: { type: Number, required: true },
  category: { type: String, required: true },
  imageUrl: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String }
}, { timestamps: true });

export default mongoose.model('Gallery', gallerySchema);