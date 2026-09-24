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
  CreditCard
} from 'lucide-react';

export default function AdminDashboard({ onLogout }) {
  // Active Tab State (Horizontal Navigation)
  const [activeTab, setActiveTab] = useState('income');

  // --- 1. Income States ---
  const [incomeList, setIncomeList] = useState([]);
  const [incYear, setIncYear] = useState('');
  const [incTitle, setIncTitle] = useState('');
  const [incAmount, setIncAmount] = useState('');
  const [incCategory, setIncCategory] = useState('');
  const [incSource, setIncSource] = useState('');
  const [incDate, setIncDate] = useState('');
  const [incMsg, setIncMsg] = useState('');

  // --- 2. Expense States ---
  const [expenseList, setExpenseList] = useState([]);
  const [expYear, setExpYear] = useState('');
  const [expTitle, setExpTitle] = useState('');
  const [expAmount, setExpAmount] = useState('');
  const [expCategory, setExpCategory] = useState('');
  const [expReceiver, setExpReceiver] = useState('');
  const [expDate, setExpDate] = useState('');
  const [expMsg, setExpMsg] = useState('');

  // --- 3. Murti Bari States ---
  const [murtiBariList, setMurtiBariList] = useState([]);
  const [mbYear, setMbYear] = useState('');
  const [mbFamilyName, setMbFamilyName] = useState('');
  const [mbFatherName, setMbFatherName] = useState('');
  const [mbAddress, setMbAddress] = useState('');
  const [mbStatus, setMbStatus] = useState('upcoming');
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
  const [histYear, setHistYear] = useState('');
  const [histDay, setHistDay] = useState('');
  const [histDateTime, setHistDateTime] = useState('');
  const [histCategory, setHistCategory] = useState('natak');
  const [histImageFile, setHistImageFile] = useState(null);
  const [histName, setHistName] = useState('');
  const [histDesc, setHistDesc] = useState('');
  const [histCast, setHistCast] = useState('');
  const [histMsg, setHistMsg] = useState('');

  // --- 6. Committee States ---
  const [committeeList, setCommitteeList] = useState([]);
  const [commName, setCommName] = useState('');
  const [commPad, setCommPad] = useState('');
  const [commPhone, setCommPhone] = useState('');
  const [commPhoto, setCommPhoto] = useState(null);
  const [commMsg, setCommMsg] = useState('');

  // --- Handlers ---
  const handleAddIncome = (e) => {
    e.preventDefault();
    const newItem = { _id: Date.now().toString(), year: incYear, title: incTitle, amount: incAmount, category: incCategory, source: incSource, date: incDate };
    setIncomeList([newItem, ...incomeList]);
    setIncMsg('आय सफलतापूर्वक जोड़ी गई!');
    setIncYear(''); setIncTitle(''); setIncAmount(''); setIncCategory(''); setIncSource(''); setIncDate('');
  };
  const handleDeleteIncome = (id) => { setIncomeList(incomeList.filter(i => i._id !== id)); };

  const handleAddExpense = (e) => {
    e.preventDefault();
    const newItem = { _id: Date.now().toString(), year: expYear, title: expTitle, amount: expAmount, category: expCategory, receiver: expReceiver, date: expDate };
    setExpenseList([newItem, ...expenseList]);
    setExpMsg('खर्च सफलतापूर्वक जोड़ा गया!');
    setExpYear(''); setExpTitle(''); setExpAmount(''); setExpCategory(''); setExpReceiver(''); setExpDate('');
  };
  const handleDeleteExpense = (id) => { setExpenseList(expenseList.filter(e => e._id !== id)); };

  const handleAddMurtiBari = (e) => {
    e.preventDefault();
    const newItem = { _id: Date.now().toString(), year: mbYear, familyName: mbFamilyName, fatherName: mbFatherName, address: mbAddress, status: mbStatus };
    setMurtiBariList([newItem, ...murtiBariList]);
    setMbMsg('मूर्ति बारी सफलतापूर्वक जोड़ी गई!');
    setMbYear(''); setMbFamilyName(''); setMbFatherName(''); setMbAddress(''); setMbStatus('upcoming');
  };
  const handleDeleteMurtiBari = (id) => { setMurtiBariList(murtiBariList.filter(m => m._id !== id)); };

  const handleAddGallery = (e) => {
    e.preventDefault();
    const newItem = { _id: Date.now().toString(), year: galYear, category: galCategory, title: galTitle, desc: galDesc, imageUrl: galImageFile ? URL.createObjectURL(galImageFile) : '' };
    setGalleryList([newItem, ...galleryList]);
    setGalMsg('फोटो गैलरी में जुड़ गई!');
    setGalYear(''); setGalTitle(''); setGalDesc(''); setGalImageFile(null);
  };
  const handleDeleteGallery = (id) => { setGalleryList(galleryList.filter(g => g._id !== id)); };

  const handleAddHistory = (e) => {
    e.preventDefault();
    const newItem = { _id: Date.now().toString(), year: histYear, day: histDay, dateTime: histDateTime, category: histCategory, name: histName, desc: histDesc, cast: histCast, imageUrl: histImageFile ? URL.createObjectURL(histImageFile) : '' };
    setHistoryList([newItem, ...historyList]);
    setHistMsg('इतिहास/कार्यक्रम सफलतापूर्वक जोड़ा गया!');
    setHistYear(''); setHistDay(''); setHistDateTime(''); setHistName(''); setHistDesc(''); setHistCast(''); setHistImageFile(null);
  };
  const handleDeleteHistory = (id) => { setHistoryList(historyList.filter(h => h._id !== id)); };

  const handleAddCommittee = (e) => {
    e.preventDefault();
    const newItem = { _id: Date.now().toString(), name: commName, pad: commPad, phone: commPhone, photoUrl: commPhoto ? URL.createObjectURL(commPhoto) : '' };
    setCommitteeList([newItem, ...committeeList]);
    setCommMsg('कमेटी सदस्य जुड़ गया!');
    setCommName(''); setCommPad(''); setCommPhone(''); setCommPhoto(null);
  };
  const handleDeleteCommittee = (id) => { setCommitteeList(committeeList.filter(c => c._id !== id)); };

  const handleLogoutClick = () => {
    localStorage.removeItem('token');
    if (typeof onLogout === 'function') {
      onLogout();
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Top Header with Logout */}
      <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center border-b">
        <h1 className="font-extrabold text-xl text-emerald-800">पूजा समिति - Admin Dashboard</h1>
        <button 
          onClick={handleLogoutClick} 
          type="button" 
          className="flex items-center gap-2 bg-rose-50 text-rose-700 hover:bg-rose-600 hover:text-white px-4 py-2 rounded-lg font-bold text-sm transition cursor-pointer shadow-sm"
        >
          <LogOut className="w-4 h-4" /> Logout (लॉग आउट)
        </button>
      </header>

      {/* Horizontal Tabs Navigation */}
      <nav className="bg-white shadow-sm border-b px-6 flex overflow-x-auto space-x-2 py-3">
        {[
          { id: 'income', label: '1. Income (आय)', icon: DollarSign },
          { id: 'expense', label: '2. Expense (खर्च)', icon: CreditCard },
          { id: 'murtibari', label: '3. Murti Bari (मूर्ति बारी)', icon: Landmark },
          { id: 'gallery', label: '4. Gallery (गैलरी)', icon: ImageIcon },
          { id: 'history', label: '5. History & Drama (इतिहास व नाटक)', icon: BookOpen },
          { id: 'committee', label: '6. Committee (कमेटी)', icon: Users },
          { id: 'messages', label: '7. Messages (संदेश)', icon: MessageSquare },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold whitespace-nowrap transition cursor-pointer ${
                activeTab === tab.id 
                  ? 'bg-emerald-600 text-white shadow' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Icon className="w-4 h-4" /> {tab.label}
            </button>
          );
        })}
      </nav>

      {/* Main Content Sections */}
      <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
        
        {/* 1. INCOME TAB */}
        {activeTab === 'income' && (
          <div className="bg-white p-6 rounded-xl shadow-sm space-y-6">
            <h2 className="text-lg font-bold text-emerald-700 flex items-center gap-2"><PlusCircle className="w-5 h-5"/> आय जोड़ें (Income)</h2>
            {incMsg && <p className="text-xs font-bold text-emerald-600">{incMsg}</p>}
            <form onSubmit={handleAddIncome} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div><label className="block text-xs font-bold text-gray-700 mb-1">वर्ष (Year)</label><input type="text" value={incYear} onChange={e => setIncYear(e.target.value)} className="w-full border p-2 rounded text-sm" required /></div>
              <div><label className="block text-xs font-bold text-gray-700 mb-1">शीर्षक (Title)</label><input type="text" value={incTitle} onChange={e => setIncTitle(e.target.value)} className="w-full border p-2 rounded text-sm" required /></div>
              <div><label className="block text-xs font-bold text-gray-700 mb-1">राशि (Amount)</label><input type="number" value={incAmount} onChange={e => setIncAmount(e.target.value)} className="w-full border p-2 rounded text-sm" required /></div>
              <div><label className="block text-xs font-bold text-gray-700 mb-1">श्रेणी (Category)</label><input type="text" value={incCategory} onChange={e => setIncCategory(e.target.value)} placeholder="स्वयं टाइप करें" className="w-full border p-2 rounded text-sm" required /></div>
              <div><label className="block text-xs font-bold text-gray-700 mb-1">प्राप्तकर्ता / स्रोत (Source)</label><input type="text" value={incSource} onChange={e => setIncSource(e.target.value)} className="w-full border p-2 rounded text-sm" /></div>
              <div><label className="block text-xs font-bold text-gray-700 mb-1">दिनांक (Date)</label><input type="date" value={incDate} onChange={e => setIncDate(e.target.value)} className="w-full border p-2 rounded text-sm" /></div>
              <div className="md:col-span-3"><button type="submit" className="bg-emerald-600 text-white px-6 py-2 rounded-lg font-bold text-sm cursor-pointer">Save Income</button></div>
            </form>

            <div className="mt-6">
              <h3 className="font-bold text-gray-800 text-sm uppercase mb-3">आय सूची (Live Public View Data)</h3>
              <table className="w-full text-left border-collapse text-sm">
                <thead><tr className="bg-emerald-50 text-gray-700 text-xs border-b"><th className="p-3">वर्ष</th><th className="p-3">शीर्षक</th><th className="p-3">राशि</th><th className="p-3">श्रेणी</th><th className="p-3">स्रोत</th><th className="p-3">दिनांक</th><th className="p-3 text-center">Action</th></tr></thead>
                <tbody>
                  {incomeList.length === 0 ? <tr><td colSpan="7" className="p-4 text-center text-gray-400">कोई डेटा नहीं है</td></tr> :
                    incomeList.map(item => (
                      <tr key={item._id} className="border-b hover:bg-emerald-50/20">
                        <td className="p-3 font-bold text-emerald-800">{item.year}</td>
                        <td className="p-3 font-semibold">{item.title}</td>
                        <td className="p-3 text-emerald-600 font-bold">₹{item.amount}</td>
                        <td className="p-3">{item.category}</td>
                        <td className="p-3">{item.source}</td>
                        <td className="p-3 text-gray-500">{item.date}</td>
                        <td className="p-3 text-center"><button onClick={() => handleDeleteIncome(item._id)} className="bg-rose-100 text-rose-700 p-1.5 rounded cursor-pointer hover:bg-rose-600 hover:text-white"><Trash2 className="w-4 h-4"/></button></td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 2. EXPENSE TAB */}
        {activeTab === 'expense' && (
          <div className="bg-white p-6 rounded-xl shadow-sm space-y-6">
            <h2 className="text-lg font-bold text-rose-700 flex items-center gap-2"><CreditCard className="w-5 h-5"/> खर्च जोड़ें (Expense)</h2>
            {expMsg && <p className="text-xs font-bold text-rose-600">{expMsg}</p>}
            <form onSubmit={handleAddExpense} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div><label className="block text-xs font-bold text-gray-700 mb-1">वर्ष (Year)</label><input type="text" value={expYear} onChange={e => setExpYear(e.target.value)} className="w-full border p-2 rounded text-sm" required /></div>
              <div><label className="block text-xs font-bold text-gray-700 mb-1">शीर्षक (Title)</label><input type="text" value={expTitle} onChange={e => setExpTitle(e.target.value)} className="w-full border p-2 rounded text-sm" required /></div>
              <div><label className="block text-xs font-bold text-gray-700 mb-1">राशि (Amount)</label><input type="number" value={expAmount} onChange={e => setExpAmount(e.target.value)} className="w-full border p-2 rounded text-sm" required /></div>
              <div><label className="block text-xs font-bold text-gray-700 mb-1">श्रेणी (Category)</label><input type="text" value={expCategory} onChange={e => setExpCategory(e.target.value)} placeholder="स्वयं टाइप करें" className="w-full border p-2 rounded text-sm" required /></div>
              <div><label className="block text-xs font-bold text-gray-700 mb-1">प्राप्तकर्ता / भुगतान किसे हुआ (Receiver)</label><input type="text" value={expReceiver} onChange={e => setExpReceiver(e.target.value)} className="w-full border p-2 rounded text-sm" required /></div>
              <div><label className="block text-xs font-bold text-gray-700 mb-1">दिनांक (Date)</label><input type="date" value={expDate} onChange={e => setExpDate(e.target.value)} className="w-full border p-2 rounded text-sm" /></div>
              <div className="md:col-span-3"><button type="submit" className="bg-rose-600 text-white px-6 py-2 rounded-lg font-bold text-sm cursor-pointer">Save Expense</button></div>
            </form>

            <div className="mt-6">
              <h3 className="font-bold text-gray-800 text-sm uppercase mb-3">खर्च सूची (Live Public View Data)</h3>
              <table className="w-full text-left border-collapse text-sm">
                <thead><tr className="bg-rose-50 text-gray-700 text-xs border-b"><th className="p-3">वर्ष</th><th className="p-3">शीर्षक</th><th className="p-3">राशि</th><th className="p-3">श्रेणी</th><th className="p-3">प्राप्तकर्ता</th><th className="p-3">दिनांक</th><th className="p-3 text-center">Action</th></tr></thead>
                <tbody>
                  {expenseList.length === 0 ? <tr><td colSpan="7" className="p-4 text-center text-gray-400">कोई डेटा नहीं है</td></tr> :
                    expenseList.map(item => (
                      <tr key={item._id} className="border-b hover:bg-rose-50/20">
                        <td className="p-3 font-bold text-rose-800">{item.year}</td>
                        <td className="p-3 font-semibold">{item.title}</td>
                        <td className="p-3 text-rose-600 font-bold">₹{item.amount}</td>
                        <td className="p-3">{item.category}</td>
                        <td className="p-3">{item.receiver}</td>
                        <td className="p-3 text-gray-500">{item.date}</td>
                        <td className="p-3 text-center"><button onClick={() => handleDeleteExpense(item._id)} className="bg-rose-100 text-rose-700 p-1.5 rounded cursor-pointer hover:bg-rose-600 hover:text-white"><Trash2 className="w-4 h-4"/></button></td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 3. MURTI BARI TAB */}
        {activeTab === 'murtibari' && (
          <div className="bg-white p-6 rounded-xl shadow-sm space-y-6">
            <h2 className="text-lg font-bold text-amber-600 flex items-center gap-2"><Landmark className="w-5 h-5"/> मूर्ति बारी जोड़ें (Murti Bari)</h2>
            {mbMsg && <p className="text-xs font-bold text-emerald-600">{mbMsg}</p>}
            <form onSubmit={handleAddMurtiBari} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><label className="block text-xs font-bold text-gray-700 mb-1">वर्ष (Year)</label><input type="text" value={mbYear} onChange={e => setMbYear(e.target.value)} className="w-full border p-2 rounded text-sm" required /></div>
              <div><label className="block text-xs font-bold text-gray-700 mb-1">परिवार का नाम (Family Name)</label><input type="text" value={mbFamilyName} onChange={e => setMbFamilyName(e.target.value)} className="w-full border p-2 rounded text-sm" required /></div>
              <div><label className="block text-xs font-bold text-gray-700 mb-1">पिता का नाम (Father's Name)</label><input type="text" value={mbFatherName} onChange={e => setMbFatherName(e.target.value)} className="w-full border p-2 rounded text-sm" required /></div>
              <div><label className="block text-xs font-bold text-gray-700 mb-1">पता (Address)</label><input type="text" value={mbAddress} onChange={e => setMbAddress(e.target.value)} className="w-full border p-2 rounded text-sm" required /></div>
              <div><label className="block text-xs font-bold text-gray-700 mb-1">स्थिति (Status)</label>
                <select value={mbStatus} onChange={e => setMbStatus(e.target.value)} className="w-full border p-2 rounded text-sm">
                  <option value="upcoming">Upcoming (आगामी)</option>
                  <option value="current">Current (चालू)</option>
                  <option value="completed">Completed (पूर्ण)</option>
                </select>
              </div>
              <div className="md:col-span-2"><button type="submit" className="bg-amber-600 text-white px-6 py-2 rounded-lg font-bold text-sm cursor-pointer">Save Murti Bari</button></div>
            </form>

            <div className="mt-6">
              <h3 className="font-bold text-gray-800 text-sm uppercase mb-3">मूर्ति बारी सूची (Live Public View Data)</h3>
              <table className="w-full text-left border-collapse text-sm">
                <thead><tr className="bg-amber-50 text-gray-700 text-xs border-b"><th className="p-3">वर्ष</th><th className="p-3">परिवार का नाम</th><th className="p-3">पिता का नाम</th><th className="p-3">पता</th><th className="p-3">स्थिति</th><th className="p-3 text-center">Action</th></tr></thead>
                <tbody>
                  {murtiBariList.length === 0 ? <tr><td colSpan="6" className="p-4 text-center text-gray-400">कोई डेटा नहीं है</td></tr> :
                    murtiBariList.map(item => (
                      <tr key={item._id} className="border-b hover:bg-amber-50/20">
                        <td className="p-3 font-bold text-amber-800">{item.year}</td>
                        <td className="p-3 font-semibold">{item.familyName}</td>
                        <td className="p-3">{item.fatherName}</td>
                        <td className="p-3">{item.address}</td>
                        <td className="p-3"><span className="px-2 py-0.5 rounded text-xs font-bold bg-amber-100 text-amber-800">{item.status}</span></td>
                        <td className="p-3 text-center"><button onClick={() => handleDeleteMurtiBari(item._id)} className="bg-rose-100 text-rose-700 p-1.5 rounded cursor-pointer hover:bg-rose-600 hover:text-white"><Trash2 className="w-4 h-4"/></button></td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 4. GALLERY TAB */}
        {activeTab === 'gallery' && (
          <div className="bg-white p-6 rounded-xl shadow-sm space-y-6">
            <h2 className="text-lg font-bold text-blue-600 flex items-center gap-2"><ImageIcon className="w-5 h-5"/> गैलरी में फोटो जोड़ें (Gallery)</h2>
            {galMsg && <p className="text-xs font-bold text-emerald-600">{galMsg}</p>}
            <form onSubmit={handleAddGallery} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><label className="block text-xs font-bold text-gray-700 mb-1">वर्ष (Year)</label><input type="text" value={galYear} onChange={e => setGalYear(e.target.value)} className="w-full border p-2 rounded text-sm" required /></div>
              <div><label className="block text-xs font-bold text-gray-700 mb-1">श्रेणी (Category)</label>
                <select value={galCategory} onChange={e => setGalCategory(e.target.value)} className="w-full border p-2 rounded text-sm">
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
              <div className="md:col-span-2"><label className="block text-xs font-bold text-gray-700 mb-1">इमेज फाइल (Image File)</label><input type="file" accept="image/*" onChange={e => setGalImageFile(e.target.files[0])} className="w-full border p-1.5 rounded text-sm bg-white" required /></div>
              <div><label className="block text-xs font-bold text-gray-700 mb-1">शीर्षक (Title)</label><input type="text" value={galTitle} onChange={e => setGalTitle(e.target.value)} className="w-full border p-2 rounded text-sm" required /></div>
              <div><label className="block text-xs font-bold text-gray-700 mb-1">विवरण (Description)</label><input type="text" value={galDesc} onChange={e => setGalDesc(e.target.value)} className="w-full border p-2 rounded text-sm" /></div>
              <div className="md:col-span-2"><button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold text-sm cursor-pointer">Upload Photo</button></div>
            </form>

            <div className="mt-6">
              <h3 className="font-bold text-gray-800 text-sm uppercase mb-3">गैलरी तस्वीरें (Live Public View Data)</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {galleryList.length === 0 ? <p className="text-gray-400 text-sm">कोई फोटो नहीं है</p> :
                  galleryList.map(item => (
                    <div key={item._id} className="border rounded-lg p-3 shadow-sm bg-gray-50 flex flex-col justify-between">
                      {item.imageUrl && <img src={item.imageUrl} alt={item.title} className="w-full h-32 object-cover rounded mb-2 bg-gray-200" />}
                      <div>
                        <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded">{item.year} | {item.category}</span>
                        <h4 className="font-bold text-sm mt-1">{item.title}</h4>
                        <p className="text-xs text-gray-500">{item.desc}</p>
                      </div>
                      <button onClick={() => handleDeleteGallery(item._id)} className="mt-3 bg-rose-100 text-rose-700 text-xs py-1 rounded font-bold hover:bg-rose-600 hover:text-white transition flex items-center justify-center gap-1 cursor-pointer"><Trash2 className="w-3.5 h-3.5"/> Delete</button>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* 5. HISTORY & DRAMA TAB */}
        {activeTab === 'history' && (
          <div className="bg-white p-6 rounded-xl shadow-sm space-y-6">
            <h2 className="text-lg font-bold text-red-800 flex items-center gap-2"><BookOpen className="w-5 h-5"/> इतिहास व नाटक कार्यक्रम (History & Drama)</h2>
            {histMsg && <p className="text-xs font-bold text-emerald-600">{histMsg}</p>}
            <form onSubmit={handleAddHistory} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><label className="block text-xs font-bold text-gray-700 mb-1">वर्ष (Year)</label><input type="text" value={histYear} onChange={e => setHistYear(e.target.value)} className="w-full border p-2 rounded text-sm" required /></div>
              <div><label className="block text-xs font-bold text-gray-700 mb-1">दिवस / दिन का नाम (Day Name)</label><input type="text" value={histDay} onChange={e => setHistDay(e.target.value)} placeholder="Day 1" className="w-full border p-2 rounded text-sm" required /></div>
              <div><label className="block text-xs font-bold text-gray-700 mb-1">दिनांक और समय (Date & Time)</label><input type="text" value={histDateTime} onChange={e => setHistDateTime(e.target.value)} placeholder="25 Oct, 6:00 PM" className="w-full border p-2 rounded text-sm" required /></div>
              <div><label className="block text-xs font-bold text-gray-700 mb-1">श्रेणी (Category)</label>
                <select value={histCategory} onChange={e => setHistCategory(e.target.value)} className="w-full border p-2 rounded text-sm">
                  <option value="natak">Natak (नाटक)</option>
                  <option value="ramlila">Ramlila (रामलीला)</option>
                  <option value="balibadh">Bali Badh (बलि वध)</option>
                  <option value="program">Program (कार्यक्रम)</option>
                </select>
              </div>
              <div className="md:col-span-2"><label className="block text-xs font-bold text-gray-700 mb-1">नाटक/रामलीला का नाम (Name)</label><input type="text" value={histName} onChange={e => setHistName(e.target.value)} className="w-full border p-2 rounded text-sm" required /></div>
              <div className="md:col-span-2"><label className="block text-xs font-bold text-gray-700 mb-1">फाइल इमेज (Image File)</label><input type="file" accept="image/*" onChange={e => setHistImageFile(e.target.files[0])} className="w-full border p-1.5 rounded text-sm bg-white" /></div>
              <div><label className="block text-xs font-bold text-gray-700 mb-1">संक्षिप्त विवरण (Brief Description)</label><input type="text" value={histDesc} onChange={e => setHistDesc(e.target.value)} className="w-full border p-2 rounded text-sm" /></div>
              <div><label className="block text-xs font-bold text-gray-700 mb-1">मुख्य पात्र (Main Cast)</label><input type="text" value={histCast} onChange={e => setHistCast(e.target.value)} placeholder="राम, लक्ष्मण, सीता..." className="w-full border p-2 rounded text-sm" /></div>
              <div className="md:col-span-2"><button type="submit" className="bg-red-800 text-white px-6 py-2 rounded-lg font-bold text-sm cursor-pointer">Save Event / History</button></div>
            </form>

            <div className="mt-6">
              <h3 className="font-bold text-gray-800 text-sm uppercase mb-3">इतिहास व नाटक सूची (Live Public View Data)</h3>
              <div className="space-y-3">
                {historyList.length === 0 ? <p className="text-gray-400 text-sm">कोई डेटा नहीं है</p> :
                  historyList.map(item => (
                    <div key={item._id} className="border p-4 rounded-lg flex justify-between items-center bg-gray-50 shadow-sm">
                      <div className="flex gap-4 items-center">
                        {item.imageUrl && <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded bg-gray-200"/>}
                        <div>
                          <span className="text-xs bg-red-100 text-red-800 font-bold px-2 py-0.5 rounded">{item.year} | {item.day} | {item.dateTime}</span>
                          <h4 className="font-bold text-base mt-1">{item.name}</h4>
                          <p className="text-xs text-gray-600">मुख्य पात्र: {item.cast} | विवरण: {item.desc}</p>
                        </div>
                      </div>
                      <button onClick={() => handleDeleteHistory(item._id)} className="bg-rose-100 text-rose-700 p-2 rounded cursor-pointer hover:bg-rose-600 hover:text-white"><Trash2 className="w-4 h-4"/></button>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* 6. COMMITTEE TAB */}
        {activeTab === 'committee' && (
          <div className="bg-white p-6 rounded-xl shadow-sm space-y-6">
            <h2 className="text-lg font-bold text-purple-700 flex items-center gap-2"><Users className="w-5 h-5"/> कमेटी सदस्य प्रबंधन (Committee)</h2>
            {commMsg && <p className="text-xs font-bold text-emerald-600">{commMsg}</p>}
            <form onSubmit={handleAddCommittee} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><label className="block text-xs font-bold text-gray-700 mb-1">सदस्य का नाम (Name)</label><input type="text" value={commName} onChange={e => setCommName(e.target.value)} className="w-full border p-2 rounded text-sm" required /></div>
              <div><label className="block text-xs font-bold text-gray-700 mb-1">पद (Designation / Pad)</label><input type="text" value={commPad} onChange={e => setCommPad(e.target.value)} placeholder="अध्यक्ष / सचिव..." className="w-full border p-2 rounded text-sm" required /></div>
              <div><label className="block text-xs font-bold text-gray-700 mb-1">मोबाइल नंबर (Mobile Number)</label><input type="text" value={commPhone} onChange={e => setCommPhone(e.target.value)} className="w-full border p-2 rounded text-sm" required /></div>
              <div><label className="block text-xs font-bold text-gray-700 mb-1">फोटो फाइल (Photo)</label><input type="file" accept="image/*" onChange={e => setCommPhoto(e.target.files[0])} className="w-full border p-1.5 rounded text-sm bg-white" required /></div>
              <div className="md:col-span-2"><button type="submit" className="bg-purple-600 text-white px-6 py-2 rounded-lg font-bold text-sm cursor-pointer">Save Member</button></div>
            </form>

            <div className="mt-6">
              <h3 className="font-bold text-gray-800 text-sm uppercase mb-3">कमेटी सदस्य सूची (Live Public View Data)</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {committeeList.length === 0 ? <p className="text-gray-400 text-sm">कोई सदस्य नहीं है</p> :
                  committeeList.map(member => (
                    <div key={member._id} className="border rounded-lg p-4 bg-gray-50 flex items-center justify-between shadow-sm">
                      <div className="flex items-center gap-3">
                        {member.photoUrl && <img src={member.photoUrl} alt={member.name} className="w-12 h-12 rounded-full object-cover bg-gray-200"/>}
                        <div>
                          <h4 className="font-bold text-sm">{member.name}</h4>
                          <p className="text-xs text-purple-700 font-semibold">{member.pad}</p>
                          <p className="text-xs text-gray-500">{member.phone}</p>
                        </div>
                      </div>
                      <button onClick={() => handleDeleteCommittee(member._id)} className="bg-rose-100 text-rose-700 p-1.5 rounded cursor-pointer hover:bg-rose-600 hover:text-white"><Trash2 className="w-4 h-4"/></button>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* 7. MESSAGES TAB */}
        {activeTab === 'messages' && (
          <div className="bg-white p-6 rounded-xl shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-indigo-600 flex items-center gap-2"><MessageSquare className="w-5 h-5"/> संदेश प्रबंधन (Messages)</h2>
            <p className="text-sm text-gray-600">यहाँ उपयोगकर्ताओं द्वारा भेजे गए सभी सुझाव और संदेश दिखाई देंगे।</p>
            <div className="border border-dashed p-8 rounded-lg text-center text-gray-400 text-sm">
              फिलहाल कोई नया संदेश प्राप्त नहीं हुआ है।
            </div>
          </div>
        )}

      </main>
    </div>
  );
}