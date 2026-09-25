import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { TrendingUp, TrendingDown, Wallet, Calendar, Trash2 } from 'lucide-react';

export default function FinancialReport() {
  const [selectedYear, setSelectedYear] = useState('all');
  const [loading, setLoading] = useState(true);
  const [incomeList, setIncomeList] = useState([]);
  const [expenseList, setExpenseList] = useState([]);
  const [activeTab, setActiveTab] = useState('all');

  const isAdmin = Boolean(localStorage.getItem('token'));

  const fetchFinancialData = async () => {
    setLoading(true);
    try {
      let incomeRes = { data: [] };
      let expenseRes = { data: [] };

      try {
        incomeRes = await API.get('/incomes');
      } catch (e) {
        try { incomeRes = await API.get('/income'); } catch (err) { console.error("Income fetch failed"); }
      }

      try {
        expenseRes = await API.get('/expenses');
      } catch (e) {
        try { expenseRes = await API.get('/expense'); } catch (err) { console.error("Expense fetch failed"); }
      }

      const incomesData = Array.isArray(incomeRes.data) ? incomeRes.data : (incomeRes.data.incomes || incomeRes.data.data || []);
      const expensesData = Array.isArray(expenseRes.data) ? expenseRes.data : (expenseRes.data.expenses || expenseRes.data.data || []);

      setIncomeList(incomesData);
      setExpenseList(expensesData);
    } catch (error) {
      console.error("Error fetching financials:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFinancialData();
  }, []);

  const handleDelete = async (id, type) => {
    if (!isAdmin) {
      alert("Kshama karein, yeh karya kewal admin kar sakta hai!");
      return;
    }
    if (!window.confirm("Kya aap waakai is record ko delete karna chahte hain?")) return;

    try {
      const endpoint = type === 'income' ? `/incomes/${id}` : `/expenses/${id}`;
      await API.delete(endpoint);
      fetchFinancialData();
    } catch (error) {
      console.error("Delete error:", error);
      alert("Delete karne mein safal nahi hue!");
    }
  };

  // Format and combine data safely
  const formattedIncomes = incomeList.map(item => {
    const rawDate = item.date || item.createdAt || '2026-01-01';
    const cleanDate = rawDate.includes('T') ? rawDate.split('T')[0] : rawDate;
    const extractedYear = String(item.year || cleanDate.split('-')[0] || '2026');
    return {
      id: item._id || item.id,
      title: item.title || item.source || item.category || 'Aay (Income)',
      category: item.category || 'General',
      details: item.source || item.details || '-',
      amount: Number(item.amount || 0),
      date: cleanDate,
      year: extractedYear,
      type: 'income'
    };
  });

  const formattedExpenses = expenseList.map(item => {
    const rawDate = item.date || item.createdAt || '2026-01-01';
    const cleanDate = rawDate.includes('T') ? rawDate.split('T')[0] : rawDate;
    const extractedYear = String(item.year || cleanDate.split('-')[0] || '2026');
    return {
      id: item._id || item.id,
      title: item.title || item.category || 'Kharch (Expense)',
      category: item.category || 'General',
      details: item.paidTo ? `Paid to: ${item.paidTo}` : (item.details || '-'),
      amount: Number(item.amount || 0),
      date: cleanDate,
      year: extractedYear,
      type: 'expense'
    };
  });

  const allTransactions = [...formattedIncomes, ...formattedExpenses].sort((a, b) => new Date(b.date) - new Date(a.date));

  // Extract all unique years dynamically from data and sort them descending
  const availableYears = [...new Set(allTransactions.map(item => item.year))].sort((a, b) => b.localeId ? b.localeCompare(a) : b - a);

  const filteredTransactions = selectedYear === 'all' 
    ? allTransactions 
    : allTransactions.filter(item => String(item.year) === String(selectedYear));

  const finalDisplayList = filteredTransactions.filter(item => {
    if (activeTab === 'income') return item.type === 'income';
    if (activeTab === 'expense') return item.type === 'expense';
    return true;
  });

  const totalIncome = filteredTransactions.filter(i => i.type === 'income').reduce((sum, i) => sum + i.amount, 0);
  const totalExpense = filteredTransactions.filter(i => i.type === 'expense').reduce((sum, i) => sum + i.amount, 0);
  const netBalance = totalIncome - totalExpense;

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 py-6 font-sans">
      <div className="bg-gradient-to-r from-red-950 via-amber-900 to-red-950 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-amber-500/30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-300 px-3 py-1 rounded-full text-xs font-semibold mb-3 border border-amber-400/30">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>Vittiya Varsh Vivaran</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-amber-300">
              Aay-Vyay Byora / Financial Report
            </h1>
            <p className="text-amber-100/80 text-sm sm:text-base mt-1">
              Sampurna pramanik evam pardarshi aarthik vivaran (Sarvajanik)
            </p>
          </div>

          <div className="bg-black/40 backdrop-blur-md p-2 rounded-2xl border border-amber-500/30">
            <span className="text-xs font-bold text-amber-300/80 px-3 py-1 block uppercase tracking-wider mb-1">
              Varsh Chune / Select Year
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedYear('all')}
                className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                  selectedYear === 'all' ? 'bg-amber-400 text-red-950' : 'bg-white/10 text-amber-100 hover:bg-white/20'
                }`}
              >
                Sabhi (All)
              </button>
              {availableYears.map((yr) => (
                <button
                  key={yr}
                  onClick={() => setSelectedYear(yr)}
                  className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                    selectedYear === yr ? 'bg-amber-400 text-red-950' : 'bg-white/10 text-amber-100 hover:bg-white/20'
                  }`}
                >
                  {yr}
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-emerald-500 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase">Kul Aay / Total Income</p>
                <h3 className="text-2xl font-extrabold text-emerald-600 mt-1">₹{totalIncome.toLocaleString('hi-IN')}</h3>
              </div>
              <TrendingUp className="w-8 h-8 text-emerald-500" />
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-rose-500 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase">Kul Vyay / Total Expense</p>
                <h3 className="text-2xl font-extrabold text-rose-600 mt-1">₹{totalExpense.toLocaleString('hi-IN')}</h3>
              </div>
              <TrendingDown className="w-8 h-8 text-rose-500" />
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-amber-500 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase">Antim Sesh / Net Balance</p>
                <h3 className="text-2xl font-extrabold text-amber-700 mt-1">₹{netBalance.toLocaleString('hi-IN')}</h3>
              </div>
              <Wallet className="w-8 h-8 text-amber-600" />
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-xl border border-amber-100 overflow-hidden">
            <div className="p-5 bg-amber-50 border-b border-amber-200 flex flex-col sm:flex-row justify-between items-center gap-4">
              <h2 className="text-lg font-bold text-gray-900">Len-Den Vivaran (Transactions)</h2>
              <div className="flex bg-white p-1 rounded-xl border border-amber-200">
                <button onClick={() => setActiveTab('all')} className={`px-3 py-1 rounded-lg text-xs font-bold cursor-pointer ${activeTab === 'all' ? 'bg-amber-800 text-white' : 'text-gray-600'}`}>Sabhi ({filteredTransactions.length})</button>
                <button onClick={() => setActiveTab('income')} className={`px-3 py-1 rounded-lg text-xs font-bold cursor-pointer ${activeTab === 'income' ? 'bg-emerald-600 text-white' : 'text-gray-600'}`}>Aay</button>
                <button onClick={() => setActiveTab('expense')} className={`px-3 py-1 rounded-lg text-xs font-bold cursor-pointer ${activeTab === 'expense' ? 'bg-rose-600 text-white' : 'text-gray-600'}`}>Vyay</button>
              </div>
            </div>

            <div className="overflow-x-auto">
              {finalDisplayList.length === 0 ? (
                <div className="p-12 text-center text-gray-500 font-semibold">Koi record uplabdh nahi hai.</div>
              ) : (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 text-gray-600 text-xs font-bold uppercase border-b">
                      <th className="py-3 px-6">Prakar</th>
                      <th className="py-3 px-6">Shirsak / Vivaran</th>
                      <th className="py-3 px-6">Shreni</th>
                      <th className="py-3 px-6">Dinank</th>
                      <th className="py-3 px-6 text-right">Rashi</th>
                      {isAdmin && <th className="py-3 px-6 text-center">Action</th>}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-sm">
                    {finalDisplayList.map((item) => (
                      <tr key={`${item.type}-${item.id}`} className="hover:bg-amber-50/40">
                        <td className="py-4 px-6 font-bold">
                          {item.type === 'income' ? (
                            <span className="text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full text-xs">Aay</span>
                          ) : (
                            <span className="text-rose-700 bg-rose-100 px-2.5 py-1 rounded-full text-xs">Vyay</span>
                          )}
                        </td>
                        <td className="py-4 px-6">
                          <div className="font-bold text-gray-900">{item.title}</div>
                          <div className="text-xs text-gray-500">{item.details}</div>
                        </td>
                        <td className="py-4 px-6 text-gray-600 font-medium">{item.category}</td>
                        <td className="py-4 px-6 text-gray-500">{item.date}</td>
                        <td className={`py-4 px-6 text-right font-extrabold text-base ${item.type === 'income' ? 'text-emerald-600' : 'text-rose-600'}`}>
                          {item.type === 'income' ? '+' : '-'} ₹{item.amount.toLocaleString('hi-IN')}
                        </td>
                        {isAdmin && (
                          <td className="py-4 px-6 text-center">
                            <button
                              onClick={() => handleDelete(item.id, item.type)}
                              className="bg-rose-100 text-rose-700 hover:bg-rose-600 hover:text-white p-2 rounded-xl transition-all duration-200 cursor-pointer"
                              title="Delete"
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