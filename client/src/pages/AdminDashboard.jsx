import React, { useState, useEffect } from 'react';
import { 
  PlusCircle, 
  Trash2, 
  Edit3, 
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
  Calendar,
  Phone,
  FileText
} from 'lucide-react';

export default function AdminDashboard({ onLogout }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('income');

  // --- 1. Income States ---
  const [incomeList, setIncomeList] = useState([]);
  const [incYear, setIncYear] = useState('');
  const [incTitle, setIncTitle] = useState('');
  const [incAmount, setIncAmount] = useState('');
  const [incCategory, setIncCategory] = useState('');
  const [incSource, setIncSource] = useState('');
  const [incDate, setIncDate] = useState('');

  // --- 2. Expense States ---
  const [expenseList, setExpenseList] = useState([]);
  const [expYear, setExpYear] = useState('');
  const [expTitle, setExpTitle] = useState('');
  const [expAmount, setExpAmount] = useState('');
  const [expCategory, setExpCategory] = useState('');
  const [expReceiver, setExpReceiver] = useState('');
  const [expDate, setExpDate] = useState('');

  // --- 3. Murti Bari States ---
  const [murtiBariList, setMurtiBariList] = useState([]);
  const [mbYear, setMbYear] = useState('');
  const [mbFamilyName, setMbFamilyName] = useState('');
  const [mbFatherName, setMbFatherName] = useState('');
  const [mbAddress, setMbAddress] = useState('');
  const [mbStatus, setMbStatus] = useState('Upcoming');

  // --- 4. Gallery States ---
  const [galleryList, setGalleryList] = useState([]);
  const [galYear, setGalYear] = useState('');
  const [galCategory, setGalCategory] = useState('Maa Durga');
  const [galImageFile, setGalImageFile] = useState(null);
  const [galTitle, setGalTitle] = useState('');
  const [galDesc, setGalDesc] = useState('');

  // --- 5. History & Drama States ---
  const [historyList, setHistoryList] = useState([]);
  const [histYear, setHistYear] = useState('');
  const [histDayName, setHistDayName] = useState('');
  const [histDateTime, setHistDateTime] = useState('');
  const [histCategory, setHistCategory] = useState('Natak');
  const [histImageFile, setHistImageFile] = useState(null);
  const [histTitle, setHistTitle] = useState('');
  const [histDesc, setHistDesc] = useState('');
  const [histCharacters, setHistCharacters] = useState('');

  // --- 6. Committee States ---
  const [committeeList, setCommitteeList] = useState([]);
  const [commName, setCommName] = useState('');
  const [commPad, setCommPad] = useState('');
  const [commMobile, setCommMobile] = useState('');
  const [commPhoto, setCommPhoto] = useState(null);
  const [commRole, setCommRole] = useState('');

  // --- 7. Messages States ---
  const [messagesList, setMessagesList] = useState([]);

  // Fetch Messages when Messages tab is active
  useEffect(() => {
    if (activeTab === 'messages') {
      fetch('/api/messages') // Agar aapka endpoint alag ho jaise '/api/contact', toh yahan change kar sakte hain
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) {
            setMessagesList(data);
          } else if (data.messages && Array.isArray(data.messages)) {
            setMessagesList(data.messages);
          }
        })
        .catch(err => console.log('Error fetching messages:', err));
    }
  }, [activeTab]);

  const handleDeleteMessage = async (id) => {
    try {
      await fetch(`/api/messages/${id}`, { method: 'DELETE' });
      setMessagesList(messagesList.filter(item => (item._id || item.id) !== id));
    } catch (err) {
      console.log('Error deleting message:', err);
    }
  };

  // --- Handlers ---
  const handleAddIncome = (e) => {
    e.preventDefault();
    const newItem = { _id: Date.now().toString(), year: incYear, title: incTitle, amount: incAmount, category: incCategory, source: incSource, date: incDate };
    setIncomeList([newItem, ...incomeList]);
    setIncYear(''); setIncTitle(''); setIncAmount(''); setIncCategory(''); setIncSource(''); setIncDate('');
  };
  const handleDeleteIncome = (id) => setIncomeList(incomeList.filter(item => item._id !== id));

  const handleAddExpense = (e) => {
    e.preventDefault();
    const newItem = { _id: Date.now().toString(), year: expYear, title: expTitle, amount: expAmount, category: expCategory, receiver: expReceiver, date: expDate };
    setExpenseList([newItem, ...expenseList]);
    setExpYear(''); setExpTitle(''); setExpAmount(''); setExpCategory(''); setExpReceiver(''); setExpDate('');
  };
  const handleDeleteExpense = (id) => setExpenseList(expenseList.filter(item => item._id !== id));

  const handleAddMurtiBari = (e) => {
    e.preventDefault();
    const newItem = { _id: Date.now().toString(), year: mbYear, familyName: mbFamilyName, fatherName: mbFatherName, address: mbAddress, status: mbStatus };
    setMurtiBariList([newItem, ...murtiBariList]);
    setMbYear(''); setMbFamilyName(''); setMbFatherName(''); setMbAddress(''); setMbStatus('Upcoming');
  };
  const handleDeleteMurtiBari = (id) => setMurtiBariList(murtiBariList.filter(item => item._id !== id));

  const handleAddGallery = (e) => {
    e.preventDefault();
    const newItem = { _id: Date.now().toString(), year: galYear, category: galCategory, title: galTitle, desc: galDesc, imageUrl: galImageFile ? URL.createObjectURL(galImageFile) : '' };
    setGalleryList([newItem, ...galleryList]);
    setGalYear(''); setGalTitle(''); setGalDesc(''); setGalImageFile(null);
  };
  const handleDeleteGallery = (id) => setGalleryList(galleryList.filter(item => item._id !== id));

  const handleAddHistory = (e) => {
    e.preventDefault();
    const newItem = { _id: Date.now().toString(), year: histYear, dayName: histDayName, dateTime: histDateTime, category: histCategory, title: histTitle, desc: histDesc, characters: histCharacters, imageUrl: histImageFile ? URL.createObjectURL(histImageFile) : '' };
    setHistoryList([newItem, ...historyList]);
    setHistYear(''); setHistDayName(''); setHistDateTime(''); setHistTitle(''); setHistDesc(''); setHistCharacters(''); setHistImageFile(null);
  };
  const handleDeleteHistory = (id) => setHistoryList(historyList.filter(item => item._id !== id));

  const handleAddCommittee = (e) => {
    e.preventDefault();
    const newItem = { _id: Date.now().toString(), name: commName, pad: commPad, mobile: commMobile, role: commRole, photoUrl: commPhoto ? URL.createObjectURL(commPhoto) : '' };
    setCommitteeList([newItem, ...committeeList]);
    setCommName(''); setCommPad(''); setCommMobile(''); setCommRole(''); setCommPhoto(null);
  };
  const handleDeleteCommittee = (id) => setCommitteeList(committeeList.filter(item => item._id !== id));

  const handleLogoutClick = () => {
    localStorage.removeItem('token');
    if (typeof onLogout === 'function') onLogout();
    else window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Header & Horizontal Navigation Bar */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="font-bold text-xl text-emerald-800 flex items-center gap-2">
            <Landmark className="w-6 h-6" /> पूजा समिति एडमिन डैशबोर्ड
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

        {/* Horizontal Navigation Tabs */}
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

      {/* Main Container */}
      <main className="max-w-7xl mx-auto w-full p-4 md:p-6 flex-1">

        {/* 1. INCOME TAB */}
        {activeTab === 'income' && (
          <div className="bg-white p-6 rounded-xl shadow-sm space-y-6">
            <h2 className="text-xl font-bold text-emerald-800 flex items-center gap-2"><DollarSign className="w-5 h-5"/> आय प्रबंधन (Income Management)</h2>
            <form onSubmit={handleAddIncome} className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-emerald-50/50 p-4 rounded-xl border border-emerald-100">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Year (वर्ष)</label>
                <input type="text" value={incYear} onChange={(e) => setIncYear(e.target.value)} placeholder="जैसे: 2026" className="w-full border p-2 rounded bg-white text-sm" required />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Title (शीर्षक)</label>
                <input type="text" value={incTitle} onChange={(e) => setIncTitle(e.target.value)} placeholder="शीर्षक लिखें" className="w-full border p-2 rounded bg-white text-sm" required />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Amount (राशि ₹)</label>
                <input type="number" value={incAmount} onChange={(e) => setIncAmount(e.target.value)} placeholder="राशि दर्ज करें" className="w-full border p-2 rounded bg-white text-sm" required />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Category (श्रेणी)</label>
                <input type="text" value={incCategory} onChange={(e) => setIncCategory(e.target.value)} placeholder="श्रेणी टाइप करें" className="w-full border p-2 rounded bg-white text-sm" required />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Source / Donor (प्राप्तकर्ता/स्रोत)</label>
                <input type="text" value={incSource} onChange={(e) => setIncSource(e.target.value)} placeholder="नाम या स्रोत" className="w-full border p-2 rounded bg-white text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Date (दिनांक)</label>
                <input type="date" value={incDate} onChange={(e) => setIncDate(e.target.value)} className="w-full border p-2 rounded bg-white text-sm" />
              </div>
              <div className="md:col-span-3">
                <button type="submit" className="bg-emerald-600 text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-emerald-700 cursor-pointer">Add Income</button>
              </div>
            </form>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-emerald-100 text-emerald-900 text-xs uppercase">
                    <th className="py-2.5 px-4">वर्ष</th>
                    <th className="py-2.5 px-4">शीर्षक</th>
                    <th className="py-2.5 px-4">राशि</th>
                    <th className="py-2.5 px-4">श्रेणी</th>
                    <th className="py-2.5 px-4">स्रोत</th>
                    <th className="py-2.5 px-4">दिनांक</th>
                    <th className="py-2.5 px-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {incomeList.length === 0 ? <tr><td colSpan="7" className="py-4 text-center text-gray-500 text-xs">कोई डेटा नहीं है।</td></tr> :
                    incomeList.map(item => (
                      <tr key={item._id} className="hover:bg-emerald-50/30">
                        <td className="py-3 px-4 font-bold">{item.year}</td>
                        <td className="py-3 px-4">{item.title}</td>
                        <td className="py-3 px-4 text-emerald-700 font-bold">₹{item.amount}</td>
                        <td className="py-3 px-4">{item.category}</td>
                        <td className="py-3 px-4">{item.source || '-'}</td>
                        <td className="py-3 px-4">{item.date || '-'}</td>
                        <td className="py-3 px-4 text-center">
                          <button onClick={() => handleDeleteIncome(item._id)} className="bg-rose-100 text-rose-700 p-1.5 rounded hover:bg-rose-600 hover:text-white cursor-pointer"><Trash2 className="w-4 h-4"/></button>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 2. EXPENSE TAB */}
        {activeTab === 'expense' && (
          <div className="bg-white p-6 rounded-xl shadow-sm space-y-6">
            <h2 className="text-xl font-bold text-rose-800 flex items-center gap-2"><CreditCard className="w-5 h-5"/> खर्च प्रबंधन (Expense Management)</h2>
            <form onSubmit={handleAddExpense} className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-rose-50/50 p-4 rounded-xl border border-rose-100">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Year (वर्ष)</label>
                <input type="text" value={expYear} onChange={(e) => setExpYear(e.target.value)} placeholder="जैसे: 2026" className="w-full border p-2 rounded bg-white text-sm" required />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Title (शीर्षक)</label>
                <input type="text" value={expTitle} onChange={(e) => setExpTitle(e.target.value)} placeholder="खर्च का शीर्षक" className="w-full border p-2 rounded bg-white text-sm" required />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Amount (राशि ₹)</label>
                <input type="number" value={expAmount} onChange={(e) => setExpAmount(e.target.value)} placeholder="राशि दर्ज करें" className="w-full border p-2 rounded bg-white text-sm" required />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Category (श्रेणी)</label>
                <input type="text" value={expCategory} onChange={(e) => setExpCategory(e.target.value)} placeholder="श्रेणी टाइप करें" className="w-full border p-2 rounded bg-white text-sm" required />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Receiver (भुगतान किसे हुआ)</label>
                <input type="text" value={expReceiver} onChange={(e) => setExpReceiver(e.target.value)} placeholder="प्राप्तकर्ता का नाम" className="w-full border p-2 rounded bg-white text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Date (दिनांक)</label>
                <input type="date" value={expDate} onChange={(e) => setExpDate(e.target.value)} className="w-full border p-2 rounded bg-white text-sm" />
              </div>
              <div className="md:col-span-3">
                <button type="submit" className="bg-rose-600 text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-rose-700 cursor-pointer">Add Expense</button>
              </div>
            </form>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-rose-100 text-rose-900 text-xs uppercase">
                    <th className="py-2.5 px-4">वर्ष</th>
                    <th className="py-2.5 px-4">शीर्षक</th>
                    <th className="py-2.5 px-4">राशि</th>
                    <th className="py-2.5 px-4">श्रेणी</th>
                    <th className="py-2.5 px-4">प्राप्तकर्ता</th>
                    <th className="py-2.5 px-4">दिनांक</th>
                    <th className="py-2.5 px-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {expenseList.length === 0 ? <tr><td colSpan="7" className="py-4 text-center text-gray-500 text-xs">कोई डेटा नहीं है।</td></tr> :
                    expenseList.map(item => (
                      <tr key={item._id} className="hover:bg-rose-50/30">
                        <td className="py-3 px-4 font-bold">{item.year}</td>
                        <td className="py-3 px-4">{item.title}</td>
                        <td className="py-3 px-4 text-rose-700 font-bold">₹{item.amount}</td>
                        <td className="py-3 px-4">{item.category}</td>
                        <td className="py-3 px-4">{item.receiver || '-'}</td>
                        <td className="py-3 px-4">{item.date || '-'}</td>
                        <td className="py-3 px-4 text-center">
                          <button onClick={() => handleDeleteExpense(item._id)} className="bg-rose-100 text-rose-700 p-1.5 rounded hover:bg-rose-600 hover:text-white cursor-pointer"><Trash2 className="w-4 h-4"/></button>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 3. MURTI BARI TAB */}
        {activeTab === 'murtibari' && (
          <div className="bg-white p-6 rounded-xl shadow-sm space-y-6">
            <h2 className="text-xl font-bold text-amber-800 flex items-center gap-2"><Landmark className="w-5 h-5"/> मूर्ति बारी जोड़ें (Add Murti Bari)</h2>
            <form onSubmit={handleAddMurtiBari} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-amber-50/50 p-4 rounded-xl border border-amber-100">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Year (वर्ष)</label>
                <input type="text" value={mbYear} onChange={(e) => setMbYear(e.target.value)} placeholder="वर्ष लिखें" className="w-full border p-2 rounded bg-white text-sm" required />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Family Name (परिवार का नाम)</label>
                <input type="text" value={mbFamilyName} onChange={(e) => setMbFamilyName(e.target.value)} placeholder="परिवार का नाम" className="w-full border p-2 rounded bg-white text-sm" required />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Father's Name (पिता का नाम)</label>
                <input type="text" value={mbFatherName} onChange={(e) => setMbFatherName(e.target.value)} placeholder="पिता का नाम" className="w-full border p-2 rounded bg-white text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Address (पता)</label>
                <input type="text" value={mbAddress} onChange={(e) => setMbAddress(e.target.value)} placeholder="गाँव/पत्ता" className="w-full border p-2 rounded bg-white text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Status (स्थिति)</label>
                <select value={mbStatus} onChange={(e) => setMbStatus(e.target.value)} className="w-full border p-2 rounded bg-white text-sm">
                  <option value="Upcoming">Upcoming</option>
                  <option value="Current">Current</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <button type="submit" className="bg-amber-600 text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-amber-700 cursor-pointer">Add Murti Bari</button>
              </div>
            </form>

            <div className="overflow-x-auto">
              <h3 className="text-sm font-bold text-gray-700 mb-2 uppercase">मूर्ति बारी सूची (Murti Bari List)</h3>
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-amber-100 text-amber-900 text-xs uppercase">
                    <th className="py-2.5 px-4">वर्ष (Year)</th>
                    <th className="py-2.5 px-4">परिवार का नाम</th>
                    <th className="py-2.5 px-4">पिता का नाम</th>
                    <th className="py-2.5 px-4">पता</th>
                    <th className="py-2.5 px-4">स्थिति</th>
                    <th className="py-2.5 px-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {murtiBariList.length === 0 ? <tr><td colSpan="6" className="py-4 text-center text-gray-500 text-xs">कोई रिकॉर्ड नहीं है।</td></tr> :
                    murtiBariList.map(item => (
                      <tr key={item._id} className="hover:bg-amber-50/30">
                        <td className="py-3 px-4 font-bold">{item.year}</td>
                        <td className="py-3 px-4 font-semibold">{item.familyName}</td>
                        <td className="py-3 px-4">{item.fatherName || '-'}</td>
                        <td className="py-3 px-4">{item.address || '-'}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${item.status === 'Current' ? 'bg-emerald-100 text-emerald-800' : item.status === 'Upcoming' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <button onClick={() => handleDeleteMurtiBari(item._id)} className="bg-rose-100 text-rose-700 p-1.5 rounded hover:bg-rose-600 hover:text-white cursor-pointer"><Trash2 className="w-4 h-4"/></button>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 4. GALLERY TAB */}
        {activeTab === 'gallery' && (
          <div className="bg-white p-6 rounded-xl shadow-sm space-y-6">
            <h2 className="text-xl font-bold text-blue-800 flex items-center gap-2"><ImageIcon className="w-5 h-5"/> गैलरी में फोटो जोड़ें (Add Gallery Photo)</h2>
            <form onSubmit={handleAddGallery} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-blue-50/50 p-4 rounded-xl border border-blue-100">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Year (वर्ष)</label>
                <input type="text" value={galYear} onChange={(e) => setGalYear(e.target.value)} placeholder="वर्ष लिखें" className="w-full border p-2 rounded bg-white text-sm" required />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Category (श्रेणी)</label>
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
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Image File (फोटो चुनें)</label>
                <input type="file" accept="image/*" onChange={(e) => setGalImageFile(e.target.files[0])} className="w-full border p-1.5 rounded bg-white text-sm" required />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Title (शीर्षक)</label>
                <input type="text" value={galTitle} onChange={(e) => setGalTitle(e.target.value)} placeholder="फोटो शीर्षक" className="w-full border p-2 rounded bg-white text-sm" required />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-gray-700 mb-1">Description (विवरण)</label>
                <textarea value={galDesc} onChange={(e) => setGalDesc(e.target.value)} placeholder="विवरण लिखें" className="w-full border p-2 rounded bg-white text-sm" rows="2"></textarea>
              </div>
              <div className="md:col-span-2">
                <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-blue-700 cursor-pointer">Upload Photo</button>
              </div>
            </form>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {galleryList.length === 0 ? <p className="text-gray-500 text-xs">कोई फोटो अपलोड नहीं की गई है।</p> :
                galleryList.map(item => (
                  <div key={item._id} className="border rounded-xl p-3 bg-white shadow-sm flex flex-col justify-between">
                    <div>
                      {item.imageUrl && <img src={item.imageUrl} alt={item.title} className="w-full h-36 object-cover rounded-lg mb-2" />}
                      <span className="text-xs font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded">{item.category} ({item.year})</span>
                      <h4 className="font-bold text-gray-900 mt-1">{item.title}</h4>
                      <p className="text-xs text-gray-600 mt-1">{item.desc}</p>
                    </div>
                    <button onClick={() => handleDeleteGallery(item._id)} className="mt-3 bg-rose-100 text-rose-700 py-1 rounded text-xs font-bold hover:bg-rose-600 hover:text-white cursor-pointer flex items-center justify-center gap-1"><Trash2 className="w-3.5 h-3.5"/> Delete</button>
                  </div>
                ))
              }
            </div>
          </div>
        )}

        {/* 5. HISTORY & DRAMA TAB */}
        {activeTab === 'history' && (
          <div className="bg-white p-6 rounded-xl shadow-sm space-y-6">
            <h2 className="text-xl font-bold text-purple-800 flex items-center gap-2"><BookOpen className="w-5 h-5"/> इतिहास व नाटक कार्यक्रम (History & Drama)</h2>
            <form onSubmit={handleAddHistory} className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-purple-50/50 p-4 rounded-xl border border-purple-100">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Year (वर्ष)</label>
                <input type="text" value={histYear} onChange={(e) => setHistYear(e.target.value)} placeholder="वर्ष लिखें" className="w-full border p-2 rounded bg-white text-sm" required />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Diwas / Din ka Naam (दिवस/दिन)</label>
                <input type="text" value={histDayName} onChange={(e) => setHistDayName(e.target.value)} placeholder="जैसे: सप्तमी / दिन 1" className="w-full border p-2 rounded bg-white text-sm" required />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Date & Time (दिनांक और समय)</label>
                <input type="text" value={histDateTime} onChange={(e) => setHistDateTime(e.target.value)} placeholder="जैसे: 12 Oct, 7:00 PM" className="w-full border p-2 rounded bg-white text-sm" required />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Category (श्रेणी)</label>
                <select value={histCategory} onChange={(e) => setHistCategory(e.target.value)} className="w-full border p-2 rounded bg-white text-sm">
                  <option value="Natak">Natak (नाटक)</option>
                  <option value="Ramlila">Ramlila (रामलीला)</option>
                  <option value="Balibadh">Balibadh (बलि वध)</option>
                  <option value="Program">Program (कार्यक्रम)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Image File (फोटो)</label>
                <input type="file" accept="image/*" onChange={(e) => setHistImageFile(e.target.files[0])} className="w-full border p-1.5 rounded bg-white text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Name / Title (नाटक/कार्यक्रम का नाम)</label>
                <input type="text" value={histTitle} onChange={(e) => setHistTitle(e.target.value)} placeholder="शीर्षक" className="w-full border p-2 rounded bg-white text-sm" required />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-gray-700 mb-1">Sanchipt Vivran (संक्षिप्त विवरण)</label>
                <textarea value={histDesc} onChange={(e) => setHistDesc(e.target.value)} placeholder="विवरण लिखें" className="w-full border p-2 rounded bg-white text-sm" rows="2"></textarea>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Mukhya Patra (मुख्य पात्र)</label>
                <input type="text" value={histCharacters} onChange={(e) => setHistCharacters(e.target.value)} placeholder="कलाकारों के नाम" className="w-full border p-2 rounded bg-white text-sm" />
              </div>
              <div className="md:col-span-3">
                <button type="submit" className="bg-purple-600 text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-purple-700 cursor-pointer">Save Event</button>
              </div>
            </form>

            <div className="space-y-4">
              {historyList.length === 0 ? <p className="text-gray-500 text-xs">कोई कार्यक्रम रिकॉर्ड नहीं है।</p> :
                historyList.map(item => (
                  <div key={item._id} className="border rounded-xl p-4 bg-white shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="flex gap-4 items-center">
                      {item.imageUrl && <img src={item.imageUrl} alt={item.title} className="w-24 h-24 object-cover rounded-lg" />}
                      <div>
                        <div className="flex gap-2 items-center">
                          <span className="text-xs font-bold bg-purple-100 text-purple-800 px-2 py-0.5 rounded">{item.category} ({item.year})</span>
                          <span className="text-xs text-gray-500">{item.dayName} | {item.dateTime}</span>
                        </div>
                        <h4 className="font-bold text-gray-900 text-base mt-1">{item.title}</h4>
                        <p className="text-xs text-gray-600 mt-1">{item.desc}</p>
                        {item.characters && <p className="text-xs text-indigo-700 mt-1 font-semibold">मुख्य पात्र: {item.characters}</p>}
                      </div>
                    </div>
                    <button onClick={() => handleDeleteHistory(item._id)} className="bg-rose-100 text-rose-700 p-2 rounded hover:bg-rose-600 hover:text-white cursor-pointer"><Trash2 className="w-4 h-4"/></button>
                  </div>
                ))
              }
            </div>
          </div>
        )}

        {/* 6. COMMITTEE TAB */}
        {activeTab === 'committee' && (
          <div className="bg-white p-6 rounded-xl shadow-sm space-y-6">
            <h2 className="text-xl font-bold text-indigo-800 flex items-center gap-2"><Users className="w-5 h-5"/> कमेटी सदस्य प्रबंधन (Committee Management)</h2>
            <form onSubmit={handleAddCommittee} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-indigo-50/50 p-4 rounded-xl border border-indigo-100">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Member Name (सदस्य का नाम)</label>
                <input type="text" value={commName} onChange={(e) => setCommName(e.target.value)} placeholder="नाम लिखें" className="w-full border p-2 rounded bg-white text-sm" required />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Pad (पद)</label>
                <input type="text" value={commPad} onChange={(e) => setCommPad(e.target.value)} placeholder="जैसे: अध्यक्ष, सचिव" className="w-full border p-2 rounded bg-white text-sm" required />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Mobile Number (मोबाइल नंबर)</label>
                <input type="text" value={commMobile} onChange={(e) => setCommMobile(e.target.value)} placeholder="10 अंक का नंबर" className="w-full border p-2 rounded bg-white text-sm" required />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">File Photo (फोटो)</label>
                <input type="file" accept="image/*" onChange={(e) => setCommPhoto(e.target.files[0])} className="w-full border p-1.5 rounded bg-white text-sm" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-gray-700 mb-1">Role / Responsibility (भूमिका)</label>
                <input type="text" value={commRole} onChange={(e) => setCommRole(e.target.value)} placeholder="विवरण लिखें" className="w-full border p-2 rounded bg-white text-sm" />
              </div>
              <div className="md:col-span-2">
                <button type="submit" className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-indigo-700 cursor-pointer">Add Member</button>
              </div>
            </form>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {committeeList.length === 0 ? <p className="text-gray-500 text-xs">कोई सदस्य रिकॉर्ड नहीं है।</p> :
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

        {/* 7. MESSAGES TAB (Updated with live fetching) */}
        {activeTab === 'messages' && (
          <div className="bg-white p-6 rounded-xl shadow-sm space-y-4">
            <h2 className="text-xl font-bold text-teal-800 flex items-center gap-2"><MessageSquare className="w-5 h-5"/> संदेश प्रबंधन (Messages)</h2>
            <p className="text-sm text-gray-600">यहाँ उपयोगकर्ताओं द्वारा भेजे गए सभी सुझाव और संदेश दिखाई देंगे।</p>
            
            <div className="space-y-3">
              {messagesList.length === 0 ? (
                <div className="border rounded-xl p-4 text-center text-gray-400 text-sm">
                  फिलहाल कोई नया संदेश प्राप्त नहीं हुआ है।
                </div>
              ) : (
                messagesList.map((msg) => (
                  <div key={msg._id || msg.id} className="border p-4 rounded-xl shadow-sm bg-teal-50/20 flex justify-between items-start gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-gray-900 text-sm">{msg.name || 'Shradhalu'}</h4>
                        <span className="text-xs text-teal-700 font-semibold bg-teal-100 px-2 py-0.5 rounded">
                          {msg.mobile || msg.email || 'N/A'}
                        </span>
                      </div>
                      <p className="text-xs text-gray-700 mt-1"><b>संदेश:</b> {msg.message || msg.text || msg.suggestion}</p>
                      <span className="text-[10px] text-gray-400 block">
                        {msg.createdAt ? new Date(msg.createdAt).toLocaleString() : ''}
                      </span>
                    </div>
                    <button 
                      onClick={() => handleDeleteMessage(msg._id || msg.id)} 
                      className="bg-rose-100 text-rose-700 p-1.5 rounded hover:bg-rose-600 hover:text-white cursor-pointer"
                      title="Delete Message"
                    >
                      <Trash2 className="w-4 h-4"/>
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

      </main>
    </div>
  );
}