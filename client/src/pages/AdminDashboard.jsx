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
  Save, 
  LogOut, 
  DollarSign,
  CreditCard,
  Menu,
  X
} from 'lucide-react';

export default function AdminDashboard({ onLogout }) {
  // Sidebar Toggle for Mobile
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Active Tab State
  const [activeTab, setActiveTab] = useState('income');

  // --- 1. Income States ---
  const [incomeList, setIncomeList] = useState([]);
  const [incYear, setIncYear] = useState('');
  const [incTitle, setIncTitle] = useState('');
  const [incAmount, setIncAmount] = useState('');
  const [incCategory, setIncCategory] = useState('Chanda');
  const [incSource, setIncSource] = useState('');
  const [incDate, setIncDate] = useState('');
  const [incMsg, setIncMsg] = useState('');

  // --- 2. Expense States ---
  const [expenseList, setExpenseList] = useState([]);
  const [expYear, setExpYear] = useState('');
  const [expTitle, setExpTitle] = useState('');
  const [expAmount, setExpAmount] = useState('');
  const [expCategory, setExpCategory] = useState('Puja Material');
  const [expReceiver, setExpReceiver] = useState('');
  const [expDate, setExpDate] = useState('');
  const [expMsg, setExpMsg] = useState('');

  // --- 3. Murti Bari States ---
  const [murtiBariList, setMurtiBariList] = useState([]);
  const [mbYear, setMbYear] = useState('');
  const [mbFamilyName, setMbFamilyName] = useState('');
  const [mbFatherName, setMbFatherName] = useState('');
  const [mbAddress, setMbAddress] = useState('');
  const [mbStatus, setMbStatus] = useState('Upcoming');
  const [mbNotes, setMbNotes] = useState('');
  const [mbMsg, setMbMsg] = useState('');

  // --- 4. Gallery States ---
  const [galleryList, setGalleryList] = useState([]);
  const [galYear, setGalYear] = useState('');
  const [galCategory, setGalCategory] = useState('Maa Durga');
  const [galImageFile, setGalImageFile] = useState(null);
  const [galTitle, setGalTitle] = useState('');
  const [galDesc, setGalDesc] = useState('');
  const [galMsg, setGalMsg] = useState('');

  // --- 5. History & Drama States ---
  const [historyList, setHistoryList] = useState([]);
  const [inputYear, setInputYear] = useState('');
  const [dayNumber, setDayNumber] = useState('');
  const [category, setCategory] = useState('नाटक (Drama)');
  const [dramaTitle, setDramaTitle] = useState('');
  const [editingEventId, setEditingEventId] = useState(null);
  const [historyMsg, setHistoryMsg] = useState('');

  // --- 6. Committee States ---
  const [committeeList, setCommitteeList] = useState([]);
  const [commName, setCommName] = useState('');
  const [commRole, setCommRole] = useState('');
  const [commYear, setCommYear] = useState('');
  const [commImageFile, setCommImageFile] = useState(null);
  const [editingCommId, setEditingCommId] = useState(null);
  const [commMsg, setCommMsg] = useState('');

  // --- Handlers ---
  const handleAddIncome = (e) => {
    e.preventDefault();
    const newItem = { _id: Date.now().toString(), year: incYear, title: incTitle, amount: incAmount, category: incCategory, source: incSource, date: incDate };
    setIncomeList([newItem, ...incomeList]);
    setIncMsg('आय सफलतापूर्वक जोड़ी गई!');
    setIncYear(''); setIncTitle(''); setIncAmount(''); setIncSource(''); setIncDate('');
  };
  const handleDeleteIncome = (id) => { setIncomeList(incomeList.filter(item => item._id !== id)); };

  const handleAddExpense = (e) => {
    e.preventDefault();
    const newItem = { _id: Date.now().toString(), year: expYear, title: expTitle, amount: expAmount, category: expCategory, receiver: expReceiver, date: expDate };
    setExpenseList([newItem, ...expenseList]);
    setExpMsg('खर्च सफलतापूर्वक जोड़ा गया!');
    setExpYear(''); setExpTitle(''); setExpAmount(''); setExpReceiver(''); setExpDate('');
  };
  const handleDeleteExpense = (id) => { setExpenseList(expenseList.filter(item => item._id !== id)); };

  const handleAddMurtiBari = (e) => {
    e.preventDefault();
    const newItem = { _id: Date.now().toString(), year: mbYear, familyName: mbFamilyName, fatherName: mbFatherName, status: mbStatus };
    setMurtiBariList([newItem, ...murtiBariList]);
    setMbMsg('मूर्ति बारी सफलतापूर्वक जोड़ी गई!');
    setMbYear(''); setMbFamilyName(''); setMbFatherName(''); setMbAddress(''); setMbNotes('');
  };
  const handleDeleteMurtiBari = (id) => { setMurtiBariList(murtiBariList.filter(item => item._id !== id)); };

  const handleAddGalleryPhoto = (e) => {
    e.preventDefault();
    const newItem = { _id: Date.now().toString(), year: galYear, category: galCategory, title: galTitle, description: galDesc, imageUrl: galImageFile ? URL.createObjectURL(galImageFile) : 'https://via.placeholder.com/150' };
    setGalleryList([newItem, ...galleryList]);
    setGalMsg('फोटो गैलरी में अपलोड हो गई!');
    setGalYear(''); setGalTitle(''); setGalDesc(''); setGalImageFile(null);
  };
  const handleDeleteGalleryPhoto = (id) => { setGalleryList(galleryList.filter(item => item._id !== id)); };

  const handleHistorySubmit = (e) => {
    e.preventDefault();
    const newItem = { _id: editingEventId || Date.now().toString(), year: inputYear, dayNumber, title: dramaTitle, category };
    if (editingEventId) {
      setHistoryList(historyList.map(item => item._id === editingEventId ? newItem : item));
      setEditingEventId(null);
    } else {
      setHistoryList([newItem, ...historyList]);
    }
    setHistoryMsg('इतिहास/कार्यक्रम सफलतापूर्वक सहेजा गया!');
    setInputYear(''); setDramaTitle(''); setDayNumber('');
  };
  const handleEditHistoryClick = (item) => {
    setEditingEventId(item._id);
    setInputYear(item.year);
    setDramaTitle(item.title);
    setDayNumber(item.dayNumber);
    setCategory(item.category);
  };
  const handleDeleteHistory = (id) => { setHistoryList(historyList.filter(item => item._id !== id)); };

  const handleCommitteeSubmit = (e) => {
    e.preventDefault();
    const newItem = { _id: editingCommId || Date.now().toString(), name: commName, position: commRole, year: commYear, photo: commImageFile ? URL.createObjectURL(commImageFile) : 'https://via.placeholder.com/150' };
    if (editingCommId) {
      setCommitteeList(committeeList.map(item => item._id === editingCommId ? newItem : item));
      setEditingCommId(null);
    } else {
      setCommitteeList([newItem, ...committeeList]);
    }
    setCommMsg('कमेटी सदस्य सफलतापूर्वक सहेजा गया!');
    setCommName(''); setCommRole(''); setCommYear('');
  };
  const handleEditCommitteeClick = (member) => {
    setEditingCommId(member._id);
    setCommName(member.name);
    setCommRole(member.position);
    setCommYear(member.year);
  };
  const handleDeleteCommittee = (id) => { setCommitteeList(committeeList.filter(item => item._id !== id)); };

  // Logout Handler
  const handleLogoutClick = () => {
    localStorage.removeItem('token');
    if (typeof onLogout === 'function') {
      onLogout();
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      {/* Mobile Topbar */}
      <div className="bg-white shadow-sm px-4 py-3 flex justify-between items-center md:hidden">
        <h1 className="font-bold text-gray-800 text-lg">Admin Dashboard</h1>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 text-gray-700 cursor-pointer">
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-md transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-200 ease-in-out flex flex-col`}>
        <div className="p-5 border-b border-gray-200">
          <h2 className="font-bold text-xl text-emerald-700">पूजा समिति पैनल</h2>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto text-sm font-medium">
          <button onClick={() => { setActiveTab('income'); setSidebarOpen(false); }} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition cursor-pointer ${activeTab === 'income' ? 'bg-emerald-50 text-emerald-700 font-bold' : 'text-gray-600 hover:bg-gray-50'}`}>
            <DollarSign className="w-4 h-4" /> आय सूची (Income)
          </button>
          <button onClick={() => { setActiveTab('expense'); setSidebarOpen(false); }} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition cursor-pointer ${activeTab === 'expense' ? 'bg-rose-50 text-rose-700 font-bold' : 'text-gray-600 hover:bg-gray-50'}`}>
            <CreditCard className="w-4 h-4" /> खर्च सूची (Expense)
          </button>
          <button onClick={() => { setActiveTab('murtibari'); setSidebarOpen(false); }} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition cursor-pointer ${activeTab === 'murtibari' ? 'bg-amber-50 text-amber-700 font-bold' : 'text-gray-600 hover:bg-gray-50'}`}>
            <Landmark className="w-4 h-4" /> मूर्ति बारी (Murti Bari)
          </button>
          <button onClick={() => { setActiveTab('gallery'); setSidebarOpen(false); }} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition cursor-pointer ${activeTab === 'gallery' ? 'bg-blue-50 text-blue-700 font-bold' : 'text-gray-600 hover:bg-gray-50'}`}>
            <ImageIcon className="w-4 h-4" /> गैलरी (Gallery)
          </button>
          <button onClick={() => { setActiveTab('history'); setSidebarOpen(false); }} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition cursor-pointer ${activeTab === 'history' ? 'bg-red-50 text-red-700 font-bold' : 'text-gray-600 hover:bg-gray-50'}`}>
            <BookOpen className="w-4 h-4" /> इतिहास व नाटक (History)
          </button>
          <button onClick={() => { setActiveTab('committee'); setSidebarOpen(false); }} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition cursor-pointer ${activeTab === 'committee' ? 'bg-purple-50 text-purple-700 font-bold' : 'text-gray-600 hover:bg-gray-50'}`}>
            <Users className="w-4 h-4" /> कमेटी (Committee)
          </button>
          <button onClick={() => { setActiveTab('messages'); setSidebarOpen(false); }} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition cursor-pointer ${activeTab === 'messages' ? 'bg-indigo-50 text-indigo-700 font-bold' : 'text-gray-600 hover:bg-gray-50'}`}>
            <MessageSquare className="w-4 h-4" /> संदेश (Messages)
          </button>
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-200">
          <button 
            onClick={handleLogoutClick} 
            type="button" 
            className="w-full flex items-center justify-center gap-2 bg-rose-50 text-rose-700 hover:bg-rose-600 hover:text-white px-4 py-2.5 rounded-lg font-bold text-sm transition cursor-pointer"
          >
            <LogOut className="w-4 h-4" /> लॉग आउट (Logout)
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 p-4 md:p-8 overflow-y-auto">
        
        {/* 1. Income Tab */}
        {activeTab === 'income' && (
          <div className="bg-white p-6 rounded-xl shadow-sm space-y-6">
            <div>
              <h3 className="text-lg font-bold text-emerald-700 mb-4 flex items-center gap-2">
                <PlusCircle className="w-5 h-5" /> आय जोड़ें (Add Income)
              </h3>
              {incMsg && <p className="text-xs font-bold mb-4 text-emerald-600">{incMsg}</p>}
              <form onSubmit={handleAddIncome} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">वर्ष (Year)</label>
                  <input type="text" value={incYear} onChange={(e) => setIncYear(e.target.value)} className="w-full border p-2 rounded text-sm" required />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">शीर्षक (Title)</label>
                  <input type="text" value={incTitle} onChange={(e) => setIncTitle(e.target.value)} className="w-full border p-2 rounded text-sm" required />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">राशि (Amount)</label>
                  <input type="number" value={incAmount} onChange={(e) => setIncAmount(e.target.value)} className="w-full border p-2 rounded text-sm" required />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">श्रेणी (Category)</label>
                  <select value={incCategory} onChange={(e) => setIncCategory(e.target.value)} className="w-full border p-2 rounded text-sm">
                    <option value="Chanda">चंदा (Chanda)</option>
                    <option value="Donation">दान (Donation)</option>
                    <option value="Other">अन्य (Other)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">विवरण/स्रोत (Source)</label>
                  <input type="text" value={incSource} onChange={(e) => setIncSource(e.target.value)} className="w-full border p-2 rounded text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">दिनांक (Date)</label>
                  <input type="date" value={incDate} onChange={(e) => setIncDate(e.target.value)} className="w-full border p-2 rounded text-sm" />
                </div>
                <div className="md:col-span-2">
                  <button type="submit" className="bg-emerald-600 text-white px-6 py-2 rounded-lg font-bold text-sm cursor-pointer">Add Income</button>
                </div>
              </form>
            </div>

            <div>
              <h4 className="text-sm font-bold text-gray-800 mb-3 uppercase">आय सूची ({incomeList.length})</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-emerald-50 text-gray-700 text-xs uppercase border-b">
                      <th className="py-2.5 px-4">वर्ष</th>
                      <th className="py-2.5 px-4">शीर्षक</th>
                      <th className="py-2.5 px-4">राशि</th>
                      <th className="py-2.5 px-4">श्रेणी</th>
                      <th className="py-2.5 px-4">स्रोत</th>
                      <th className="py-2.5 px-4 text-center">एक्शन</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {incomeList.length === 0 ? (
                      <tr><td colSpan="6" className="py-4 text-center text-gray-500 text-xs">कोई आय रिकॉर्ड नहीं है।</td></tr>
                    ) : (
                      incomeList.map((item) => (
                        <tr key={item._id} className="hover:bg-emerald-50/40">
                          <td className="py-3 px-4 font-bold text-emerald-800">{item.year}</td>
                          <td className="py-3 px-4 font-bold text-gray-900">{item.title}</td>
                          <td className="py-3 px-4 text-emerald-700 font-semibold">₹{item.amount}</td>
                          <td className="py-3 px-4 text-gray-600">{item.category}</td>
                          <td className="py-3 px-4 text-gray-600">{item.source || '-'}</td>
                          <td className="py-3 px-4 text-center">
                            <button onClick={() => handleDeleteIncome(item._id)} className="bg-rose-100 text-rose-700 p-1.5 rounded-lg cursor-pointer hover:bg-rose-600 hover:text-white transition"><Trash2 className="w-4 h-4" /></button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 2. Expense Tab */}
        {activeTab === 'expense' && (
          <div className="bg-white p-6 rounded-xl shadow-sm space-y-6">
            <div>
              <h3 className="text-lg font-bold text-rose-700 mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5" /> खर्च जोड़ें (Add Expense)
              </h3>
              {expMsg && <p className="text-xs font-bold mb-4 text-rose-600">{expMsg}</p>}
              <form onSubmit={handleAddExpense} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">वर्ष (Year)</label>
                  <input type="text" value={expYear} onChange={(e) => setExpYear(e.target.value)} className="w-full border p-2 rounded text-sm" required />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">शीर्षक (Title)</label>
                  <input type="text" value={expTitle} onChange={(e) => setExpTitle(e.target.value)} className="w-full border p-2 rounded text-sm" required />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">राशि (Amount)</label>
                  <input type="number" value={expAmount} onChange={(e) => setExpAmount(e.target.value)} className="w-full border p-2 rounded text-sm" required />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">श्रेणी (Category)</label>
                  <select value={expCategory} onChange={(e) => setExpCategory(e.target.value)} className="w-full border p-2 rounded text-sm">
                    <option value="Puja Material">पूजा सामग्री (Puja Material)</option>
                    <option value="Decoration">सजावट (Decoration)</option>
                    <option value="Sound/Light">साउंड/लाइट (Sound/Light)</option>
                    <option value="Other">अन्य (Other)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">प्राप्तकर्ता / भुगतान किसे हुआ (Receiver)</label>
                  <input type="text" value={expReceiver} onChange={(e) => setExpReceiver(e.target.value)} className="w-full border p-2 rounded text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">दिनांक (Date)</label>
                  <input type="date" value={expDate} onChange={(e) => setExpDate(e.target.value)} className="w-full border p-2 rounded text-sm" />
                </div>
                <div className="md:col-span-2">
                  <button type="submit" className="bg-rose-600 text-white px-6 py-2 rounded-lg font-bold text-sm cursor-pointer">Add Expense</button>
                </div>
              </form>
            </div>

            <div>
              <h4 className="text-sm font-bold text-gray-800 mb-3 uppercase">खर्च सूची ({expenseList.length})</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-rose-50 text-gray-700 text-xs uppercase border-b">
                      <th className="py-2.5 px-4">वर्ष</th>
                      <th className="py-2.5 px-4">शीर्षक</th>
                      <th className="py-2.5 px-4">राशि</th>
                      <th className="py-2.5 px-4">श्रेणी</th>
                      <th className="py-2.5 px-4">प्राप्तकर्ता</th>
                      <th className="py-2.5 px-4 text-center">एक्शन</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {expenseList.length === 0 ? (
                      <tr><td colSpan="6" className="py-4 text-center text-gray-500 text-xs">कोई खर्च रिकॉर्ड नहीं है।</td></tr>
                    ) : (
                      expenseList.map((item) => (
                        <tr key={item._id} className="hover:bg-rose-50/40">
                          <td className="py-3 px-4 font-bold text-rose-800">{item.year}</td>
                          <td className="py-3 px-4 font-bold text-gray-900">{item.title}</td>
                          <td className="py-3 px-4 text-rose-700 font-semibold">₹{item.amount}</td>
                          <td className="py-3 px-4 text-gray-600">{item.category}</td>
                          <td className="py-3 px-4 text-gray-600">{item.receiver || '-'}</td>
                          <td className="py-3 px-4 text-center">
                            <button onClick={() => handleDeleteExpense(item._id)} className="bg-rose-100 text-rose-700 p-1.5 rounded-lg cursor-pointer hover:bg-rose-600 hover:text-white transition"><Trash2 className="w-4 h-4" /></button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 3. Murti Bari Tab */}
        {activeTab === 'murtibari' && (
          <div className="bg-white p-6 rounded-xl shadow-sm space-y-6">
            <div>
              <h3 className="text-lg font-bold text-amber-600 mb-4 flex items-center gap-2">
                <Landmark className="w-5 h-5" /> मूर्ति बारी जोड़ें (Add Murti Bari)
              </h3>
              {mbMsg && <p className="text-xs font-bold mb-4 text-emerald-600">{mbMsg}</p>}
              <form onSubmit={handleAddMurtiBari} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">वर्ष (Year)</label>
                  <input type="text" value={mbYear} onChange={(e) => setMbYear(e.target.value)} className="w-full border p-2 rounded text-sm" required />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">परिवार का नाम (Family Name)</label>
                  <input type="text" value={mbFamilyName} onChange={(e) => setMbFamilyName(e.target.value)} className="w-full border p-2 rounded text-sm" required />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">पिता का नाम</label>
                  <input type="text" value={mbFatherName} onChange={(e) => setMbFatherName(e.target.value)} className="w-full border p-2 rounded text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">स्थिति (Status)</label>
                  <select value={mbStatus} onChange={(e) => setMbStatus(e.target.value)} className="w-full border p-2 rounded text-sm">
                    <option value="Upcoming">Upcoming</option>
                    <option value="Current">Current</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <button type="submit" className="bg-amber-600 text-white px-6 py-2 rounded-lg font-bold text-sm cursor-pointer">Add Murti Bari</button>
                </div>
              </form>
            </div>

            <div>
              <h4 className="text-sm font-bold text-gray-800 mb-3 uppercase">मूर्ति बारी सूचियाँ</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-amber-50 text-gray-700 text-xs uppercase border-b">
                      <th className="py-2.5 px-4">वर्ष</th>
                      <th className="py-2.5 px-4">परिवार का नाम</th>
                      <th className="py-2.5 px-4">स्थिति</th>
                      <th className="py-2.5 px-4 text-center">एक्शन</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {murtiBariList.length === 0 ? (
                      <tr><td colSpan="4" className="py-4 text-center text-gray-500 text-xs">कोई रिकॉर्ड नहीं है।</td></tr>
                    ) : (
                      murtiBariList.map((item) => (
                        <tr key={item._id} className="hover:bg-amber-50/40">
                          <td className="py-3 px-4 font-bold text-amber-800">{item.year}</td>
                          <td className="py-3 px-4 font-semibold text-gray-900">{item.familyName}</td>
                          <td className="py-3 px-4"><span className="px-2 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800">{item.status}</span></td>
                          <td className="py-3 px-4 text-center">
                            <button onClick={() => handleDeleteMurtiBari(item._id)} className="bg-rose-100 text-rose-700 p-1.5 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 4. Gallery Tab */}
        {activeTab === 'gallery' && (
          <div className="bg-white p-6 rounded-xl shadow-sm space-y-6">
            <div>
              <h3 className="text-lg font-bold text-blue-600 mb-4 flex items-center gap-2">
                <ImageIcon className="w-5 h-5" /> गैलरी में फोटो जोड़ें
              </h3>
              {galMsg && <p className="text-xs font-bold mb-4 text-emerald-600">{galMsg}</p>}
              <form onSubmit={handleAddGalleryPhoto} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Year</label>
                  <input type="number" value={galYear} onChange={(e) => setGalYear(e.target.value)} className="w-full border p-2 rounded text-sm" required />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Category</label>
                  <select value={galCategory} onChange={(e) => setGalCategory(e.target.value)} className="w-full border p-2 rounded text-sm">
                    <option value="Maa Durga">Maa Durga</option>
                    <option value="Murti">Murti</option>
                    <option value="Pandal">Pandal</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-gray-700 mb-1">Image File</label>
                  <input type="file" accept="image/*" onChange={(e) => setGalImageFile(e.target.files[0])} className="w-full border p-1.5 rounded text-sm" required />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Title</label>
                  <input type="text" value={galTitle} onChange={(e) => setGalTitle(e.target.value)} className="w-full border p-2 rounded text-sm" required />
                </div>
                <div className="md:col-span-2">
                  <button type="submit" className="bg-blue-800 text-white px-6 py-2 rounded-lg font-bold text-sm">Upload Photo</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* 5. History Tab */}
        {activeTab === 'history' && (
          <div className="bg-white p-6 rounded-xl shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-red-900 mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5" /> इतिहास व नाटक कार्यक्रम
            </h3>
            <form onSubmit={handleHistorySubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">वर्ष (Year)</label>
                <input type="text" value={inputYear} onChange={(e) => setInputYear(e.target.value)} className="w-full border p-2 rounded text-sm" required />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">नाटक / कार्यक्रम का नाम</label>
                <input type="text" value={dramaTitle} onChange={(e) => setDramaTitle(e.target.value)} className="w-full border p-2 rounded text-sm" required />
              </div>
              <div className="md:col-span-2">
                <button type="submit" className="bg-red-900 text-white px-6 py-2 rounded-lg font-bold text-sm">Save Event</button>
              </div>
            </form>
          </div>
        )}

        {/* 6. Committee Tab */}
        {activeTab === 'committee' && (
          <div className="bg-white p-6 rounded-xl shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-purple-600 mb-4 flex items-center gap-2">
              <Users className="w-5 h-5" /> कमेटी सदस्य प्रबंधन
            </h3>
            <form onSubmit={handleCommitteeSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">नाम</label>
                <input type="text" value={commName} onChange={(e) => setCommName(e.target.value)} className="w-full border p-2 rounded text-sm" required />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">पद</label>
                <input type="text" value={commRole} onChange={(e) => setCommRole(e.target.value)} className="w-full border p-2 rounded text-sm" required />
              </div>
              <div className="md:col-span-2">
                <button type="submit" className="bg-purple-600 text-white px-6 py-2 rounded-lg font-bold text-sm">Add Member</button>
              </div>
            </form>
          </div>
        )}

        {/* 7. Messages Tab */}
        {activeTab === 'messages' && (
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-bold text-indigo-600 mb-4 flex items-center gap-2">
              <MessageSquare className="w-5 h-5" /> संदेश प्रबंधन
            </h3>
            <p className="text-sm text-gray-600">यहाँ उपयोगकर्ताओं द्वारा भेजे गए संदेश दिखाई देंगे।</p>
          </div>
        )}

      </main>
    </div>
  );
}