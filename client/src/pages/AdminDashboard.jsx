import React, { useState, useEffect } from 'react';
import { 
  PlusCircle, 
  Trash2, 
  Landmark, 
  Image as ImageIcon, 
  BookOpen, 
  Users, 
  MessageSquare, 
  LogOut, 
  DollarSign,
  CreditCard,
  Menu,
  X,
  Phone
} from 'lucide-react';

export default function AdminDashboard({ onLogout }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('income');

  // --- 1. Income States ---
  const [incomeList, setIncomeList] = useState([]);
  const [incYear, setIncYear] = useState('2026');
  const [incTitle, setIncTitle] = useState('Chanda');
  const [incAmount, setIncAmount] = useState('5100');
  const [incCategory, setIncCategory] = useState('Donation');
  const [incSource, setIncSource] = useState('Ramesh Kumar');
  const [incDate, setIncDate] = useState('2026-10-01');

  // --- 2. Expense States ---
  const [expenseList, setExpenseList] = useState([]);
  const [expYear, setExpYear] = useState('2026');
  const [expTitle, setExpTitle] = useState('Murti Booking');
  const [expAmount, setExpAmount] = useState('25000');
  const [expCategory, setExpCategory] = useState('Decoration');
  const [expReceiver, setExpReceiver] = useState('Artist Sharma');
  const [expDate, setExpDate] = useState('2026-10-02');

  // --- 3. Murti Bari States ---
  const [murtiBariList, setMurtiBariList] = useState([]);
  const [mbYear, setMbYear] = useState('2026');
  const [mbFamilyName, setMbFamilyName] = useState('Gupta Family');
  const [mbFatherName, setMbFatherName] = useState('Late Ram Sahay');
  const [mbAddress, setMbAddress] = useState('Baruna');
  const [mbImage, setMbImage] = useState(null);
  const [mbStatus, setMbStatus] = useState('Current');

  // --- 4. Gallery States ---
  const [galleryList, setGalleryList] = useState([]);
  const [galYear, setGalYear] = useState('2026');
  const [galCategory, setGalCategory] = useState('Maa Durga');
  const [galImageFile, setGalImageFile] = useState(null);
  const [galTitle, setGalTitle] = useState('First Look');
  const [galDesc, setGalDesc] = useState('Maa Durga divine look during pujan.');

  // --- 5. History & Drama States ---
  const [historyList, setHistoryList] = useState([]);
  const [histYear, setHistYear] = useState('2026');
  const [histDayName, setHistDayName] = useState('Saptami');
  const [histDateTime, setHistDateTime] = useState('12 Oct, 7:00 PM');
  const [histCategory, setHistCategory] = useState('Natak');
  const [histImageFile, setHistImageFile] = useState(null);
  const [histTitle, setHistTitle] = useState('Bhakt Prahlad');
  const [histDesc, setHistDesc] = useState('Adivasi and mythological drama.');
  const [histCharacters, setHistCharacters] = useState('Rohan as Prahlad');

  // --- 6. Committee States ---
  const [committeeList, setCommitteeList] = useState([]);
  const [commName, setCommName] = useState('Vishal Singh');
  const [commPad, setCommPad] = useState('Adhyaksh');
  const [commMobile, setCommMobile] = useState('9876543210');
  const [commPhoto, setCommPhoto] = useState(null);
  const [commRole, setCommRole] = useState('Lead Manager');

  // --- 7. Messages States ---
  const [messagesList, setMessagesList] = useState([]);

  useEffect(() => {
    if (activeTab === 'messages') {
      fetch('/api/contact/all')
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) setMessagesList(data);
          else if (data.messages && Array.isArray(data.messages)) setMessagesList(data.messages);
        })
        .catch(err => console.log('Error fetching messages:', err));
    }
  }, [activeTab]);

  const handleDeleteMessage = async (id) => {
    try {
      await fetch(`/api/contact/${id}`, { method: 'DELETE' });
      setMessagesList(messagesList.filter(item => (item._id || item.id) !== id));
    } catch (err) { console.log('Error deleting message:', err); }
  };

  // --- Handlers with Backend APIs ---
  const handleAddIncome = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/income', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        body: JSON.stringify({ year: incYear, title: incTitle, amount: incAmount, category: incCategory, source: incSource, date: incDate })
      });
      const data = await response.json();
      if (response.ok) {
        setIncomeList([data, ...incomeList]);
        alert('Income added successfully!');
      } else { alert(data.message || 'Error saving income'); }
    } catch (err) { console.error('Error:', err); }
  };
  const handleDeleteIncome = (id) => setIncomeList(incomeList.filter(item => item._id !== id));

  const handleAddExpense = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/expenses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        body: JSON.stringify({ year: expYear, title: expTitle, amount: expAmount, category: expCategory, paidTo: expReceiver, date: expDate })
      });
      const data = await response.json();
      if (response.ok) {
        setExpenseList([data, ...expenseList]);
        alert('Expense added successfully!');
      } else { alert(data.message || 'Error saving expense'); }
    } catch (err) { console.error('Error:', err); }
  };
  const handleDeleteExpense = (id) => setExpenseList(expenseList.filter(item => item._id !== id));

  const handleAddMurtiBari = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('year', mbYear);
      formData.append('familyName', mbFamilyName);
      formData.append('fatherName', mbFatherName);
      formData.append('address', mbAddress);
      formData.append('status', mbStatus);
      if (mbImage) formData.append('image', mbImage);

      const response = await fetch('/api/murtibari', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        body: formData
      });
      const data = await response.json();
      if (response.ok) {
        setMurtiBariList([data, ...murtiBariList]);
        alert('Murti Bari added successfully!');
      } else { alert(data.message || 'Error saving Murti Bari'); }
    } catch (err) { console.error('Error:', err); }
  };
  const handleDeleteMurtiBari = (id) => setMurtiBariList(murtiBariList.filter(item => item._id !== id));

  const handleAddGallery = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('year', galYear);
      formData.append('category', galCategory);
      formData.append('title', galTitle);
      formData.append('description', galDesc);
      if (galImageFile) formData.append('image', galImageFile);

      const response = await fetch('/api/gallery', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        body: formData
      });
      const data = await response.json();
      if (response.ok) {
        setGalleryList([data.data, ...galleryList]);
        alert('Photo uploaded successfully!');
      } else { alert(data.message || 'Error uploading photo'); }
    } catch (err) { console.error('Error:', err); }
  };
  const handleDeleteGallery = (id) => setGalleryList(galleryList.filter(item => item._id !== id));

  const handleAddHistory = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('year', histYear);
      formData.append('dayName', histDayName);
      formData.append('date', histDateTime);
      formData.append('category', histCategory);
      formData.append('title', histTitle);
      formData.append('description', histDesc);
      formData.append('characters', histCharacters);
      if (histImageFile) formData.append('image', histImageFile);

      const response = await fetch('/api/history', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        body: formData
      });
      const data = await response.json();
      if (response.ok) {
        setHistoryList([data.data, ...historyList]);
        alert('History event saved successfully!');
      } else { alert(data.message || 'Error saving event'); }
    } catch (err) { console.error('Error:', err); }
  };
  const handleDeleteHistory = (id) => setHistoryList(historyList.filter(item => item._id !== id));

  const handleAddCommittee = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', commName);
      formData.append('pad', commPad);
      formData.append('mobile', commMobile);
      formData.append('role', commRole);
      if (commPhoto) formData.append('image', commPhoto);

      const response = await fetch('/api/members', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        body: formData
      });
      const data = await response.json();
      if (response.ok) {
        setCommitteeList([data, ...committeeList]);
        alert('Committee member added successfully!');
      } else { alert(data.message || 'Error adding member'); }
    } catch (err) { console.error('Error:', err); }
  };
  const handleDeleteCommittee = (id) => setCommitteeList(committeeList.filter(item => item._id !== id));

  const handleLogoutClick = () => {
    localStorage.removeItem('token');
    if (typeof onLogout === 'function') onLogout();
    else window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="font-bold text-xl text-emerald-800 flex items-center gap-2">
            <Landmark className="w-6 h-6" /> Puja Samiti Admin Dashboard
          </h1>
          <div className="flex items-center gap-3">
            <button 
              onClick={handleLogoutClick} 
              className="flex items-center gap-1.5 bg-rose-600 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-rose-700 transition cursor-pointer"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 text-gray-700">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        <nav className={`bg-gray-900 text-white px-4 py-2.5 overflow-x-auto flex gap-2 md:flex md:justify-center md:space-x-2 ${mobileMenuOpen ? 'flex flex-col' : 'hidden md:flex'}`}>
          <button onClick={() => { setActiveTab('income'); setMobileMenuOpen(false); }} className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 whitespace-nowrap cursor-pointer transition ${activeTab === 'income' ? 'bg-emerald-600 text-white' : 'hover:bg-gray-800 text-gray-300'}`}>
            <DollarSign className="w-4 h-4" /> 1. Income
          </button>
          <button onClick={() => { setActiveTab('expense'); setMobileMenuOpen(false); }} className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 whitespace-nowrap cursor-pointer transition ${activeTab === 'expense' ? 'bg-rose-600 text-white' : 'hover:bg-gray-800 text-gray-300'}`}>
            <CreditCard className="w-4 h-4" /> 2. Expense
          </button>
          <button onClick={() => { setActiveTab('murtibari'); setMobileMenuOpen(false); }} className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 whitespace-nowrap cursor-pointer transition ${activeTab === 'murtibari' ? 'bg-amber-600 text-white' : 'hover:bg-gray-800 text-gray-300'}`}>
            <Landmark className="w-4 h-4" /> 3. Murti Bari
          </button>
          <button onClick={() => { setActiveTab('gallery'); setMobileMenuOpen(false); }} className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 whitespace-nowrap cursor-pointer transition ${activeTab === 'gallery' ? 'bg-blue-600 text-white' : 'hover:bg-gray-800 text-gray-300'}`}>
            <ImageIcon className="w-4 h-4" /> 4. Gallery
          </button>
          <button onClick={() => { setActiveTab('history'); setMobileMenuOpen(false); }} className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 whitespace-nowrap cursor-pointer transition ${activeTab === 'history' ? 'bg-purple-600 text-white' : 'hover:bg-gray-800 text-gray-300'}`}>
            <BookOpen className="w-4 h-4" /> 5. History & Drama
          </button>
          <button onClick={() => { setActiveTab('committee'); setMobileMenuOpen(false); }} className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 whitespace-nowrap cursor-pointer transition ${activeTab === 'committee' ? 'bg-indigo-600 text-white' : 'hover:bg-gray-800 text-gray-300'}`}>
            <Users className="w-4 h-4" /> 6. Committee
          </button>
          <button onClick={() => { setActiveTab('messages'); setMobileMenuOpen(false); }} className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 whitespace-nowrap cursor-pointer transition ${activeTab === 'messages' ? 'bg-teal-600 text-white' : 'hover:bg-gray-800 text-gray-300'}`}>
            <MessageSquare className="w-4 h-4" /> 7. Messages
          </button>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto w-full p-4 md:p-6 flex-1">
        {activeTab === 'income' && (
          <div className="bg-white p-6 rounded-xl shadow-sm space-y-6">
            <h2 className="text-xl font-bold text-emerald-800 flex items-center gap-2"><DollarSign className="w-5 h-5"/> Income Management</h2>
            <form onSubmit={handleAddIncome} className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-emerald-50/50 p-4 rounded-xl border border-emerald-100">
              <div><label className="block text-xs font-bold text-gray-700 mb-1">Year</label><input type="text" value={incYear} onChange={(e) => setIncYear(e.target.value)} className="w-full border p-2 rounded bg-white text-sm" required /></div>
              <div><label className="block text-xs font-bold text-gray-700 mb-1">Title</label><input type="text" value={incTitle} onChange={(e) => setIncTitle(e.target.value)} className="w-full border p-2 rounded bg-white text-sm" required /></div>
              <div><label className="block text-xs font-bold text-gray-700 mb-1">Amount (₹)</label><input type="number" value={incAmount} onChange={(e) => setIncAmount(e.target.value)} className="w-full border p-2 rounded bg-white text-sm" required /></div>
              <div><label className="block text-xs font-bold text-gray-700 mb-1">Category</label><input type="text" value={incCategory} onChange={(e) => setIncCategory(e.target.value)} className="w-full border p-2 rounded bg-white text-sm" required /></div>
              <div><label className="block text-xs font-bold text-gray-700 mb-1">Source / Donor</label><input type="text" value={incSource} onChange={(e) => setIncSource(e.target.value)} className="w-full border p-2 rounded bg-white text-sm" /></div>
              <div><label className="block text-xs font-bold text-gray-700 mb-1">Date</label><input type="date" value={incDate} onChange={(e) => setIncDate(e.target.value)} className="w-full border p-2 rounded bg-white text-sm" /></div>
              <div className="md:col-span-3"><button type="submit" className="bg-emerald-600 text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-emerald-700 cursor-pointer">Add Income</button></div>
            </form>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead><tr className="bg-emerald-100 text-emerald-900 text-xs uppercase"><th className="py-2.5 px-4">Year</th><th className="py-2.5 px-4">Title</th><th className="py-2.5 px-4">Amount</th><th className="py-2.5 px-4">Category</th><th className="py-2.5 px-4">Source</th><th className="py-2.5 px-4">Date</th><th className="py-2.5 px-4 text-center">Action</th></tr></thead>
                <tbody className="divide-y divide-gray-100">
                  {incomeList.length === 0 ? <tr><td colSpan="7" className="py-4 text-center text-gray-500 text-xs">No data found.</td></tr> :
                    incomeList.map(item => (
                      <tr key={item._id} className="hover:bg-emerald-50/30">
                        <td className="py-3 px-4 font-bold">{item.year}</td>
                        <td className="py-3 px-4">{item.title}</td>
                        <td className="py-3 px-4 text-emerald-700 font-bold">₹{item.amount}</td>
                        <td className="py-3 px-4">{item.category}</td>
                        <td className="py-3 px-4">{item.source || '-'}</td>
                        <td className="py-3 px-4">{item.date ? item.date.split('T')[0] : '-'}</td>
                        <td className="py-3 px-4 text-center"><button onClick={() => handleDeleteIncome(item._id)} className="bg-rose-100 text-rose-700 p-1.5 rounded hover:bg-rose-600 hover:text-white cursor-pointer"><Trash2 className="w-4 h-4"/></button></td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'expense' && (
          <div className="bg-white p-6 rounded-xl shadow-sm space-y-6">
            <h2 className="text-xl font-bold text-rose-800 flex items-center gap-2"><CreditCard className="w-5 h-5"/> Expense Management</h2>
            <form onSubmit={handleAddExpense} className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-rose-50/50 p-4 rounded-xl border border-rose-100">
              <div><label className="block text-xs font-bold text-gray-700 mb-1">Year</label><input type="text" value={expYear} onChange={(e) => setExpYear(e.target.value)} className="w-full border p-2 rounded bg-white text-sm" required /></div>
              <div><label className="block text-xs font-bold text-gray-700 mb-1">Title</label><input type="text" value={expTitle} onChange={(e) => setExpTitle(e.target.value)} className="w-full border p-2 rounded bg-white text-sm" required /></div>
              <div><label className="block text-xs font-bold text-gray-700 mb-1">Amount (₹)</label><input type="number" value={expAmount} onChange={(e) => setExpAmount(e.target.value)} className="w-full border p-2 rounded bg-white text-sm" required /></div>
              <div><label className="block text-xs font-bold text-gray-700 mb-1">Category</label><input type="text" value={expCategory} onChange={(e) => setExpCategory(e.target.value)} className="w-full border p-2 rounded bg-white text-sm" required /></div>
              <div><label className="block text-xs font-bold text-gray-700 mb-1">Receiver</label><input type="text" value={expReceiver} onChange={(e) => setExpReceiver(e.target.value)} className="w-full border p-2 rounded bg-white text-sm" /></div>
              <div><label className="block text-xs font-bold text-gray-700 mb-1">Date</label><input type="date" value={expDate} onChange={(e) => setExpDate(e.target.value)} className="w-full border p-2 rounded bg-white text-sm" /></div>
              <div className="md:col-span-3"><button type="submit" className="bg-rose-600 text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-rose-700 cursor-pointer">Add Expense</button></div>
            </form>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead><tr className="bg-rose-100 text-rose-900 text-xs uppercase"><th className="py-2.5 px-4">Year</th><th className="py-2.5 px-4">Title</th><th className="py-2.5 px-4">Amount</th><th className="py-2.5 px-4">Category</th><th className="py-2.5 px-4">Receiver</th><th className="py-2.5 px-4">Date</th><th className="py-2.5 px-4 text-center">Action</th></tr></thead>
                <tbody className="divide-y divide-gray-100">
                  {expenseList.length === 0 ? <tr><td colSpan="7" className="py-4 text-center text-gray-500 text-xs">No data found.</td></tr> :
                    expenseList.map(item => (
                      <tr key={item._id} className="hover:bg-rose-50/30">
                        <td className="py-3 px-4 font-bold">{item.year}</td>
                        <td className="py-3 px-4">{item.title}</td>
                        <td className="py-3 px-4 text-rose-700 font-bold">₹{item.amount}</td>
                        <td className="py-3 px-4">{item.category}</td>
                        <td className="py-3 px-4">{item.receiver || '-'}</td>
                        <td className="py-3 px-4">{item.date ? item.date.split('T')[0] : '-'}</td>
                        <td className="py-3 px-4 text-center"><button onClick={() => handleDeleteExpense(item._id)} className="bg-rose-100 text-rose-700 p-1.5 rounded hover:bg-rose-600 hover:text-white cursor-pointer"><Trash2 className="w-4 h-4"/></button></td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'murtibari' && (
          <div className="bg-white p-6 rounded-xl shadow-sm space-y-6">
            <h2 className="text-xl font-bold text-amber-800 flex items-center gap-2"><Landmark className="w-5 h-5"/> Murti Bari Management</h2>
            <form onSubmit={handleAddMurtiBari} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-amber-50/50 p-4 rounded-xl border border-amber-100">
              <div><label className="block text-xs font-bold text-gray-700 mb-1">Year</label><input type="text" value={mbYear} onChange={(e) => setMbYear(e.target.value)} className="w-full border p-2 rounded bg-white text-sm" required /></div>
              <div><label className="block text-xs font-bold text-gray-700 mb-1">Family Name</label><input type="text" value={mbFamilyName} onChange={(e) => setMbFamilyName(e.target.value)} className="w-full border p-2 rounded bg-white text-sm" required /></div>
              <div><label className="block text-xs font-bold text-gray-700 mb-1">Father's Name</label><input type="text" value={mbFatherName} onChange={(e) => setMbFatherName(e.target.value)} className="w-full border p-2 rounded bg-white text-sm" /></div>
              <div><label className="block text-xs font-bold text-gray-700 mb-1">Address</label><input type="text" value={mbAddress} onChange={(e) => setMbAddress(e.target.value)} className="w-full border p-2 rounded bg-white text-sm" /></div>
              <div><label className="block text-xs font-bold text-gray-700 mb-1">Image File</label><input type="file" accept="image/*" onChange={(e) => setMbImage(e.target.files[0])} className="w-full border p-1.5 rounded bg-white text-sm" /></div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Status</label>
                <select value={mbStatus} onChange={(e) => setMbStatus(e.target.value)} className="w-full border p-2 rounded bg-white text-sm">
                  <option value="Upcoming">Upcoming</option>
                  <option value="Current">Current</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              <div className="md:col-span-2"><button type="submit" className="bg-amber-600 text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-amber-700 cursor-pointer">Add Murti Bari</button></div>
            </form>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead><tr className="bg-amber-100 text-amber-900 text-xs uppercase"><th className="py-2.5 px-4">Year</th><th className="py-2.5 px-4">Family Name</th><th className="py-2.5 px-4">Father's Name</th><th className="py-2.5 px-4">Address</th><th className="py-2.5 px-4">Status</th><th className="py-2.5 px-4 text-center">Action</th></tr></thead>
                <tbody className="divide-y divide-gray-100">
                  {murtiBariList.length === 0 ? <tr><td colSpan="6" className="py-4 text-center text-gray-500 text-xs">No records found.</td></tr> :
                    murtiBariList.map(item => (
                      <tr key={item._id} className="hover:bg-amber-50/30">
                        <td className="py-3 px-4 font-bold">{item.year}</td>
                        <td className="py-3 px-4 font-semibold">{item.familyName}</td>
                        <td className="py-3 px-4">{item.fatherName || '-'}</td>
                        <td className="py-3 px-4">{item.address || '-'}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${item.status === 'Current' ? 'bg-emerald-100 text-emerald-800' : item.status === 'Upcoming' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>{item.status}</span>
                        </td>
                        <td className="py-3 px-4 text-center"><button onClick={() => handleDeleteMurtiBari(item._id)} className="bg-rose-100 text-rose-700 p-1.5 rounded hover:bg-rose-600 hover:text-white cursor-pointer"><Trash2 className="w-4 h-4"/></button></td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'gallery' && (
          <div className="bg-white p-6 rounded-xl shadow-sm space-y-6">
            <h2 className="text-xl font-bold text-blue-800 flex items-center gap-2"><ImageIcon className="w-5 h-5"/> Gallery Management</h2>
            <form onSubmit={handleAddGallery} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-blue-50/50 p-4 rounded-xl border border-blue-100">
              <div><label className="block text-xs font-bold text-gray-700 mb-1">Year</label><input type="text" value={galYear} onChange={(e) => setGalYear(e.target.value)} className="w-full border p-2 rounded bg-white text-sm" required /></div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Category</label>
                <select value={galCategory} onChange={(e) => setGalCategory(e.target.value)} className="w-full border p-2 rounded bg-white text-sm">
                  <option value="Maa Durga">Maa Durga</option>
                  <option value="Murti">Murti</option>
                  <option value="Pandal">Pandal</option>
                  <option value="Puja">Puja</option>
                  <option value="Cultural Program">Cultural Program</option>
                  <option value="Visarjan">Visarjan</option>
                  <option value="Committee">Committee</option>
                  <option value="Old Memories">Old Memories</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div><label className="block text-xs font-bold text-gray-700 mb-1">Image File</label><input type="file" accept="image/*" onChange={(e) => setGalImageFile(e.target.files[0])} className="w-full border p-1.5 rounded bg-white text-sm" required /></div>
              <div><label className="block text-xs font-bold text-gray-700 mb-1">Title</label><input type="text" value={galTitle} onChange={(e) => setGalTitle(e.target.value)} className="w-full border p-2 rounded bg-white text-sm" required /></div>
              <div className="md:col-span-2"><label className="block text-xs font-bold text-gray-700 mb-1">Description</label><textarea value={galDesc} onChange={(e) => setGalDesc(e.target.value)} className="w-full border p-2 rounded bg-white text-sm" rows="2"></textarea></div>
              <div className="md:col-span-2"><button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-blue-700 cursor-pointer">Upload Photo</button></div>
            </form>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {galleryList.length === 0 ? <p className="text-gray-500 text-xs">No photos uploaded.</p> :
                galleryList.map(item => (
                  <div key={item._id} className="border rounded-xl p-3 bg-white shadow-sm flex flex-col justify-between">
                    <div>
                      {item.imageUrl && <img src={item.imageUrl} alt={item.title} className="w-full h-36 object-cover rounded-lg mb-2" />}
                      <span className="text-xs font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded">{item.category} ({item.year})</span>
                      <h4 className="font-bold text-gray-900 mt-1">{item.title}</h4>
                      <p className="text-xs text-gray-600 mt-1">{item.description}</p>
                    </div>
                    <button onClick={() => handleDeleteGallery(item._id)} className="mt-3 bg-rose-100 text-rose-700 py-1 rounded text-xs font-bold hover:bg-rose-600 hover:text-white cursor-pointer flex items-center justify-center gap-1"><Trash2 className="w-3.5 h-3.5"/> Delete</button>
                  </div>
                ))
              }
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="bg-white p-6 rounded-xl shadow-sm space-y-6">
            <h2 className="text-xl font-bold text-purple-800 flex items-center gap-2"><BookOpen className="w-5 h-5"/> History & Drama Management</h2>
            <form onSubmit={handleAddHistory} className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-purple-50/50 p-4 rounded-xl border border-purple-100">
              <div><label className="block text-xs font-bold text-gray-700 mb-1">Year</label><input type="text" value={histYear} onChange={(e) => setHistYear(e.target.value)} className="w-full border p-2 rounded bg-white text-sm" required /></div>
              <div><label className="block text-xs font-bold text-gray-700 mb-1">Day Name (Diwas)</label><input type="text" value={histDayName} onChange={(e) => setHistDayName(e.target.value)} className="w-full border p-2 rounded bg-white text-sm" required /></div>
              <div><label className="block text-xs font-bold text-gray-700 mb-1">Date & Time</label><input type="text" value={histDateTime} onChange={(e) => setHistDateTime(e.target.value)} className="w-full border p-2 rounded bg-white text-sm" required /></div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Category</label>
                <select value={histCategory} onChange={(e) => setHistCategory(e.target.value)} className="w-full border p-2 rounded bg-white text-sm">
                  <option value="Natak">Natak</option>
                  <option value="Ramlila">Ramlila</option>
                  <option value="Balibadh">Balibadh</option>
                  <option value="Program">Program</option>
                </select>
              </div>
              <div><label className="block text-xs font-bold text-gray-700 mb-1">Image File</label><input type="file" accept="image/*" onChange={(e) => setHistImageFile(e.target.files[0])} className="w-full border p-1.5 rounded bg-white text-sm" /></div>
              <div><label className="block text-xs font-bold text-gray-700 mb-1">Title</label><input type="text" value={histTitle} onChange={(e) => setHistTitle(e.target.value)} className="w-full border p-2 rounded bg-white text-sm" required /></div>
              <div className="md:col-span-2"><label className="block text-xs font-bold text-gray-700 mb-1">Short Description (Sanchipt Vivran)</label><textarea value={histDesc} onChange={(e) => setHistDesc(e.target.value)} className="w-full border p-2 rounded bg-white text-sm" rows="2"></textarea></div>
              <div><label className="block text-xs font-bold text-gray-700 mb-1">Main Characters (Mukhya Patra)</label><input type="text" value={histCharacters} onChange={(e) => setHistCharacters(e.target.value)} className="w-full border p-2 rounded bg-white text-sm" /></div>
              <div className="md:col-span-3"><button type="submit" className="bg-purple-600 text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-purple-700 cursor-pointer">Save Event</button></div>
            </form>
            <div className="space-y-4">
              {historyList.length === 0 ? <p className="text-gray-500 text-xs">No events recorded.</p> :
                historyList.map(item => (
                  <div key={item._id} className="border rounded-xl p-4 bg-white shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="flex gap-4 items-center">
                      {(item.imageUrl || item.image) && <img src={item.imageUrl || item.image} alt={item.title || "Event Photo"} className="w-24 h-24 object-cover rounded-lg" />}
                      <div>
                        <div className="flex gap-2 items-center"><span className="text-xs font-bold bg-purple-100 text-purple-800 px-2 py-0.5 rounded">{item.category} ({item.year})</span><span className="text-xs text-gray-500">{item.dayName} | {item.dateTime}</span></div>
                        <h4 className="font-bold text-gray-900 text-base mt-1">{item.title}</h4>
                        <p className="text-xs text-gray-600 mt-1">{item.desc}</p>
                        {item.characters && <p className="text-xs text-indigo-700 mt-1 font-semibold">Main Characters: {item.characters}</p>}
                      </div>
                    </div>
                    <button onClick={() => handleDeleteHistory(item._id)} className="bg-rose-100 text-rose-700 p-2 rounded hover:bg-rose-600 hover:text-white cursor-pointer"><Trash2 className="w-4 h-4"/></button>
                  </div>
                ))
              }
            </div>
          </div>
        )}

        {activeTab === 'committee' && (
          <div className="bg-white p-6 rounded-xl shadow-sm space-y-6">
            <h2 className="text-xl font-bold text-indigo-800 flex items-center gap-2"><Users className="w-5 h-5"/> Committee Management</h2>
            <form onSubmit={handleAddCommittee} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-indigo-50/50 p-4 rounded-xl border border-indigo-100">
              <div><label className="block text-xs font-bold text-gray-700 mb-1">Member Name</label><input type="text" value={commName} onChange={(e) => setCommName(e.target.value)} className="w-full border p-2 rounded bg-white text-sm" required /></div>
              <div><label className="block text-xs font-bold text-gray-700 mb-1">Pad (Role/Position)</label><input type="text" value={commPad} onChange={(e) => setCommPad(e.target.value)} className="w-full border p-2 rounded bg-white text-sm" required /></div>
              <div><label className="block text-xs font-bold text-gray-700 mb-1">Mobile Number</label><input type="text" value={commMobile} onChange={(e) => setCommMobile(e.target.value)} className="w-full border p-2 rounded bg-white text-sm" required /></div>
              <div><label className="block text-xs font-bold text-gray-700 mb-1">Photo</label><input type="file" accept="image/*" onChange={(e) => setCommPhoto(e.target.files[0])} className="w-full border p-1.5 rounded bg-white text-sm" /></div>
              <div className="md:col-span-2"><label className="block text-xs font-bold text-gray-700 mb-1">Role / Responsibility Description</label><input type="text" value={commRole} onChange={(e) => setCommRole(e.target.value)} className="w-full border p-2 rounded bg-white text-sm" /></div>
              <div className="md:col-span-2"><button type="submit" className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-indigo-700 cursor-pointer">Add Member</button></div>
            </form>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {committeeList.length === 0 ? <p className="text-gray-500 text-xs">No members found.</p> :
                committeeList.map(item => (
                  <div key={item._id} className="border rounded-xl p-4 bg-white shadow-sm flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img src={item.photoUrl || 'https://via.placeholder.com/150'} alt={item.name} className="w-16 h-16 object-cover rounded-full border" />
                      <div>
                        <h4 className="font-bold text-gray-900">{item.name}</h4>
                        <p className="text-xs font-bold text-indigo-700">{item.pad}</p>
                        <p className="text-xs text-gray-600 flex items-center gap-1 mt-0.5"><Phone className="w-3 h-3"/> {item.mobile}</p>
                        {item.role && <p className="text-xs text-gray-500 mt-0.5">{item.role}</p>}
                      </div>
                    </div>
                    <button onClick={() => handleDeleteCommittee(item._id)} className="bg-rose-100 text-rose-700 p-2 rounded hover:bg-rose-600 hover:text-white cursor-pointer"><Trash2 className="w-4 h-4"/></button>
                  </div>
                ))
              }
            </div>
          </div>
        )}

        {activeTab === 'messages' && (
          <div className="bg-white p-6 rounded-xl shadow-sm space-y-4">
            <h2 className="text-xl font-bold text-teal-800 flex items-center gap-2"><MessageSquare className="w-5 h-5"/> Messages & Suggestions</h2>
            <p className="text-sm text-gray-600">Yahan users dwara bheje gaye saare messages horizontal table format mein dikhenge.</p>
            <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-200">
              {messagesList.length === 0 ? (
                <div className="p-6 text-center text-gray-400 text-sm">Filhal koi naya sandesh praapt nahi hua hai.</div>
              ) : (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-teal-700 text-white text-xs uppercase tracking-wider">
                      <th className="p-3">नाम (Name)</th>
                      <th className="p-3">मोबाइल नंबर (Mobile Number)</th>
                      <th className="p-3">पता (Address)</th>
                      <th className="p-3">आपका संदेश या सुझाव (Message)</th>
                      <th className="p-3 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
                    {messagesList.map((msg) => (
                      <tr key={msg._id || msg.id} className="hover:bg-teal-50/50 transition-colors">
                        <td className="p-3 font-semibold text-gray-900">{msg.name || 'Shradhalu'}</td>
                        <td className="p-3 text-teal-700 font-medium">📞 {msg.phone || 'N/A'}</td>
                        <td className="p-3 text-gray-600">📍 {msg.address || 'N/A'}</td>
                        <td className="p-3">
                          <p className="text-gray-800">{msg.message || msg.text || msg.suggestion || 'N/A'}</p>
                          <span className="text-[10px] text-gray-400 block mt-0.5">{msg.createdAt ? new Date(msg.createdAt).toLocaleString() : ''}</span>
                        </td>
                        <td className="p-3 text-center">
                          <button onClick={() => handleDeleteMessage(msg._id || msg.id)} className="bg-rose-100 text-rose-700 p-2 rounded hover:bg-rose-600 hover:text-white transition-colors cursor-pointer" title="Delete Message">
                            <Trash2 className="w-4 h-4 mx-auto" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}