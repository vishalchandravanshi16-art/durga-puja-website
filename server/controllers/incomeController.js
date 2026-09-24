import Income from '../models/Income.js';

// Get Income by Year or All Incomes
export const getIncomeByYear = async (req, res) => {
  try {
    const year = req.params.year || req.query.year;
    let query = {};
    if (year) {
      // Dono string aur number formats ko match karne ke liye
      query.$or = [{ year: year }, { year: Number(year) }];
    }
    const incomes = await Income.find(query).sort({ createdAt: -1 });
    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create Income
export const createIncome = async (req, res) => {
  try {
    const newIncome = new Income(req.body);
    await newIncome.save();
    res.status(201).json(newIncome);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Income
export const deleteIncome = async (req, res) => {
  try {
    await Income.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Income deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};