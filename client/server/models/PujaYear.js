import mongoose from 'mongoose';

const pujaYearSchema = new mongoose.Schema({
  year: { type: Number, required: true, unique: true },
  pujaDate: { type: String, required: true },
  description: { type: String, default: '' },
  isCurrent: { type: Boolean, default: false },
  // Naya field jo aapke history aur day-by-day natak/events ko is saal ke sath jod sake
  events: [
    {
      dayNumber: { type: String, required: true },     // Jaise: 'दिवस 1'
      timeSlot: { type: String, default: '9:00 PM' },  // Jaise: 'प्रथम रात्रि'
      category: { type: String, default: 'नाटक (Drama)' },
      dramaTitle: { type: String, required: true },    // Jaise: 'भक्त प्रह्लाद वध'
      description: { type: String },                   // Natak ka vivaran
      mainCast: { type: String }                       // Mukhya patra
    }
  ]
}, { timestamps: true });

export default mongoose.model('PujaYear', pujaYearSchema);