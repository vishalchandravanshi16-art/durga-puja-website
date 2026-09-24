import Expense from '../models/Expense.js';

// Get Expense by Year or All Expenses
export const getExpenseByYear = async (req, res) => {
  try {
    const year = req.params.year || req.query.year;
    let query = {};
    if (year) {
      // Dono string aur number formats ko match karne ke liye
      query.$or = [{ year: year }, { year: Number(year) }];
    }
    const expenses = await Expense.find(query).sort({ createdAt: -1 });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create Expense
export const createExpense = async (req, res) => {
  try {
    const newExpense = new Expense(req.body);
    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Expense
export const deleteExpense = async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Expense deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};