import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
  year: { type: Number, required: true },
  category: { 
    type: String, 
    required: true
  },
  amount: { type: Number, required: true, min: 0 },
  date: { type: Date, default: Date.now },
  paidTo: { type: String, required: true },
  billUrl: { type: String, default: '' },
  description: { type: String, default: '' }
}, { timestamps: true });

export default mongoose.model('Expense', expenseSchema);