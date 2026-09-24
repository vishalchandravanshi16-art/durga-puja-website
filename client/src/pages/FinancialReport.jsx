import React, { useState, useEffect } from 'react';
import API from '../services/api'; // api.js ko import kiya gaya hai
import { TrendingUp, TrendingDown, Wallet, Calendar, Trash2 } from 'lucide-react';

export default function FinancialReport() {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');

  const [incomeList, setIncomeList] = useState([]);
  const [expenseList, setExpenseList] = useState([]);
  
  // Saare available years ko dynamic rakhne ke liye state
  const [allYears, setAllYears] = useState([2026, 2025, 2024, 2023]);
  
  // Check if admin is logged in based on token existence
  const isAdmin = Boolean(localStorage.getItem('token'));

  // Data Fetching Function with Dynamic Years Extraction
  const fetchFinancialsData = async () => {
    setLoading(true);
    try {
      // API instance ka use karke incomes aur expenses fetch karein
      const [incomeRes, expenseRes] = await Promise.all([
        API.get('/incomes').catch(() => ({ data: [] })),
        API.get('/expenses').catch(() => ({ data: [] }))
      ]);

      const rawIncomes = Array.isArray(incomeRes.data) ? incomeRes.data : (incomeRes.data.incomes || incomeRes.data.data || []);
      const rawExpenses = Array.isArray(expenseRes.data) ? expenseRes.data : (expenseRes.data.expenses || expenseRes.data.data || []);

      // Sabhi records se unique years nikalna
      const extractedYears = new Set([2026, 2025, 2024, 2023]);
      
      [...rawIncomes, ...rawExpenses].forEach(item => {
        const yr = item.year ? Number(item.year) : new Date(item.date || item.createdAt).getFullYear();
        if (!isNaN(yr) && yr > 2000 && yr < 2100) {
          extractedYears.add(yr);
        }
      });

      // Saalon ko descending order me sort karna
      const sortedYears = Array.from(extractedYears).sort((a, b) => b - a);
      setAllYears(sortedYears);

      // Selected year ke mutabiq data filter karna
      const filteredIncomes = rawIncomes.filter(item => {
        const itemYear = item.year ? Number(item.year) : new Date(item.date || item.createdAt).getFullYear();
        return Number(itemYear) === Number(selectedYear);
      });

      const filteredExpenses = rawExpenses.filter(item => {
        const itemYear = item.year ? Number(item.year) : new Date(item.date || item.createdAt).getFullYear();
        return Number(itemYear) === Number(selectedYear);
      });

      setIncomeList(filteredIncomes);
      setExpenseList(filteredExpenses);
    } catch (error) {
      console.error("Data Fetching Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFinancialsData();
  }, [selectedYear]);

  // Delete handler for Income or Expense
  const handleDelete = async (id, type) => {
    if (!window.confirm("क्या आप वाकई इस रिकॉर्ड को डिलीट करना चाहते हैं?")) {
      return;
    }

    const endpoint = type === 'income' 
      ? `/incomes/${id}` 
      : `/expenses/${id}`;

    try {
      await API.delete(endpoint);
      
      // Refresh data after successful deletion
      fetchFinancialsData();
    } catch (error) {
      console.error("Delete Error:", error);
      alert(error.response?.data?.message || "डिलीट करने में विफल! कृपया पुनः प्रयास करें।");
    }
  };

  // Calculations
  const totalIncome = incomeList.reduce((sum, item) => sum + Number(item.amount || 0), 0);
  const totalExpense = expenseList.reduce((sum, item) => sum + Number(item.amount || 0), 0);
  const netBalance = totalIncome - totalExpense;

  // Transactions array for combined view
  const allTransactions = [
    ...incomeList.map(item => ({
      id: item._id || item.id,
      title: item.source || item.title || item.category || 'आय',
      amount: Number(item.amount || 0),
      date: item.createdAt || item.date || new Date().toISOString(),
      type: 'income'
    })),
    ...expenseList.map(item => ({
      id: item._id || item.id,
      title: item.paidTo ? `${item.category || 'खर्च'} (${item.paidTo})` : (item.category || item.item || 'खर्च'),
      amount: Number(item.amount || 0),
      date: item.createdAt || item.date || new Date().toISOString(),
      type: 'expense'
    }))
  ].sort((a, b) => new Date(b.date) - new Date(a.date));

  const filteredTransactions = allTransactions.item ? allTransactions : allTransactions.filter(item => {
    if (activeTab === 'income') return item.type === 'income';
    if (activeTab === 'expense') return item.type === 'expense';
    return true;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 py-6 font-sans">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-red-950 via-amber-900 to-red-950 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-amber-500/30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-300 px-3 py-1 rounded-full text-xs font-semibold mb-3 border border-amber-400/30">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>वित्तीय वर्ष विवरण</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-amber-300">
              आय-व्यय ब्योरा / Financial Report
            </h1>
            <p className="text-amber-100/80 text-sm sm:text-base mt-1">
              वर्ष {selectedYear} का संपूर्ण प्रामाणिक एवं पारदर्शी आर्थिक विवरण
            </p>
          </div>

          <div className="bg-black/40 backdrop-blur-md p-2 rounded-2xl border border-amber-500/30">
            <span className="text-xs font-bold text-amber-300/80 px-3 py-1 block uppercase tracking-wider mb-1">
              वर्ष चुनें / Select Year
            </span>
            <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
              {allYears.map((year) => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={`px-4 py-2 rounded-xl font-bold text-sm transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                    selectedYear === year
                      ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-red-950 shadow-amber-500/20 scale-105'
                      : 'bg-white/10 text-amber-100 hover:bg-white/20'
                  }`}
                >
                  <Calendar className="w-4 h-4" />
                  {year}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-amber-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-emerald-500 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase">कुल आय (TOTAL INCOME)</p>
                <h3 className="text-2xl font-extrabold text-emerald-600 mt-1">₹{totalIncome.toLocaleString('hi-IN')}</h3>
              </div>
              <TrendingUp className="w-8 h-8 text-emerald-500" />
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-rose-500 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase">कुल व्यय (TOTAL EXPENSE)</p>
                <h3 className="text-2xl font-extrabold text-rose-600 mt-1">₹{totalExpense.toLocaleString('hi-IN')}</h3>
              </div>
              <TrendingDown className="w-8 h-8 text-rose-500" />
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-amber-500 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase">अंतिम शेष (NET BALANCE)</p>
                <h3 className="text-2xl font-extrabold text-amber-700 mt-1">₹{netBalance.toLocaleString('hi-IN')}</h3>
              </div>
              <Wallet className="w-8 h-8 text-amber-600" />
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-3xl shadow-xl border border-amber-100 overflow-hidden">
            <div className="p-5 bg-amber-50 border-b border-amber-200 flex justify-between items-center">
              <h2 className="text-lg font-bold text-gray-900">वर्ष {selectedYear} का विवरण</h2>
              <div className="flex bg-white p-1 rounded-xl border border-amber-200">
                <button onClick={() => setActiveTab('all')} className={`px-3 py-1 rounded-lg text-xs font-bold cursor-pointer ${activeTab === 'all' ? 'bg-amber-800 text-white' : 'text-gray-600'}`}>सभी ({allTransactions.length})</button>
                <button onClick={() => setActiveTab('income')} className={`px-3 py-1 rounded-lg text-xs font-bold cursor-pointer ${activeTab === 'income' ? 'bg-emerald-600 text-white' : 'text-gray-600'}`}>आय ({incomeList.length})</button>
                <button onClick={() => setActiveTab('expense')} className={`px-3 py-1 rounded-lg text-xs font-bold cursor-pointer ${activeTab === 'expense' ? 'bg-rose-600 text-white' : 'text-gray-600'}`}>व्यय ({expenseList.length})</button>
              </div>
            </div>

            <div className="overflow-x-auto">
              {filteredTransactions.length === 0 ? (
                <div className="p-12 text-center text-gray-500 font-semibold">वर्ष {selectedYear} के लिए कोई रिकॉर्ड नहीं मिला।</div>
              ) : (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 text-gray-600 text-xs font-bold uppercase border-b">
                      <th className="py-3 px-6">प्रकार</th>
                      <th className="py-3 px-6">विवरण</th>
                      <th className="py-3 px-6">दिनांक</th>
                      <th className="py-3 px-6 text-right">राशि</th>
                      {isAdmin && <th className="py-3 px-6 text-center">एक्शन</th>}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-sm">
                    {filteredTransactions.map((item) => (
                      <tr key={`${item.type}-${item.id}`} className="hover:bg-amber-50/40">
                        <td className="py-4 px-6 font-bold">
                          {item.type === 'income' ? <span className="text-emerald-700 bg-emerald-100 px-2 py-1 rounded-full text-xs">आय</span> : <span className="text-rose-700 bg-rose-100 px-2 py-1 rounded-full text-xs">व्यय</span>}
                        </td>
                        <td className="py-4 px-6 font-semibold text-gray-900">{item.title}</td>
                        <td className="py-4 px-6 text-gray-500">{new Date(item.date).toLocaleDateString('hi-IN')}</td>
                        <td className={`py-4 px-6 text-right font-extrabold text-base ${item.type === 'income' ? 'text-emerald-600' : 'text-rose-600'}`}>
                          {item.type === 'income' ? '+' : '-'} ₹{item.amount.toLocaleString('hi-IN')}
                        </td>
                        {isAdmin && (
                          <td className="py-4 px-6 text-center">
                            <button
                              onClick={() => handleDelete(item.id, item.type)}
                              className="bg-rose-100 text-rose-700 hover:bg-rose-600 hover:text-white p-2 rounded-xl transition-all duration-200 cursor-pointer"
                              title="रिकॉर्ड डिलीट करें"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}