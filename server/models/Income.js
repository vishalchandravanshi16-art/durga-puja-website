const incomeschema = new mongoose.Schema({
  year: { type: Number, required: true },
  title: { type: String, required: true },
  category: { type: String, required: true },
  source: { type: String, required: true },
  donorName: { type: String, default: 'Anonymous' },
  amount: { type: Number, required: true, min: 0 },
  date: { type: Date, default: Date.now },
  description: { type: String, default: '' }
}, { timestamps: true });

export default mongoose.model('Income', incomeSchema);