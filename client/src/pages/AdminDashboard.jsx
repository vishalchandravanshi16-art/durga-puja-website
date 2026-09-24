import React, { useState, useEffect } from 'react';
import { 
  Landmark, ImageIcon, BookOpen, Users, MessageSquare, 
  LogOut, Trash2, Edit3, Save, TrendingUp, TrendingDown 
} from 'lucide-react';

export default function AdminDashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState('expense');

  // Helper to get current date in YYYY-MM-DD format
  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  // States for Expense & Income
  const [expenseList, setExpenseList] = useState([]);
  const [incomeList, setIncomeList] = useState([]);
  
  // Expense Form States
  const [expYear, setExpYear] = useState(new Date().getFullYear().toString());
  const [expTitle, setExpTitle] = useState('');
  const [expAmount, setExpAmount] = useState('');
  const [expCategory, setExpCategory] = useState('');
  const [expSource, setExpSource] = useState('');
  const [expDate, setExpDate] = useState(getCurrentDate());
  const [expMsg, setExpMsg] = useState('');

  // Income Form States
  const [incYear, setIncYear] = useState(new Date().getFullYear().toString());
  const [incTitle, setIncTitle] = useState('');
  const [incAmount, setIncAmount] = useState('');
  const [incCategory, setIncCategory] = useState('');
  const [incSource, setIncSource] = useState('');
  const [incDate, setIncDate] = useState(getCurrentDate());
  const [incMsg, setIncMsg] = useState('');

  // States for Murti Bari
  const [murtiBariList, setMurtiBariList] = useState([]);
  const [mbYear, setMbYear] = useState('');
  const [mbFamilyName, setMbFamilyName] = useState('');
  const [mbFatherName, setMbFatherName] = useState('');
  const [mbAddress, setMbAddress] = useState('');
  const [mbStatus, setMbStatus] = useState('Current');
  const [mbNotes, setMbNotes] = useState('');
  const [mbMsg, setMbMsg] = useState('');

  // States for Gallery
  const [galleryList, setGalleryList] = useState([]);
  const [galYear, setGalYear] = useState('');
  const [galCategory, setGalCategory] = useState('Maa Durga');
  const [galImageFile, setGalImageFile] = useState(null);
  const [galTitle, setGalTitle] = useState('');
  const [galDesc, setGalDesc] = useState('');
  const [galMsg, setGalMsg] = useState('');

  // States for History & Drama
  const [historyList, setHistoryList] = useState([]);
  const [inputYear, setInputYear] = useState('');
  const [theme, setTheme] = useState('');
  const [director, setDirector] = useState('');
  const [dayNumber, setDayNumber] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('नाटक (Drama)');
  const [dramaTitle, setDramaTitle] = useState('');
  const [mainCast, setMainCast] = useState('');
  const [description, setDescription] = useState('');
  const [historyImageFile, setHistoryImageFile] = useState(null);
  const [editingEventId, setEditingEventId] = useState(null);
  const [historyMsg, setHistoryMsg] = useState('');

  // States for Committee Members
  const [committeeList, setCommitteeList] = useState([]);
  const [commName, setCommName] = useState('');
  const [commRole, setCommRole] = useState('');
  const [commPhone, setCommPhone] = useState('');
  const [commYear, setCommYear] = useState('');
  const [commResponsibility, setCommResponsibility] = useState('');
  const [commOrder, setCommOrder] = useState('');
  const [commImageFile, setCommImageFile] = useState(null);
  const [editingCommId, setEditingCommId] = useState(null);
  const [commMsg, setCommMsg] = useState('');

  // 1. Handle Expense Submit
  const handleAddExpense = async (e) => {
    e.preventDefault();
    try {
      const newExpense = { 
        year: expYear, 
        title: expTitle, 
        amount: expAmount, 
        category: expCategory, 
        source: expSource, 
        date: expDate, 
        _id: Date.now().toString() 
      };
      setExpenseList([newExpense, ...expenseList]);
      setExpMsg('खर्च सफलतापूर्वक जोड़ा गया!');
      setExpTitle(''); 
      setExpAmount(''); 
      setExpCategory('');
      setExpSource('');
      setExpDate(getCurrentDate());
      setTimeout(() => setExpMsg(''), 3000);
    } catch (err) {
      setExpMsg('Error adding expense');
    }
  };

  const handleDeleteExpense = (id) => {
    setExpenseList(expenseList.filter(item => item._id !== id));
  };

  // 2. Handle Income Submit
  const handleAddIncome = async (e) => {
    e.preventDefault();
    try {
      const newIncome = { 
        year: incYear, 
        title: incTitle, 
        amount: incAmount, 
        category: incCategory, 
        source: incSource, 
        date: incDate, 
        _id: Date.now().toString() 
      };
      setIncomeList([newIncome, ...incomeList]);
      setIncMsg('आय सफलतापूर्वक जोड़ी गई!');
      setIncTitle(''); 
      setIncAmount(''); 
      setIncCategory('');
      setIncSource('');
      setIncDate(getCurrentDate());
      setTimeout(() => setIncMsg(''), 3000);
    } catch (err) {
      setIncMsg('Error adding income');
    }
  };

  const handleDeleteIncome = (id) => {
    setIncomeList(incomeList.filter(item => item._id !== id));
  };

  // 3. Handle Murti Bari Submit
  const handleAddMurtiBari = async (e) => {
    e.preventDefault();
    try {
      const newItem = { year: mbYear, familyName: mbFamilyName, fatherName: mbFatherName, status: mbStatus, _id: Date.now().toString() };
      setMurtiBariList([newItem, ...murtiBariList]);
      setMbMsg('मूर्ति बारी सफलतापूर्वक जोड़ी गई!');
      setMbYear(''); setMbFamilyName(''); setMbFatherName(''); setMbAddress(''); setMbNotes('');
      setTimeout(() => setMbMsg(''), 3000);
    } catch (err) {
      setMbMsg('Error adding Murti Bari');
    }
  };

  const handleDeleteMurtiBari = (id) => {
    setMurtiBariList(murtiBariList.filter(item => item._id !== id));
  };

  // 4. Handle Gallery Photo Upload
  const handleAddGalleryPhoto = async (e) => {
    e.preventDefault();
    try {
      const newPhoto = { 
        year: galYear, 
        category: galCategory, 
        title: galTitle, 
        description: galDesc, 
        imageUrl: galImageFile ? URL.createObjectURL(galImageFile) : 'https://via.placeholder.com/150', 
        _id: Date.now().toString() 
      };
      setGalleryList([newPhoto, ...galleryList]);
      setGalMsg('फोटो गैलरी में सफलतापूर्वक अपलोड हो गई!');
      setGalYear(''); setGalTitle(''); setGalDesc(''); setGalImageFile(null);
      setTimeout(() => setGalMsg(''), 3000);
    } catch (err) {
      setGalMsg('Error uploading photo');
    }
  };

  const handleDeleteGalleryPhoto = (id) => {
    setGalleryList(galleryList.filter(item => item._id !== id));
  };

  // 5. Handle History & Drama Submit
  const handleHistorySubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingEventId) {
        setHistoryList(historyList.map(item => item._id === editingEventId ? { ...item, year: inputYear, title: dramaTitle, category, dayNumber } : item));
        setEditingEventId(null);
        setHistoryMsg('इतिहास सफलतापूर्वक अपडेट किया गया!');
      } else {
        const newEvent = { year: inputYear, title: dramaTitle, category, dayNumber, _id: Date.now().toString() };
        setHistoryList([newEvent, ...historyList]);
        setHistoryMsg('इतिहास सफलतापूर्वक जोड़ा गया!');
      }
      setInputYear(''); setDramaTitle(''); setDayNumber(''); setDirector(''); setTheme(''); setMainCast(''); setDescription('');
      setTimeout(() => setHistoryMsg(''), 3000);
    } catch (err) {
      setHistoryMsg('Error saving history');
    }
  };

  const handleEditHistoryClick = (item) => {
    setEditingEventId(item._id);
    setInputYear(item.year || '');
    setDramaTitle(item.title || '');
    setDayNumber(item.dayNumber || '');
    setCategory(item.category || 'नाटक (Drama)');
  };

  const handleDeleteHistory = (id) => {
    setHistoryList(historyList.filter(item => item._id !== id));
  };

  // 6. Handle Committee Member Submit
  const handleCommitteeSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCommId) {
        setCommitteeList(committeeList.map(m => m._id === editingCommId ? { ...m, name: commName, position: commRole, year: commYear } : m));
        setEditingCommId(null);
        setCommMsg('कमेटी सदस्य अपडेट हो गया!');
      } else {
        const newMember = { name: commName, position: commRole, year: commYear, photo: commImageFile ? URL.createObjectURL(commImageFile) : '', _id: Date.now().toString() };
        setCommitteeList([newMember, ...committeeList]);
        setCommMsg('कमेटी सदस्य सफलतापूर्वक जोड़ा गया!');
      }
      setCommName(''); setCommRole(''); setCommPhone(''); setCommYear(''); setCommResponsibility(''); setCommOrder(''); setCommImageFile(null);
      setTimeout(() => setCommMsg(''), 3000);
    } catch (err) {
      setCommMsg('Error saving committee member');
    }
  };

  const handleEditCommitteeClick = (member) => {
    setEditingCommId(member._id);
    setCommName(member.name || '');
    setCommRole(member.position || '');
    setCommYear(member.year || '');
  };

  const handleDeleteCommittee = (id) => {
    setCommitteeList(committeeList.filter(item => item._id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Navigation Bar with Logout */}
      <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">Admin Dashboard - पूजा समिति</h1>
        <button 
          onClick={onLogout} 
          className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition cursor-pointer"
        >
          <LogOut className="w-4 h-4" /> Logout (लॉग आउट)
        </button>
      </header>

      {/* Tabs Menu */}
      <nav className="bg-white border-b px-6 flex space-x-4 overflow-x-auto">
        <button onClick={() => setActiveTab('expense')} className={`py-3 px-4 font-bold text-sm border-b-2 cursor-pointer ${activeTab === 'expense' ? 'border-amber-600 text-amber-600' : 'border-transparent text-gray-600'}`}>खर्च जोड़ें</button>
        <button onClick={() => setActiveTab('income')} className={`py-3 px-4 font-bold text-sm border-b-2 cursor-pointer ${activeTab === 'income' ? 'border-emerald-600 text-emerald-600' : 'border-transparent text-gray-600'}`}>आय जोड़ें</button>
        <button onClick={() => setActiveTab('murtibari')} className={`py-3 px-4 font-bold text-sm border-b-2 cursor-pointer ${activeTab === 'murtibari' ? 'border-amber-600 text-amber-600' : 'border-transparent text-gray-600'}`}>मूर्ति बारी</button>
        <button onClick={() => setActiveTab('gallery')} className={`py-3 px-4 font-bold text-sm border-b-2 cursor-pointer ${activeTab === 'gallery' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600'}`}>गैलरी</button>
        <button onClick={() => setActiveTab('history')} className={`py-3 px-4 font-bold text-sm border-b-2 cursor-pointer ${activeTab === 'history' ? 'border-red-900 text-red-900' : 'border-transparent text-gray-600'}`}>इतिहास व नाटक</button>
        <button onClick={() => setActiveTab('committee')} className={`py-3 px-4 font-bold text-sm border-b-2 cursor-pointer ${activeTab === 'committee' ? 'border-purple-600 text-purple-600' : 'border-transparent text-gray-600'}`}>कमेटी</button>
        <button onClick={() => setActiveTab('messages')} className={`py-3 px-4 font-bold text-sm border-b-2 cursor-pointer ${activeTab === 'messages' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-600'}`}>संदेश</button>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 p-6 max-w-7xl w-full mx-auto space-y-6">

        {/* 1. Expense Tab */}
        {activeTab === 'expense' && (
          <div className="bg-white p-6 rounded-xl shadow-sm space-y-6">
            <div>
              <h3 className="text-lg font-bold text-amber-600 mb-4 flex items-center gap-2">
                <TrendingDown className="w-5 h-5" /> खर्च जोड़ें (Add Expense)
              </h3>
              {expMsg && <p className="text-xs font-bold mb-4 text-emerald-600">{expMsg}</p>}
              <form onSubmit={handleAddExpense} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">वर्ष (Year)</label>
                  <input type="text" value={expYear} onChange={(e) => setExpYear(e.target.value)} className="w-full border p-2 rounded text-sm" required />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">शीर्षक (Title)</label>
                  <input type="text" value={expTitle} onChange={(e) => setExpTitle(e.target.value)} placeholder="जैसे: मूर्ति निर्माण, पंडाल सजावट" className="w-full border p-2 rounded text-sm" required />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">राशि (Amount in ₹)</label>
                  <input type="number" value={expAmount} onChange={(e) => setExpAmount(e.target.value)} placeholder="0.00" className="w-full border p-2 rounded text-sm" required />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">श्रेणी (Category - अपने मन से लिखें)</label>
                  <input type="text" value={expCategory} onChange={(e) => setExpCategory(e.target.value)} placeholder="अपनी पसंद की श्रेणी टाइप करें" className="w-full border p-2 rounded text-sm" required />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">भुगतान विवरण / स्रोत (Source / Details)</label>
                  <input type="text" value={expSource} onChange={(e) => setExpSource(e.target.value)} placeholder="किसको दिया / कहाँ खर्च हुआ विवरण" className="w-full border p-2 rounded text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">दिनांक (Date - ऑटोमैटिक)</label>
                  <input type="date" value={expDate} onChange={(e) => setExpDate(e.target.value)} className="w-full border p-2 rounded text-sm bg-gray-50" required />
                </div>
                <div className="md:col-span-2">
                  <button type="submit" className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-lg font-bold text-sm cursor-pointer">Add Expense</button>
                </div>
              </form>
            </div>
            {/* Expense List Table */}
            <div>
              <h4 className="text-sm font-bold text-gray-800 mb-3 uppercase">खर्च सूची ({expenseList.length})</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-amber-50 text-gray-700 text-xs uppercase border-b">
                      <th className="py-2.5 px-4">वर्ष</th>
                      <th className="py-2.5 px-4">शीर्षक</th>
                      <th className="py-2.5 px-4">राशि</th>
                      <th className="py-2.5 px-4">श्रेणी</th>
                      <th className="py-2.5 px-4">विवरण/स्रोत</th>
                      <th className="py-2.5 px-4">दिनांक</th>
                      <th className="py-2.5 px-4 text-center">एक्शन</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {expenseList.length === 0 ? (
                      <tr><td colSpan="7" className="py-4 text-center text-gray-500 text-xs">कोई खर्च रिकॉर्ड नहीं है।</td></tr>
                    ) : (
                      expenseList.map((item) => (
                        <tr key={item._id} className="hover:bg-amber-50/40">
                          <td className="py-3 px-4 font-bold text-amber-800">{item.year}</td>
                          <td className="py-3 px-4 font-bold text-gray-900">{item.title}</td>
                          <td className="py-3 px-4 text-amber-700 font-semibold">₹{item.amount}</td>
                          <td className="py-3 px-4 text-gray-600">{item.category}</td>
                          <td className="py-3 px-4 text-gray-600">{item.source || '-'}</td>
                          <td className="py-3 px-4 text-gray-500 text-xs">{item.date}</td>
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

        {/* 2. Income Tab */}
        {activeTab === 'income' && (
          <div className="bg-white p-6 rounded-xl shadow-sm space-y-6">
            <div>
              <h3 className="text-lg font-bold text-emerald-600 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" /> आय जोड़ें (Add Income)
              </h3>
              {incMsg && <p className="text-xs font-bold mb-4 text-emerald-600">{incMsg}</p>}
              <form onSubmit={handleAddIncome} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">वर्ष (Year)</label>
                  <input type="text" value={incYear} onChange={(e) => setIncYear(e.target.value)} className="w-full border p-2 rounded text-sm" required />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">शीर्षक (Title)</label>
                  <input type="text" value={incTitle} onChange={(e) => setIncTitle(e.target.value)} placeholder="जैसे: चंदा, दान, सहयोग राशि" className="w-full border p-2 rounded text-sm" required />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">राशि (Amount in ₹)</label>
                  <input type="number" value={incAmount} onChange={(e) => setIncAmount(e.target.value)} placeholder="0.00" className="w-full border p-2 rounded text-sm" required />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">श्रेणी (Category - अपने मन से लिखें)</label>
                  <input type="text" value={incCategory} onChange={(e) => setIncCategory(e.target.value)} placeholder="अपनी पसंद की श्रेणी टाइप करें" className="w-full border p-2 rounded text-sm" required />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">भुगतान विवरण / स्रोत (Source / Details)</label>
                  <input type="text" value={incSource} onChange={(e) => setIncSource(e.target.value)} placeholder="किसने दिया / कहाँ से आया स्रोत" className="w-full border p-2 rounded text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">दिनांक (Date - ऑटोमैटिक)</label>
                  <input type="date" value={incDate} onChange={(e) => setIncDate(e.target.value)} className="w-full border p-2 rounded text-sm bg-gray-50" required />
                </div>
                <div className="md:col-span-2">
                  <button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-bold text-sm cursor-pointer">Add Income</button>
                </div>
              </form>
            </div>
            {/* Income List Table */}
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
                      <th className="py-2.5 px-4">विवरण/स्रोत</th>
                      <th className="py-2.5 px-4">दिनांक</th>
                      <th className="py-2.5 px-4 text-center">एक्शन</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {incomeList.length === 0 ? (
                      <tr><td colSpan="7" className="py-4 text-center text-gray-500 text-xs">कोई आय रिकॉर्ड नहीं है।</td></tr>
                    ) : (
                      incomeList.map((item) => (
                        <tr key={item._id} className="hover:bg-emerald-50/40">
                          <td className="py-3 px-4 font-bold text-emerald-800">{item.year}</td>
                          <td className="py-3 px-4 font-bold text-gray-900">{item.title}</td>
                          <td className="py-3 px-4 text-emerald-700 font-semibold">₹{item.amount}</td>
                          <td className="py-3 px-4 text-gray-600">{item.category}</td>
                          <td className="py-3 px-4 text-gray-600">{item.source || '-'}</td>
                          <td className="py-3 px-4 text-gray-500 text-xs">{item.date}</td>
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
                  <label className="block text-xs font-bold text-gray-700 mb-1">पिता का नाम (Father's Name)</label>
                  <input type="text" value={mbFatherName} onChange={(e) => setMbFatherName(e.target.value)} className="w-full border p-2 rounded text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">पता (Address)</label>
                  <input type="text" value={mbAddress} onChange={(e) => setMbAddress(e.target.value)} className="w-full border p-2 rounded text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">स्थिति (Status)</label>
                  <select value={mbStatus} onChange={(e) => setMbStatus(e.target.value)} className="w-full border p-2 rounded text-sm">
                    <option value="Upcoming">Upcoming (आगामी)</option>
                    <option value="Current">Current (चालू)</option>
                    <option value="Completed">Completed (पूर्ण)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">विवरण (Notes)</label>
                  <input type="text" value={mbNotes} onChange={(e) => setMbNotes(e.target.value)} className="w-full border p-2 rounded text-sm" />
                </div>
                <div className="md:col-span-2">
                  <button type="submit" className="bg-amber-600 text-white px-6 py-2 rounded-lg font-bold text-sm cursor-pointer">Add Murti Bari</button>
                </div>
              </form>
            </div>

            {/* Murti Bari Table List */}
            <div>
              <h4 className="text-sm font-bold text-gray-800 mb-3 uppercase">मौजूदा मूर्ति बारी सूचियाँ</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-amber-50 text-gray-700 text-xs uppercase border-b">
                      <th className="py-2.5 px-4">वर्ष</th>
                      <th className="py-2.5 px-4">परिवार का नाम</th>
                      <th className="py-2.5 px-4">पिता का नाम</th>
                      <th className="py-2.5 px-4">स्थिति</th>
                      <th className="py-2.5 px-4 text-center">एक्शन</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {murtiBariList.length === 0 ? (
                      <tr><td colSpan="5" className="py-4 text-center text-gray-500 text-xs">कोई रिकॉर्ड उपलब्ध नहीं है।</td></tr>
                    ) : (
                      murtiBariList.map((item) => (
                        <tr key={item._id} className="hover:bg-amber-50/40">
                          <td className="py-3 px-4 font-bold text-amber-800">{item.year}</td>
                          <td className="py-3 px-4 font-semibold text-gray-900">{item.familyName}</td>
                          <td className="py-3 px-4 text-gray-600">{item.fatherName || '-'}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${item.status === 'Current' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}`}>
                              {item.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <button onClick={() => handleDeleteMurtiBari(item._id)} className="bg-rose-100 text-rose-700 hover:bg-rose-600 hover:text-white p-1.5 rounded-lg transition cursor-pointer">
                              <Trash2 className="w-4 h-4" />
                            </button>
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
                <ImageIcon className="w-5 h-5" /> गैलरी में फोटो जोड़ें (Upload Gallery Photo)
              </h3>
              {galMsg && <p className="text-xs font-bold mb-4 text-emerald-600">{galMsg}</p>}
              <form onSubmit={handleAddGalleryPhoto} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Year / वर्ष</label>
                  <input type="number" value={galYear} onChange={(e) => setGalYear(e.target.value)} className="w-full border p-2 rounded text-sm" required />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Category / श्रेणी</label>
                  <select value={galCategory} onChange={(e) => setGalCategory(e.target.value)} className="w-full border p-2 rounded text-sm">
                    <option value="Maa Durga">Maa Durga</option>
                    <option value="Murti">Murti</option>
                    <option value="Pandal">Pandal</option>
                    <option value="Puja">Puja</option>
                    <option value="Cultural Program">Cultural Program</option>
                    <option value="Visarjan">Visarjan</option>
                    <option value="Committee">Committee</option>
                    <option value="Old Memories">Old Memories</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-gray-700 mb-1">Select Image File / फोटो चुनें</label>
                  <input type="file" accept="image/*" onChange={(e) => setGalImageFile(e.target.files[0])} className="w-full border p-1.5 rounded text-sm bg-white" required />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Title / फोटो का शीर्षक</label>
                  <input type="text" value={galTitle} onChange={(e) => setGalTitle(e.target.value)} className="w-full border p-2 rounded text-sm" required />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Description / विवरण (वैकल्पिक)</label>
                  <input type="text" value={galDesc} onChange={(e) => setGalDesc(e.target.value)} className="w-full border p-2 rounded text-sm" />
                </div>
                <div className="md:col-span-2">
                  <button type="submit" className="bg-blue-800 text-white px-6 py-2 rounded-lg font-bold text-sm flex items-center gap-2 cursor-pointer">
                    <Save className="w-4 h-4" /> Upload Photo to Gallery
                  </button>
                </div>
              </form>
            </div>

            {/* Gallery List Grid */}
            <div>
              <h4 className="text-sm font-bold text-gray-800 mb-3 uppercase">गैलरी में अपलोड की गई तस्वीरें ({galleryList.length})</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {galleryList.length === 0 ? (
                  <p className="text-xs text-gray-400 italic col-span-full">गैलरी में अभी कोई फोटो नहीं है।</p>
                ) : (
                  galleryList.map((item) => (
                    <div key={item._id} className="border rounded-xl overflow-hidden bg-white shadow-sm flex flex-col justify-between">
                      <img src={item.imageUrl} alt={item.title} className="w-full h-36 object-cover bg-gray-100" />
                      <div className="p-3">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-[10px] font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded">{item.year}</span>
                          <span className="text-[10px] font-semibold text-gray-500">{item.category}</span>
                        </div>
                        <h5 className="font-bold text-gray-900 text-xs truncate">{item.title}</h5>
                        <p className="text-[11px] text-gray-500 truncate">{item.description || 'No description'}</p>
                      </div>
                      <div className="p-3 pt-0 border-t border-gray-100 mt-2 flex justify-end">
                        <button onClick={() => handleDeleteGalleryPhoto(item._id)} className="bg-rose-50 text-rose-700 hover:bg-rose-600 hover:text-white px-3 py-1 rounded text-xs font-bold transition flex items-center gap-1 cursor-pointer">
                          <Trash2 className="w-3.5 h-3.5" /> Delete Photo
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* 5. History & Drama Tab */}
        {activeTab === 'history' && (
          <div className="bg-white p-6 rounded-xl shadow-sm space-y-6">
            <div>
              <h3 className="text-lg font-bold text-red-900 mb-4 flex items-center gap-2">
                <BookOpen className="text-red-700 w-5 h-5" /> इतिहास व दैनिक नाटक कार्यक्रम जोड़ें
              </h3>
              {historyMsg && <p className="text-xs font-bold mb-4 text-emerald-600">{historyMsg}</p>}
              <form onSubmit={handleHistorySubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">वर्ष दर्ज करें (e.g. 2026, 2027)</label>
                  <input type="text" value={inputYear} onChange={(e) => setInputYear(e.target.value)} className="w-full border p-2 rounded text-sm font-bold" required />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">थीम (Theme)</label>
                  <input type="text" value={theme} onChange={(e) => setTheme(e.target.value)} placeholder="सांस्कृतिक नाटक महोत्सव" className="w-full border p-2 rounded text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">संचालक / निर्देशक (Director)</label>
                  <input type="text" value={director} onChange={(e) => setDirector(e.target.value)} placeholder="आदिशक्ति नवयुवक संघ" className="w-full border p-2 rounded text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">दिवस / दिन का नाम (Day Number)</label>
                  <input type="text" value={dayNumber} onChange={(e) => setDayNumber(e.target.value)} placeholder="Day 1 / पहला दिन" className="w-full border p-2 rounded text-sm" required />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">तिथि व समय (Date & Time)</label>
                  <input type="text" value={date} onChange={(e) => setDate(e.target.value)} placeholder="10 October 2026" className="w-full border p-2 rounded text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">प्रकार (Category)</label>
                  <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full border p-2 rounded text-sm">
                    <option value="नाटक (Drama)">नाटक (Drama)</option>
                    <option value="रामलीला (Ramlila)">रामलीला (Ramlila)</option>
                    <option value="बलिबंध (Balibandh)">बलिबंध (Balibandh)</option>
                    <option value="सांस्कृतिक कार्यक्रम">सांस्कृतिक कार्यक्रम</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">नाटक / कार्यक्रम का नाम (Title)</label>
                  <input type="text" value={dramaTitle} onChange={(e) => setDramaTitle(e.target.value)} className="w-full border p-2 rounded text-sm" required />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">मुख्य कलाकार (Main Cast)</label>
                  <input type="text" value={mainCast} onChange={(e) => setMainCast(e.target.value)} placeholder="कलाकार का नाम..." className="w-full border p-2 rounded text-sm" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-gray-700 mb-1">विवरण (Description)</label>
                  <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows="3" className="w-full border p-2 rounded text-sm"></textarea>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-gray-700 mb-1">कार्यक्रम की तस्वीर (Photo)</label>
                  <input type="file" accept="image/*" onChange={(e) => setHistoryImageFile(e.target.files[0])} className="w-full border p-1.5 rounded text-sm bg-white" />
                </div>
                <div className="md:col-span-2 flex gap-3">
                  <button type="submit" className="bg-red-900 text-white px-6 py-2 rounded-lg font-bold text-sm cursor-pointer flex items-center gap-2">
                    <Save className="w-4 h-4" /> {editingEventId ? 'Update History / Event' : 'Save History / Event'}
                  </button>
                  {editingEventId && (
                    <button type="button" onClick={() => { setEditingEventId(null); setInputYear(''); setDramaTitle(''); }} className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg font-bold text-sm cursor-pointer">
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* History Table List */}
            <div>
              <h4 className="text-sm font-bold text-gray-800 mb-3 uppercase">दर्ज इतिहास व नाटक कार्यक्रम सूचियाँ ({historyList.length})</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-red-50 text-gray-700 text-xs uppercase border-b">
                      <th className="py-2.5 px-4">वर्ष</th>
                      <th className="py-2.5 px-4">दिवस</th>
                      <th className="py-2.5 px-4">शीर्षक / नाटक</th>
                      <th className="py-2.5 px-4">प्रकार</th>
                      <th className="py-2.5 px-4 text-center">एक्शन</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {historyList.length === 0 ? (
                      <tr><td colSpan="5" className="py-4 text-center text-gray-500 text-xs">कोई इतिहास रिकॉर्ड उपलब्ध नहीं है।</td></tr>
                    ) : (
                      historyList.map((item) => (
                        <tr key={item._id} className="hover:bg-red-50/40">
                          <td className="py-3 px-4 font-bold text-red-900">{item.year}</td>
                          <td className="py-3 px-4 font-semibold text-gray-900">{item.dayNumber}</td>
                          <td className="py-3 px-4 text-gray-800">{item.title}</td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-800">
                              {item.category}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-center flex justify-center gap-2">
                            <button onClick={() => handleEditHistoryClick(item)} className="bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white p-1.5 rounded-lg transition cursor-pointer">
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button onClick={() => handleDeleteHistory(item._id)} className="bg-rose-50 text-rose-700 hover:bg-rose-600 hover:text-white p-1.5 rounded-lg transition cursor-pointer">
                              <Trash2 className="w-4 h-4" />
                            </button>
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

        {/* 6. Committee Tab */}
        {activeTab === 'committee' && (
          <div className="bg-white p-6 rounded-xl shadow-sm space-y-6">
            <div>
              <h3 className="text-lg font-bold text-purple-600 mb-4 flex items-center gap-2">
                <Users className="w-5 h-5" /> Committee Members Management
              </h3>
              {commMsg && <p className="text-xs font-bold mb-4 text-emerald-600">{commMsg}</p>}
              <form onSubmit={handleCommitteeSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">सदस्य का नाम (Name)</label>
                  <input type="text" value={commName} onChange={(e) => setCommName(e.target.value)} className="w-full border p-2 rounded text-sm" required />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">पद (Position / Role)</label>
                  <input type="text" value={commRole} onChange={(e) => setCommRole(e.target.value)} placeholder="अध्यक्ष / Secretary / उपाध्यक्ष..." className="w-full border p-2 rounded text-sm" required />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">मोबाइल नंबर (Phone)</label>
                  <input type="text" value={commPhone} onChange={(e) => setCommPhone(e.target.value)} className="w-full border p-2 rounded text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">वर्ष (Year)</label>
                  <input type="number" value={commYear} onChange={(e) => setCommYear(e.target.value)} className="w-full border p-2 rounded text-sm" required />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">जिम्मेदारी (Responsibility)</label>
                  <input type="text" value={commResponsibility} onChange={(e) => setCommResponsibility(e.target.value)} placeholder="प्रबंधन / Management" className="w-full border p-2 rounded text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">क्रम संख्या (Display Order)</label>
                  <input type="number" value={commOrder} onChange={(e) => setCommOrder(e.target.value)} placeholder="1, 2, 3..." className="w-full border p-2 rounded text-sm" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-gray-700 mb-1">सदस्य की फोटो (Photo File)</label>
                  <input type="file" accept="image/*" onChange={(e) => setCommImageFile(e.target.files[0])} className="w-full border p-1.5 rounded text-sm bg-white" />
                </div>
                <div className="md:col-span-2 flex gap-3">
                  <button type="submit" className="bg-purple-600 text-white px-6 py-2 rounded-lg font-bold text-sm cursor-pointer flex items-center gap-2">
                    <Save className="w-4 h-4" /> {editingCommId ? 'Update Member' : 'Add Committee Member'}
                  </button>
                  {editingCommId && (
                    <button type="button" onClick={() => { setEditingCommId(null); setCommName(''); setCommRole(''); }} className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg font-bold text-sm cursor-pointer">
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Committee Table List */}
            <div>
              <h4 className="text-sm font-bold text-gray-800 mb-3 uppercase">कमेटी सदस्य सूची ({committeeList.length})</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-purple-50 text-gray-700 text-xs uppercase border-b">
                      <th className="py-2.5 px-4">फोटो</th>
                      <th className="py-2.5 px-4">नाम</th>
                      <th className="py-2.5 px-4">पद</th>
                      <th className="py-2.5 px-4">वर्ष</th>
                      <th className="py-2.5 px-4 text-center">एक्शन</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {committeeList.length === 0 ? (
                      <tr><td colSpan="5" className="py-4 text-center text-gray-500 text-xs">कोई कमेटी सदस्य नहीं है।</td></tr>
                    ) : (
                      committeeList.map((member) => (
                        <tr key={member._id} className="hover:bg-purple-50/40">
                          <td className="py-3 px-4">
                            <img src={member.photo || 'https://via.placeholder.com/150'} alt={member.name} className="w-10 h-10 rounded-full object-cover bg-gray-100" />
                          </td>
                          <td className="py-3 px-4 font-bold text-gray-900">{member.name}</td>
                          <td className="py-3 px-4 text-purple-700 font-semibold">{member.position}</td>
                          <td className="py-3 px-4 text-gray-600">{member.year}</td>
                          <td className="py-3 px-4 text-center flex justify-center gap-2 items-center h-full">
                            <button onClick={() => handleEditCommitteeClick(member)} className="bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white p-1.5 rounded-lg transition cursor-pointer">
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button onClick={() => handleDeleteCommittee(member._id)} className="bg-rose-50 text-rose-700 hover:bg-rose-600 hover:text-white p-1.5 rounded-lg transition cursor-pointer">
                              <Trash2 className="w-4 h-4" />
                            </button>
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

        {/* 7. Messages Tab */}
        {activeTab === 'messages' && (
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-bold text-indigo-600 mb-4 flex items-center gap-2">
              <MessageSquare className="w-5 h-5" /> संदेश प्रबंधन (Messages Management)
            </h3>
            <p className="text-sm text-gray-600">यहाँ उपयोगकर्ताओं द्वारा भेजे गए संदेश दिखाई देंगे।</p>
          </div>
        )}

      </main>
    </div>
  );
}