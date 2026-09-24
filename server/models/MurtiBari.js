import mongoose from 'mongoose';

const murtiBariSchema = new mongoose.Schema({
  year: { type: Number, required: true },
  familyName: { type: String, required: true },
  fatherName: { type: String, default: '' }, // <-- Yeh naya field joda gaya hai
  address: { type: String, default: '' },
  photo: { type: String, default: '' },
  notes: { type: String, default: '' },
  status: { 
    type: String, 
    enum: ['Completed', 'Current', 'Upcoming'], 
    default: 'Upcoming' 
  }
}, { timestamps: true });

export default mongoose.model('MurtiBari', murtiBariSchema);