import mongoose from 'mongoose';

const committeeMembersSchema = new mongoose.Schema({
  name: { type: String, required: true },
  photo: { type: String, default: 'https://via.placeholder.com/150' },
  position: { 
    type: String,
    required: false, // Error se bachne ke liye optional kar diya hai
    default: 'Member'
  },
  responsibility: { type: String, default: 'प्रबंधन / Management' },
  phone: { type: String, default: '' },
  year: { type: Number, required: false, default: 2026 }, // Year missing hone par default 2026 le lega
  order: { type: Number, default: 99 }
}, { timestamps: true });

export default mongoose.model('CommitteeMember', committeeMembersSchema);