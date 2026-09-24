import React, { useState } from 'react';
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('income');

  // --- 1. Income States ---
  const [incomeList, setIncomeList] = useState([]);
  const [incYear, setIncYear] = useState('');
  const [incTitle, setIncTitle] = useState('');
  const [incAmount, setIncAmount] = useState('');
  const [incCategory, setIncCategory] = useState('Chanda');
  const [incSource, setIncSource] = useState('');
  const [incDate, setIncDate] = useState('');

  // --- 2. Expense States ---
  const [expenseList, setExpenseList] = useState([]);
  const [expYear, setExpYear] = useState('');
  const [expTitle, setExpTitle] = useState('');
  const [expAmount, setExpAmount] = useState('');
  const [expCategory, setExpCategory] = useState('Puja Material');
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
  const [histDay, setHistDay] = useState('');
  const [histDateTime, setHistDateTime] = useState('');
  const [histCategory, setHistCategory] = useState('नाटक');
  const [histTitle, setHistTitle] = useState('');
  const [histImage, setHistImage] = useState(null);
  const [histDesc, setHistDesc] = useState('');
  const [histCast, setHistCast] = useState('');

  // --- 6. Committee States ---
  const [committeeList, setCommitteeList] = useState([]);
  const [commName, setCommName] = useState('');
  const [commRole, setCommRole] = useState('');
  const [commPhone, setCommPhone] = useState('');
  const [commPhoto, setCommPhoto] = useState(null);

  // --- Handlers ---
  const handleAddIncome = (e) => {
    e.preventDefault();
    const item = { id: Date.now(), year: incYear, title: incTitle, amount: incAmount, category: incCategory, source: incSource, date: incDate };
    setIncomeList([item, ...incomeList]);
    setIncYear(''); setIncTitle(''); setIncAmount(''); setIncSource(''); setIncDate('');
  };

  const handleAddExpense = (e) => {
    e.preventDefault();
    const item = { id: Date.now(), year: expYear, title: expTitle, amount: expAmount, category: expCategory, receiver: expReceiver, date: expDate };
    setExpenseList([item, ...expenseList]);
    setExpYear(''); setExpTitle(''); setExpAmount(''); setExpReceiver(''); setExpDate('');
  };

  const handleAddMurtiBari = (e) => {
    e.preventDefault();
    const item = { id: Date.now(), year: mbYear, familyName: mbFamilyName, fatherName: mbFatherName, address: mbAddress, status: mbStatus };
    setMurtiBariList([item, ...murtiBariList]);
    setMbYear(''); setMbFamilyName(''); setMbFatherName(''); setMbAddress('');
  };

  const handleAddGallery = (e) => {
    e.preventDefault();
    const item = { id: Date.now(), year: galYear, category: galCategory, title: galTitle, desc: galDesc, image: galImageFile ? URL.createObjectURL(galImageFile) : '' };
    setGalleryList([item, ...galleryList]);
    setGalYear(''); setGalTitle(''); setGalDesc(''); setGalImageFile(null);
  };

  const handleAddHistory = (e) => {
    e.preventDefault();
    const item = { id: Date.now(), year: histYear, day: histDay, dateTime: histDateTime, category: histCategory, title: histTitle, desc: histDesc, cast: histCast };
    setHistoryList([item, ...historyList]);
    setHistYear(''); setHistDay(''); setHistDateTime(''); setHistTitle(''); setHistDesc(''); setHistCast('');
  };

  const handleAddCommittee = (e) => {
    e.preventDefault();
    const item = { id: Date.now(), name: commName, role: commRole, phone: commPhone, photo: commPhoto ? URL.createObjectURL(commPhoto) : '' };
    setCommitteeList([item, ...committeeList]);
    setCommName(''); setCommRole(''); setCommPhone(''); setCommPhoto(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    if (typeof onLogout === 'function') {
      onLogout();
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Top Header with Logout & Horizontal Navbar */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="font-bold text-xl text-emerald-700">Durga Puja Admin Panel</h1>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 bg-rose-50 text-rose-700 hover:bg-rose-600 hover:text-white px-4 py-2 rounded-lg font-bold text-sm transition cursor-pointer"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 text-gray-700">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Horizontal Navigation Bar */}
        <nav className={`bg-gray-900 text-white px-4 py-2 md:flex overflow-x-auto space-x-2 ${mobileMenuOpen ? 'flex flex-col space-y-2 py-3' : 'hidden md:flex'}`}>
          <button onClick={() => { setActiveTab('income'); setMobileMenuOpen(false); }} className={`px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 whitespace-nowrap cursor-pointer transition ${activeTab === 'income' ? 'bg-emerald-600 text-white' : 'hover:bg-gray-800 text-gray-300'}`}>
            <DollarSign className="w-4 h-4" /> 1. Income
          </button>
          <button onClick={() => { setActiveTab('expense'); setMobileMenuOpen(false); }} className={`px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 whitespace-nowrap cursor-pointer transition ${activeTab === 'expense' ? 'bg-rose-600 text-white' : 'hover:bg-gray-800 text-gray-300'}`}>
            <CreditCard className="w-4 h-4" /> 2. Expense
          </button>
          <button onClick={() => { setActiveTab('murtibari'); setMobileMenuOpen(false); }} className={`px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 whitespace-nowrap cursor-pointer transition ${activeTab === 'murtibari' ? 'bg-amber-600 text-white' : 'hover:bg-gray-800 text-gray-300'}`}>
            <Landmark className="w-4 h-4" /> 3. Murti Bari
          </button>
          <button onClick={() => { setActiveTab('gallery'); setMobileMenuOpen(false); }} className={`px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 whitespace-nowrap cursor-pointer transition ${activeTab === 'gallery' ? 'bg-blue-600 text-white' : 'hover:bg-gray-800 text-gray-300'}`}>
            <ImageIcon className="w-4 h-4" /> 4. Gallery
          </button>
          <button onClick={() => { setActiveTab('history'); setMobileMenuOpen(false); }} className={`px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 whitespace-nowrap cursor-pointer transition ${activeTab === 'history' ? 'bg-red-600 text-white' : 'hover:bg-gray-800 text-gray-300'}`}>
            <BookOpen className="w-4 h-4" /> 5. History & Drama
          </button>
          <button onClick={() => { setActiveTab('committee'); setMobileMenuOpen(false); }} className={`px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 whitespace-nowrap cursor-pointer transition ${activeTab === 'committee' ? 'bg-purple-600 text-white' : 'hover:bg-gray-800 text-gray-300'}`}>
            <Users className="w-4 h-4" /> 6. Committee
          </button>
          <button onClick={() => { setActiveTab('messages'); setMobileMenuOpen(false); }} className={`px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 whitespace-nowrap cursor-pointer transition ${activeTab === 'messages' ? 'bg-indigo-600 text-white' : 'hover:bg-gray-800 text-gray-300'}`}>
            <MessageSquare className="w-4 h-4" /> 7. Messages
          </button>
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto w-full p-4 md:p-6 flex-1">
        
        {/* 1. Income Tab */}
        {activeTab === 'income' && (
          <div className="bg-white p-6 rounded-xl shadow-sm space-y-6">
            <h2 className="text-lg font-bold text-emerald-700 flex items-center gap-2">
              <DollarSign className="w-5 h-5" /> आय जोड़ें (Add Income)
            </h2>
            <form onSubmit={handleAddIncome} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Year (वर्ष)</label>
                <input type="text" value={incYear} onChange={(e) => setIncYear(e.target.value)} placeholder="जैसे: 2026" className="w-full border p-2 rounded text-sm" required />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Title (शीर्षक)</label>
                <input type="text" value={incTitle} onChange={(e) => setIncTitle(e.target.value)} placeholder="शीर्षक लिखें" className="w-full border p-2 rounded text-sm" required />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Amount (राशि)</label>
                <input type="number" value={incAmount} onChange={(e) => setIncAmount(e.target.value)} placeholder="राशि दर्ज करें" className="w-full border p-2 rounded text-sm" required />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Category (श्रेणी)</label>
                <input type="text" value={incCategory} onChange={(e) => setIncCategory(e.target.value)} placeholder="श्रेणी टाइप करें" className="w-full border p-2 rounded text-sm" required />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Source / Receiver (प्राप्तकर्ता)</label>
                <input type="text" value={incSource} onChange={(e) => setIncSource(e.target.value)} placeholder="नाम या स्रोत" className="w-full border p-2 rounded text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Date (दिनांक)</label>
                <input type="date" value={incDate} onChange={(e) => setIncDate(e.target.value)} className="w-full border p-2 rounded text-sm" />
              </div>
              <div className="md:col-span-3">
                <button type="submit" className="bg-emerald-600 text-white px-6 py-2 rounded-lg font-bold text-sm cursor-pointer">Save Income</button>
              </div>
            </form>

            <div className="overflow-x-auto pt-4">
              <h3 className="text-sm font-bold text-gray-800 mb-3 uppercase">आय सूची</h3>
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-emerald-50 text-gray-700 text-xs uppercase border-b">
                    <th className="py-2.5 px-4">वर्ष</th>
                    <th className="py-2.5 px-4">शीर्षक</th>
                    <th className="py-2.5 px-4">राशि</th>
                    <th className="py-2.5 px-4">श्रेणी</th>
                    <th className="py-2.5 px-4">स्रोत</th>
                    <th className="py-2.5 px-4">दिनांक</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {incomeList.map((item) => (
                    <tr key={item.id} className="hover:bg-emerald-50/40">
                      <td className="py-3 px-4 font-bold text-emerald-800">{item.year}</td>
                      <td className="py-3 px-4">{item.title}</td>
                      <td className="py-3 px-4 font-semibold text-emerald-700">₹{item.amount}</td>
                      <td className="py-3 px-4">{item.category}</td>
                      <td className="py-3 px-4">{item.source || '-'}</td>
                      <td className="py-3 px-4">{item.date || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 2. Expense Tab */}
        {activeTab === 'expense' && (
          <div className="bg-white p-6 rounded-xl shadow-sm space-y-6">
            <h2 className="text-lg font-bold text-rose-700 flex items-center gap-2">
              <CreditCard className="w-5 h-5" /> खर्च जोड़ें (Add Expense)
            </h2>
            <form onSubmit={handleAddExpense} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Year (वर्ष)</label>
                <input type="text" value={expYear} onChange={(e) => setExpYear(e.target.value)} placeholder="वर्ष टाइप करें" className="w-full border p-2 rounded text-sm" required />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Title (शीर्षक)</label>
                <input type="text" value={expTitle} onChange={(e) => setExpTitle(e.target.value)} placeholder="खर्च का शीर्षक" className="w-full border p-2 rounded text-sm" required />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Amount (राशि)</label>
                <input type="number" value={expAmount} onChange={(e) => setExpAmount(e.target.value)} placeholder="राशि दर्ज करें" className="w-full border p-2 rounded text-sm" required />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Category (श्रेणी)</label>
                <input type="text" value={expCategory} onChange={(e) => setExpCategory(e.target.value)} placeholder="श्रेणी टाइप करें" className="w-full border p-2 rounded text-sm" required />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Receiver (प्राप्तकर्ता / भुगतान किसे हुआ)</label>
                <input type="text" value={expReceiver} onChange={(e) => setExpReceiver(e.target.value)} placeholder="किसे भुगतान हुआ" className="w-full border p-2 rounded text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Date (दिनांक)</label>
                <input type="date" value={expDate} onChange={(e) => setExpDate(e.target.value)} className="w-full border p-2 rounded text-sm" />
              </div>
              <div className="md:col-span-3">
                <button type="submit" className="bg-rose-600 text-white px-6 py-2 rounded-lg font-bold text-sm cursor-pointer">Save Expense</button>
              </div>
            </form>

            <div className="overflow-x-auto pt-4">
              <h3 className="text-sm font-bold text-gray-800 mb-3 uppercase">खर्च सूची</h3>
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-rose-50 text-gray-700 text-xs uppercase border-b">
                    <th className="py-2.5 px-4">वर्ष</th>
                    <th className="py-2.5 px-4">शीर्षक</th>
                    <th className="py-2.5 px-4">राशि</th>
                    <th className="py-2.5 px-4">श्रेणी</th>
                    <th className="py-2.5 px-4">प्राप्तकर्ता</th>
                    <th className="py-2.5 px-4">दिनांक</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {expenseList.map((item) => (
                    <tr key={item.id} className="hover:bg-rose-50/40">
                      <td className="py-3 px-4 font-bold text-rose-800">{item.year}</td>
                      <td className="py-3 px-4">{item.title}</td>
                      <td className="py-3 px-4 font-semibold text-rose-700">₹{item.amount}</td>
                      <td className="py-3 px-4">{item.category}</td>
                      <td className="py-3 px-4">{item.receiver || '-'}</td>
                      <td className="py-3 px-4">{item.date || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 3. Murti Bari Tab */}
        {activeTab === 'murtibari' && (
          <div className="bg-white p-6 rounded-xl shadow-sm space-y-6">
            <h2 className="text-lg font-bold text-amber-600 flex items-center gap-2">
              <Landmark className="w-5 h-5" /> मूर्ति बारी जोड़ें (Add Murti Bari)
            </h2>
            <form onSubmit={handleAddMurtiBari} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Year (वर्ष)</label>
                <input type="text" value={mbYear} onChange={(e) => setMbYear(e.target.value)} placeholder="वर्ष लिखें" className="w-full border p-2 rounded text-sm" required />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Family Name (परिवार का नाम)</label>
                <input type="text" value={mbFamilyName} onChange={(e) => setMbFamilyName(e.target.value)} placeholder="परिवार का नाम" className="w-full border p-2 rounded text-sm" required />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Father's Name (पिता का नाम)</label>
                <input type="text" value={mbFatherName} onChange={(e) => setMbFatherName(e.target.value)} placeholder="पिता का नाम" className="w-full border p-2 rounded text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Address (पता)</label>
                <input type="text" value={mbAddress} onChange={(e) => setMbAddress(e.target.value)} placeholder="पूरा पता" className="w-full border p-2 rounded text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Status (स्थिति)</label>
                <select value={mbStatus} onChange={(e) => setMbStatus(e.target.value)} className="w-full border p-2 rounded text-sm">
                  <option value="upcoming">Upcoming</option>
                  <option value="current">Current</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div className="md:col-span-3">
                <button type="submit" className="bg-amber-600 text-white px-6 py-2 rounded-lg font-bold text-sm cursor-pointer">Save Murti Bari</button>
              </div>
            </form>

            <div className="overflow-x-auto pt-4">
              <h3 className="text-sm font-bold text-gray-800 mb-3 uppercase">मूर्ति बारी सूची</h3>
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-amber-50 text-gray-700 text-xs uppercase border-b">
                    <th className="py-2.5 px-4">वर्ष</th>
                    <th className="py-2.5 px-4">परिवार का नाम</th>
                    <th className="py-2.5 px-4">पिता का नाम</th>
                    <th className="py-2.5 px-4">पता</th>
                    <th className="py-2.5 px-4">स्थिति</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {murtiBariList.map((item) => (
                    <tr key={item.id} className="hover:bg-amber-50/40">
                      <td className="py-3 px-4 font-bold text-amber-800">{item.year}</td>
                      <td className="py-3 px-4 font-semibold">{item.familyName}</td>
                      <td className="py-3 px-4">{item.fatherName || '-'}</td>
                      <td className="py-3 px-4">{item.address || '-'}</td>
                      <td className="py-3 px-4 uppercase text-xs font-bold text-amber-700">{item.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 4. Gallery Tab */}
        {activeTab === 'gallery' && (
          <div className="bg-white p-6 rounded-xl shadow-sm space-y-6">
            <h2 className="text-lg font-bold text-blue-600 flex items-center gap-2">
              <ImageIcon className="w-5 h-5" /> गैलरी में फोटो जोड़ें (Add Gallery Photo)
            </h2>
            <form onSubmit={handleAddGallery} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Year (वर्ष)</label>
                <input type="text" value={galYear} onChange={(e) => setGalYear(e.target.value)} placeholder="वर्ष दर्ज करें" className="w-full border p-2 rounded text-sm" required />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Category (श्रेणी)</label>
                <select value={galCategory} onChange={(e) => setGalCategory(e.target.value)} className="w-full border p-2 rounded text-sm">
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
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-gray-700 mb-1">Image File (फोटो फ़ाइल)</label>
                <input type="file" accept="image/*" onChange={(e) => setGalImageFile(e.target.files[0])} className="w-full border p-1.5 rounded text-sm bg-white" required />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Title (शीर्षक)</label>
                <input type="text" value={galTitle} onChange={(e) => setGalTitle(e.target.value)} placeholder="फोटो का शीर्षक" className="w-full border p-2 rounded text-sm" required />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Description (विवरण)</label>
                <input type="text" value={galDesc} onChange={(e) => setGalDesc(e.target.value)} placeholder="छोटा विवरण" className="w-full border p-2 rounded text-sm" />
              </div>
              <div className="md:col-span-2">
                <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold text-sm cursor-pointer">Upload Photo</button>
              </div>
            </form>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              {galleryList.map((item) => (
                <div key={item.id} className="border rounded-lg overflow-hidden bg-white shadow-sm">
                  <img src={item.image} alt={item.title} className="w-full h-32 object-cover bg-gray-100" />
                  <div className="p-3">
                    <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded">{item.year} - {item.category}</span>
                    <h4 className="font-bold text-sm mt-1">{item.title}</h4>
                    <p className="text-xs text-gray-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. History & Drama Tab */}
        {activeTab === 'history' && (
          <div className="bg-white p-6 rounded-xl shadow-sm space-y-6">
            <h2 className="text-lg font-bold text-red-700 flex items-center gap-2">
              <BookOpen className="w-5 h-5" /> इतिहास व नाटक कार्यक्रम (History & Drama)
            </h2>
            <form onSubmit={handleAddHistory} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Year (वर्ष)</label>
                <input type="text" value={histYear} onChange={(e) => setHistYear(e.target.value)} placeholder="वर्ष" className="w-full border p-2 rounded text-sm" required />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Day/Diwas (दिवस/दिन का नाम)</label>
                <input type="text" value={histDay} onChange={(e) => setHistDay(e.target.value)} placeholder="जैसे: Day 1" className="w-full border p-2 rounded text-sm" required />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Date & Time (दिनांक व समय)</label>
                <input type="text" value={histDateTime} onChange={(e) => setHistDateTime(e.target.value)} placeholder="तारीख और समय" className="w-full border p-2 rounded text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Category (श्रेणी)</label>
                <select value={histCategory} onChange={(e) => setHistCategory(e.target.value)} className="w-full border p-2 rounded text-sm">
                  <option value="नाटक">नाटक (Natak)</option>
                  <option value="रामलीला">रामलीला (Ramlila)</option>
                  <option value="बालिवध">बालिवध (Balibadh)</option>
                  <option value="कार्यक्रम">कार्यक्रम (Program)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Title (नाटक/रामलीला का नाम)</label>
                <input type="text" value={histTitle} onChange={(e) => setHistTitle(e.target.value)} placeholder="शीर्षक" className="w-full border p-2 rounded text-sm" required />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Main Cast (मुख्य पात्र)</label>
                <input type="text" value={histCast} onChange={(e) => setHistCast(e.target.value)} placeholder="कलाकारों के नाम" className="w-full border p-2 rounded text-sm" />
              </div>
              <div className="md:col-span-3">
                <label className="block text-xs font-bold text-gray-700 mb-1">Short Description (संक्षिप्त विवरण)</label>
                <textarea value={histDesc} onChange={(e) => setHistDesc(e.target.value)} placeholder="नाटक के बारे में..." className="w-full border p-2 rounded text-sm" rows="2"></textarea>
              </div>
              <div className="md:col-span-3">
                <button type="submit" className="bg-red-700 text-white px-6 py-2 rounded-lg font-bold text-sm cursor-pointer">Save History / Event</button>
              </div>
            </form>

            <div className="overflow-x-auto pt-4">
              <h3 className="text-sm font-bold text-gray-800 mb-3 uppercase">इतिहास व कार्यक्रम सूची</h3>
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-red-50 text-gray-700 text-xs uppercase border-b">
                    <th className="py-2.5 px-4">वर्ष</th>
                    <th className="py-2.5 px-4">दिवस</th>
                    <th className="py-2.5 px-4">प्रकार</th>
                    <th className="py-2.5 px-4">शीर्षक</th>
                    <th className="py-2.5 px-4">मुख्य पात्र</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {historyList.map((item) => (
                    <tr key={item.id} className="hover:bg-red-50/40">
                      <td className="py-3 px-4 font-bold text-red-800">{item.year}</td>
                      <td className="py-3 px-4">{item.day}</td>
                      <td className="py-3 px-4"><span className="bg-red-100 text-red-800 px-2 py-0.5 rounded text-xs font-bold">{item.category}</span></td>
                      <td className="py-3 px-4 font-semibold">{item.title}</td>
                      <td className="py-3 px-4">{item.cast || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 6. Committee Tab */}
        {activeTab === 'committee' && (
          <div className="bg-white p-6 rounded-xl shadow-sm space-y-6">
            <h2 className="text-lg font-bold text-purple-700 flex items-center gap-2">
              <Users className="w-5 h-5" /> कमेटी सदस्य प्रबंधन (Committee Members)
            </h2>
            <form onSubmit={handleAddCommittee} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Member Name (सदस्य का नाम)</label>
                <input type="text" value={commName} onChange={(e) => setCommName(e.target.value)} placeholder="पूरा नाम" className="w-full border p-2 rounded text-sm" required />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Role/Pad (पद)</label>
                <input type="text" value={commRole} onChange={(e) => setCommRole(e.target.value)} placeholder="जैसे: अध्यक्ष / सचिव" className="w-full border p-2 rounded text-sm" required />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Mobile Number (मोबाइल नंबर)</label>
                <input type="text" value={commPhone} onChange={(e) => setCommPhone(e.target.value)} placeholder="10 अंकों का नंबर" className="w-full border p-2 rounded text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Photo (फोटो फ़ाइल)</label>
                <input type="file" accept="image/*" onChange={(e) => setCommPhoto(e.target.files[0])} className="w-full border p-1 rounded text-sm bg-white" />
              </div>
              <div className="md:col-span-2">
                <button type="submit" className="bg-purple-700 text-white px-6 py-2 rounded-lg font-bold text-sm cursor-pointer">Add Member</button>
              </div>
            </form>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              {committeeList.map((item) => (
                <div key={item.id} className="border p-4 rounded-lg bg-white shadow-sm flex items-center gap-4">
                  <img src={item.photo || 'https://via.placeholder.com/80'} alt={item.name} className="w-14 h-14 rounded-full object-cover bg-gray-100" />
                  <div>
                    <h4 className="font-bold text-gray-900">{item.name}</h4>
                    <p className="text-xs font-semibold text-purple-700">{item.role}</p>
                    <p className="text-xs text-gray-500">{item.phone}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 7. Messages Tab */}
        {activeTab === 'messages' && (
          <div className="bg-white p-6 rounded-xl shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-indigo-700 flex items-center gap-2">
              <MessageSquare className="w-5 h-5" /> संदेश प्रबंधन (Messages)
            </h2>
            <p className="text-sm text-gray-600">यहाँ उपयोगकर्ताओं द्वारा भेजे गए सभी सुझाव और संदेश दिखाई देंगे।</p>
            <div className="border rounded-lg p-4 bg-gray-50 text-center text-gray-400 text-sm">
              फिलहाल कोई नया संदेश प्राप्त नहीं हुआ है।
            </div>
          </div>
        )}

      </main>
    </div>
  );
}