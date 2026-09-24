import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Landmark, 
  ImageIcon, 
  BookOpen, 
  Users, 
  MessageSquare, 
  Save, 
  Trash2, 
  Edit3 
} from 'lucide-react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('expense');

  // --- 1. Expense States (Placeholder / Integrated) ---
  const [expMsg, setExpMsg] = useState('');
  const [expYear, setExpYear] = useState('');
  const [expCategory, setExpCategory] = useState('');
  const [expAmount, setExpAmount] = useState('');
  const [expSource, setExpSource] = useState('');
  const [expenseList, setExpenseList] = useState([]);

  const handleAddExpense = (e) => {
    e.preventDefault();
    // Add your expense submission logic here
    setExpMsg('Expense saved successfully!');
  };

  const handleDeleteExpense = (id) => {
    setExpenseList(expenseList.filter(item => item._id !== id));
  };

  // --- 2. Income States ---
  const [incMsg, setIncMsg] = useState('');
  const [incYear, setIncYear] = useState('');
  const [incCategory, setIncCategory] = useState('');
  const [incAmount, setIncAmount] = useState('');
  const [incSource, setIncSource] = useState('');

  const handleAddIncome = (e) => {
    e.preventDefault();
    setIncMsg('Income saved successfully!');
  };

  // --- 3. Murti Bari States ---
  const [mbMsg, setMbMsg] = useState('');
  const [mbYear, setMbYear] = useState('');
  const [mbFamilyName, setMbFamilyName] = useState('');
  const [mbFatherName, setMbFatherName] = useState('');
  const [mbAddress, setMbAddress] = useState('');
  const [mbStatus, setMbStatus] = useState('Upcoming');
  const [mbNotes, setMbNotes] = useState('');
  const [murtiBariList, setMurtiBariList] = useState([]);

  const handleAddMurtiBari = (e) => {
    e.preventDefault();
    setMbMsg('Murti Bari added successfully!');
  };

  const handleDeleteMurtiBari = (id) => {
    setMurtiBariList(murtiBariList.filter(item => item._id !== id));
  };

  // --- 4. Gallery States ---
  const [galMsg, setGalMsg] = useState('');
  const [galYear, setGalYear] = useState('');
  const [galCategory, setGalCategory] = useState('Maa Durga');
  const [galImageFile, setGalImageFile] = useState(null);
  const [galTitle, setGalTitle] = useState('');
  const [galDesc, setGalDesc] = useState('');
  const [galleryList, setGalleryList] = useState([]);

  const handleAddGalleryPhoto = (e) => {
    e.preventDefault();
    setGalMsg('Photo uploaded to gallery successfully!');
  };

  const handleDeleteGalleryPhoto = (id) => {
    setGalleryList(galleryList.filter(item => item._id !== id));
  };

  // --- 5. History & Drama States ---
  const [historyMsg, setHistoryMsg] = useState('');
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
  const [historyList, setHistoryList] = useState([]);

  const handleHistorySubmit = (e) => {
    e.preventDefault();
    setHistoryMsg(editingEventId ? 'History updated successfully!' : 'History saved successfully!');
  };

  const handleEditHistoryClick = (item) => {
    setEditingEventId(item._id);
    setInputYear(item.year);
    setDramaTitle(item.title);
    setDayNumber(item.dayNumber);
    setCategory(item.category);
  };

  const handleDeleteHistory = (id) => {
    setHistoryList(historyList.filter(item => item._id !== id));
  };

  // --- 6. Committee States ---
  const [commMsg, setCommMsg] = useState('');
  const [commName, setCommName] = useState('');
  const [commRole, setCommRole] = useState('');
  const [commPhone, setCommPhone] = useState('');
  const [commYear, setCommYear] = useState('');
  const [commResponsibility, setCommResponsibility] = useState('');
  const [commOrder, setCommOrder] = useState('');
  const [commImageFile, setCommImageFile] = useState(null);
  const [editingCommId, setEditingCommId] = useState(null);
  const [committeeList, setCommitteeList] = useState([]);

  const handleCommitteeSubmit = (e) => {
    e.preventDefault();
    setCommMsg(editingCommId ? 'Member updated successfully!' : 'Committee member added successfully!');
  };

  const handleEditCommitteeClick = (member) => {
    setEditingCommId(member._id);
    setCommName(member.name);
    setCommRole(member.position);
    setCommYear(member.year);
  };

  const handleDeleteCommittee = (id) => {
    setCommitteeList(committeeList.filter(item => item._id !== id));
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar / Navigation Tabs */}
      <aside className="w-64 bg-white border-r shadow-sm p-4 space-y-2">
        <h2 className="text-xl font-black text-gray-800 mb-6 px-2">Admin Panel</h2>
        
        <button 
          onClick={() => setActiveTab('expense')} 
          className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-bold transition cursor-pointer ${activeTab === 'expense' ? 'bg-rose-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
        >
          <TrendingDown className="w-4 h-4" /> खर्च (Expense)
        </button>

        <button 
          onClick={() => setActiveTab('income')} 
          className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-bold transition cursor-pointer ${activeTab === 'income' ? 'bg-emerald-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
        >
          <TrendingUp className="w-4 h-4" /> आय (Income)
        </button>

        <button 
          onClick={() => setActiveTab('murtibari')} 
          className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-bold transition cursor-pointer ${activeTab === 'murtibari' ? 'bg-amber-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
        >
          <Landmark className="w-4 h-4" /> मूर्ति बारी (Murti Bari)
        </button>

        <button 
          onClick={() => setActiveTab('gallery')} 
          className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-bold transition cursor-pointer ${activeTab === 'gallery' ? 'bg-blue-800 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
        >
          <ImageIcon className="w-4 h-4" /> गैलरी (Gallery)
        </button>

        <button 
          onClick={() => setActiveTab('history')} 
          className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-bold transition cursor-pointer ${activeTab === 'history' ? 'bg-red-900 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
        >
          <BookOpen className="w-4 h-4" /> इतिहास व नाटक (History)
        </button>

        <button 
          onClick={() => setActiveTab('committee')} 
          className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-bold transition cursor-pointer ${activeTab === 'committee' ? 'bg-purple-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
        >
          <Users className="w-4 h-4" /> कमेटी (Committee)
        </button>

        <button 
          onClick={() => setActiveTab('messages')} 
          className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-bold transition cursor-pointer ${activeTab === 'messages' ? 'bg-gray-800 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
        >
          <MessageSquare className="w-4 h-4" /> संदेश (Messages)
        </button>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8 overflow-y-auto">

        {/* 1. Expense Tab */}
        {activeTab === 'expense' && (
          <div className="bg-white p-6 rounded-xl shadow-sm space-y-6">
            <div>
              <h3 className="text-lg font-bold text-rose-600 mb-4 flex items-center gap-2">
                <TrendingDown className="w-5 h-5" /> खर्च जोड़ें (Add Expense)
              </h3>
              {expMsg && <p className="text-xs font-bold mb-4 text-emerald-600">{expMsg}</p>}
              <form onSubmit={handleAddExpense} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">वर्ष (Year)</label>
                  <input type="text" value={expYear} onChange={(e) => setExpYear(e.target.value)} className="w-full border p-2 rounded text-sm" required />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">श्रेणी (Category)</label>
                  <input type="text" value={expCategory} onChange={(e) => setExpCategory(e.target.value)} className="w-full border p-2 rounded text-sm" required />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">राशि (Amount)</label>
                  <input type="number" value={expAmount} onChange={(e) => setExpAmount(e.target.value)} className="w-full border p-2 rounded text-sm" required />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">भुगतान विवरण / स्त्रोत (Source/Details)</label>
                  <input type="text" value={expSource} onChange={(e) => setExpSource(e.target.value)} className="w-full border p-2 rounded text-sm" />
                </div>
                <div className="md:col-span-2">
                  <button type="submit" className="bg-rose-600 text-white px-6 py-2 rounded-lg font-bold text-sm cursor-pointer">Save Expense</button>
                </div>
              </form>
            </div>

            {/* Expense Table List */}
            <div>
              <h4 className="text-sm font-bold text-gray-800 mb-3 uppercase">मौजूदा खर्च सूचियाँ ({expenseList.length})</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-rose-50 text-gray-700 text-xs uppercase border-b">
                      <th className="py-2.5 px-4">वर्ष</th>
                      <th className="py-2.5 px-4">श्रेणी</th>
                      <th className="py-2.5 px-4">राशि</th>
                      <th className="py-2.5 px-4">विवरण</th>
                      <th className="py-2.5 px-4 text-center">एक्शन</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {expenseList.length === 0 ? (
                      <tr><td colSpan="5" className="py-4 text-center text-gray-500 text-xs">कोई खर्च रिकॉर्ड उपलब्ध नहीं है।</td></tr>
                    ) : (
                      expenseList.map((item) => (
                        <tr key={item._id} className="hover:bg-rose-50/40">
                          <td className="py-3 px-4 font-bold text-rose-800">{item.year}</td>
                          <td className="py-3 px-4 font-semibold text-gray-900">{item.category}</td>
                          <td className="py-3 px-4 text-gray-600">₹{item.amount}</td>
                          <td className="py-3 px-4 text-gray-600">{item.source || '-'}</td>
                          <td className="py-3 px-4 text-center">
                            <button onClick={() => handleDeleteExpense(item._id)} className="bg-rose-100 text-rose-700 hover:bg-rose-600 hover:text-white p-1.5 rounded-lg transition cursor-pointer">
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

        {/* 2. Income Tab */}
        {activeTab === 'income' && (
          <div className="bg-white p-6 rounded-xl shadow-sm">
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
                <label className="block text-xs font-bold text-gray-700 mb-1">श्रेणी (Category)</label>
                <input type="text" value={incCategory} onChange={(e) => setIncCategory(e.target.value)} className="w-full border p-2 rounded text-sm" required />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">राशि (Amount)</label>
                <input type="number" value={incAmount} onChange={(e) => setIncAmount(e.target.value)} className="w-full border p-2 rounded text-sm" required />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">स्त्रोत (Source)</label>
                <input type="text" value={incSource} onChange={(e) => setIncSource(e.target.value)} className="w-full border p-2 rounded text-sm" />
              </div>
              <div className="md:col-span-2">
                <button type="submit" className="bg-emerald-600 text-white px-6 py-2 rounded-lg font-bold text-sm cursor-pointer">Save Income</button>
              </div>
            </form>
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
                        <button onClick={() => handleDeleteGalleryPhoto(item._id)} className="bg-rose-50 text-rose-700 hover:bg-rose-600 hover:text-white px-3 py-1 rounded-xs text-xs font-bold transition flex items-center gap-1 cursor-pointer">
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
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-gray-600" /> संदेश (Messages Management)
            </h3>
            <p className="text-xs text-gray-500">यहाँ यूज़र्स द्वारा भेजे गए संदेश दिखाई देंगे।</p>
          </div>
        )}

      </main>
    </div>
  );
}