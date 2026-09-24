import mongoose from 'mongoose';

const committeeMembersSchema = new mongoose.Schema({
  name: { type: String, required: true },
  photo: { type: String, default: 'https://via.placeholder.com/150' },
  position: { 
    type: String, 
    required: true 
    // Enum yahan se hata diya hai taaki koi bhi naya pad (role) aasani se save ho sake
  },
  responsibility: { type: String, default: 'प्रबंधन / Management' },
  phone: { type: String, default: '' },
  year: { type: Number, required: true },
  order: { type: Number, default: 99 }
}, { timestamps: true });

export default mongoose.model('CommitteeMember', committeeMembersSchema);