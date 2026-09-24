import mongoose from 'mongoose';

const historySchema = new mongoose.Schema({
  year: { type: Number, required: true },
  theme: { type: String },
  director: { type: String },
  dayName: { type: String, required: true },
  date: { type: String, required: true },
  type: { type: String, required: true },
  title: { type: String, required: true },
  desc: { type: String, required: true },
  cast: { type: String },
  photo: { type: String } // <-- Yeh photo field jod diya gaya hai
}, { timestamps: true });

export default mongoose.model('History', historySchema);