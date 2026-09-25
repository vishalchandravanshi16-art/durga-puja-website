const expenseSchema = new mongoose.Schema({
  year: { type: Number, required: true },
  title: { type: String, required: true }, // <--- Yeh line jodh dein
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