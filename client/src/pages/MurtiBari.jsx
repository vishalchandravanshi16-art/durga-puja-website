import React, { useState, useEffect } from 'react';
import API from '../services/api'; // Shared API instance import kiya gaya hai
import { 
  Crown, 
  Calendar, 
  User, 
  MapPin, 
  Search, 
  CheckCircle2, 
  Clock, 
  Sparkles,
  Users,
  Image as ImageIcon,
  Trash2,
  Edit3
} from 'lucide-react';

export default function MurtiBari() {
  const [murtiBariData, setMurtiBariData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState(2026);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Admin authentication check (token ke adhar par)
  const [isAdmin, setIsAdmin] = useState(false);

  // Edit modal state
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editYear, setEditYear] = useState('');
  const [editFamilyName, setEditFamilyName] = useState('');
  const [editFatherName, setEditFatherName] = useState('');
  const [editAddress, setEditAddress] = useState('');
  const [editStatus, setEditStatus] = useState('Current');
  const [editNotes, setEditNotes] = useState('');
  const [editImageFile, setEditImageFile] = useState(null);

  // Backend se live data fetch karna
  useEffect(() => {
    fetchMurtiBariList();
    // Check if admin token exists
    const token = localStorage.getItem('token');
    if (token) {
      setIsAdmin(true);
    }
  }, []);

  const fetchMurtiBariList = async () => {
    try {
      const response = await API.get('/murti-bari');
      if (Array.isArray(response.data) && response.data.length > 0) {
        setMurtiBariData(response.data);
        const currentActive = response.data.find(item => item.year === 2026) || response.data[0];
        setSelectedYear(currentActive.year);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching murti bari data:", error);
      setLoading(false);
    }
  };

  // Delete record function
  const handleDelete = async (id, e) => {
    e.stopPropagation(); // Row click hone se rokne ke liye
    if (window.confirm('Kya aap sach mein is record ko delete karna chahte hain?')) {
      try {
        const token = localStorage.getItem('token');
        await API.delete(`/murti-bari/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert('Record successfully delete ho gaya!');
        fetchMurtiBariList();
      } catch (error) {
        console.error('Error deleting record:', error);
        alert(error.response?.data?.message || 'Delete karne mein error aaya.');
      }
    }
  };

  // Open Edit Modal / Form
  const handleEditClick = (item, e) => {
    e.stopPropagation();
    setEditId(item._id);
    setEditYear(item.year);
    setEditFamilyName(item.familyName);
    setEditFatherName(item.fatherName || '');
    setEditAddress(item.address || '');
    setEditStatus(item.status || 'Current');
    setEditNotes(item.notes || item.description || '');
    setIsEditing(true);
  };

  // Submit Updated Data
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('year', editYear);
      formData.append('familyName', editFamilyName);
      formData.append('fatherName', editFatherName);
      formData.append('address', editAddress);
      formData.append('status', editStatus);
      formData.append('notes', editNotes);
      if (editImageFile) {
        formData.append('image', editImageFile);
      }

      const token = localStorage.getItem('token');
      await API.put(`/murti-bari/${editId}`, formData, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      alert('Record successfully update ho gaya!');
      setIsEditing(false);
      fetchMurtiBariList();
    } catch (error) {
      console.error('Error updating record:', error);
      alert(error.response?.data?.message || 'Update karne mein error aaya.');
    }
  };

  // Chunahu saal ya default data
  const activeData = murtiBariData.find(item => item.year === selectedYear) || murtiBariData[0];

  // Search filter
  const filteredList = murtiBariData.filter(item => {
    const fNameText = item.familyName || '';
    const fatherText = item.fatherName || '';
    const yrStr = item.year ? item.year.toString() : '';
    return (
      fNameText.toLowerCase().includes(searchTerm.toLowerCase()) ||
      yrStr.includes(searchTerm) ||
      fatherText.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <p className="text-amber-800 font-bold text-lg animate-pulse">डेटा लोड हो रहा है...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 py-6 font-sans relative">
      
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-red-950 via-amber-900 to-red-950 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-amber-500/30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-300 px-3 py-1 rounded-full text-xs font-semibold mb-3 border border-amber-400/30">
              <Crown className="w-3.5 h-3.5 text-amber-400" />
              <span>वर्षवार मूर्ति स्थापना दायित्व</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-amber-300">
              मूर्ति निर्माण की बारी (Murti Bari)
            </h1>
            <p className="text-amber-100/80 text-sm sm:text-base mt-1">
              आदेशाशक्ति नवयुवक संघ (पटरीहन) - प्रतिवर्ष मूर्ति निर्माण एवं यजमान सेवा की प्रामाणिक सूची
            </p>
          </div>

          {/* Clickable Year Tabs - Automatic Dynamic Buttons */}
          {murtiBariData.length > 0 && (
            <div className="bg-black/40 backdrop-blur-md p-2.5 rounded-2xl border border-amber-500/30">
              <span className="text-xs font-bold text-amber-300/80 px-3 py-1 block uppercase tracking-wider mb-1">
                वर्ष चुनें / Select Year
              </span>
              <div className="flex flex-wrap gap-2 max-h-36 overflow-y-auto">
                {murthiSort(murtiBariData).map((item) => (
                  <button
                    key={item._id || item.year}
                    onClick={() => setSelectedYear(item.year)}
                    className={`px-4 py-2 rounded-xl font-bold text-sm transition-all duration-200 flex items-center gap-1.5 shadow-sm cursor-pointer ${
                      selectedYear === item.year
                        ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-red-950 shadow-amber-500/20 scale-105'
                        : 'bg-white/10 text-amber-100 hover:bg-white/20 hover:text-white'
                    }`}
                  >
                    <Calendar className="w-4 h-4" />
                    {item.year}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 2. Current Selected Year Highlight Card with Image Support & Admin Actions */}
      {activeData ? (
        <div className="bg-gradient-to-br from-amber-50 via-white to-orange-50 rounded-3xl p-6 sm:p-8 shadow-xl border border-amber-200 relative overflow-hidden">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-amber-200/60 pb-6 mb-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-black text-xl shadow-lg shadow-amber-500/30 shrink-0">
                {activeData.year}
              </div>
              <div>
                <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block">
                  {activeData.year === 2026 ? "🔥 इस वर्ष की बारी (Current Year)" : "विगत वर्ष की बारी"}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                  {activeData.familyName}
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className={`px-4 py-2 rounded-full font-bold text-xs sm:text-sm flex items-center gap-2 shadow-sm ${
                activeData.status === 'Current' || activeData.year === 2026
                  ? 'bg-amber-500 text-white border border-amber-400 shadow-amber-500/20 animate-pulse' 
                  : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
              }`}>
                {activeData.status === 'Current' || activeData.year === 2026 ? <Clock className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
                {activeData.status || 'संपन्न'}
              </span>

              {/* Admin Edit/Delete buttons for active card */}
              {isAdmin && (
                <div className="flex items-center gap-2 bg-white p-1.5 rounded-xl border border-amber-200 shadow-sm">
                  <button 
                    onClick={(e) => handleEditClick(activeData, e)} 
                    className="p-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors title='Edit Record'"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={(e) => handleDelete(activeData._id, e)} 
                    className="p-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors title='Delete Record'"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Details & Image Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-2xl border border-amber-100 shadow-sm">
                <span className="text-xs font-semibold text-gray-500 block mb-1">अभिभावक / पिता का नाम</span>
                <p className="text-base font-bold text-gray-800 flex items-center gap-2">
                  <User className="w-4 h-4 text-amber-600" />
                  {activeData.fatherName || 'उपलब्ध नहीं'}
                </p>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-amber-100 shadow-sm">
                <span className="text-xs font-semibold text-gray-500 block mb-1">ग्राम / स्थान</span>
                <p className="text-base font-bold text-gray-800 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-600" />
                  {activeData.address || 'पटरीहन (सहार)'}
                </p>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-amber-100 shadow-sm sm:col-span-2">
                <span className="text-xs font-semibold text-gray-500 block mb-1">विशेष विवरण</span>
                <p className="text-sm font-medium text-amber-950 flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  {activeData.notes || activeData.description || 'विशेष विवरण दर्ज नहीं है।'}
                </p>
              </div>
            </div>

            {/* Murti / Host Family Uploaded Photo Display */}
            <div className="bg-white p-3 rounded-2xl border border-amber-100 shadow-sm flex flex-col items-center justify-center">
              <span className="text-xs font-semibold text-gray-500 mb-2 flex items-center gap-1">
                <ImageIcon className="w-3.5 h-3.5 text-amber-600" /> मूर्ति / यजमान फोटो
              </span>
              {activeData.image || activeData.photo ? (
                <img 
                  src={activeData.image || activeData.photo} 
                  alt="Murti Bari" 
                  className="w-full h-40 object-cover rounded-xl border border-amber-200 shadow-inner"
                />
              ) : (
                <div className="w-full h-40 bg-amber-50 rounded-xl border border-dashed border-amber-300 flex flex-col items-center justify-center text-amber-800/60 text-xs">
                  <ImageIcon className="w-8 h-8 mb-1 text-amber-400" />
                  फोटो उपलब्ध नहीं है
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-8 text-center text-gray-500 shadow-md">
          कोई डेटा उपलब्ध नहीं है।
        </div>
      )}

      {/* 3. Complete Year-by-Year Table Section */}
      <div className="bg-white rounded-3xl p-6 shadow-xl border border-amber-100 space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
          <div>
            <h3 className="text-xl font-extrabold text-gray-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-amber-600" />
              समस्त वर्षों की विस्तृत सूची (History List)
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">नाम या वर्ष लिखकर आसानी से खोजें</p>
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="नाम या वर्ष खोजें..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-amber-50/70 text-amber-950 text-xs uppercase font-extrabold tracking-wider border-b border-amber-200/60">
                <th className="p-4 rounded-l-xl">वर्ष (Year)</th>
                <th className="p-4">परिवार का नाम (Family Name)</th>
                <th className="p-4">अभिभावक (Father's Name)</th>
                <th className="p-4">स्थान (Address)</th>
                <th className="p-4">स्थिति (Status)</th>
                {isAdmin && <th className="p-4 rounded-r-xl text-center">Actions (Admin)</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {filteredList.length > 0 ? (
                filteredList.map((row) => (
                  <tr 
                    key={row._id || row.year} 
                    onClick={() => setSelectedYear(row.year)}
                    className={`cursor-pointer transition-colors ${
                      selectedYear === row.year 
                        ? 'bg-amber-100/50 font-semibold' 
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <td className="p-4 font-bold text-amber-900 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                      {row.year}
                    </td>
                    <td className="p-4 text-gray-900 font-bold">{row.familyName}</td>
                    <td className="p-4 text-gray-600">{row.fatherName || '-'}</td>
                    <td className="p-4 text-gray-600">{row.address || 'पटरीहन'}</td>
                    <td className="p-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                        row.status === 'Current' || row.year === 2026
                          ? 'bg-amber-500 text-white'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {row.status || 'Completed'}
                      </span>
                    </td>
                    {isAdmin && (
                      <td className="p-4 text-center" onClick={(e) => e.stopPropagation()}>
                        <div className="inline-flex items-center gap-2">
                          <button 
                            onClick={(e) => handleEditClick(row, e)}
                            className="p-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={(e) => handleDelete(row._id, e)}
                            className="p-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={isAdmin ? "6" : "5"} className="p-8 text-center text-gray-500 text-sm">
                    कोई रिकॉर्ड नहीं मिला।
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>

      {/* Edit Modal Popup */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-amber-200 relative animate-scaleIn">
            <h3 className="text-xl font-black text-amber-950 mb-4 flex items-center gap-2">
              <Edit3 className="w-5 h-5 text-amber-600" /> Murti Bari Record Edit Karein
            </h3>

            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Year</label>
                <input 
                  type="number" 
                  value={editYear} 
                  onChange={(e) => setEditYear(e.target.value)} 
                  required 
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Family Name</label>
                <input 
                  type="text" 
                  value={editFamilyName} 
                  onChange={(e) => setEditFamilyName(e.target.value)} 
                  required 
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Father's Name</label>
                <input 
                  type="text" 
                  value={editFatherName} 
                  onChange={(e) => setEditFatherName(e.target.value)} 
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Address</label>
                <input 
                  type="text" 
                  value={editAddress} 
                  onChange={(e) => setEditAddress(e.target.value)} 
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Status</label>
                <select 
                  value={editStatus} 
                  onChange={(e) => setEditStatus(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-amber-500 bg-white"
                >
                  <option value="Current">Current</option>
                  <option value="Completed">Completed</option>
                  <option value="Upcoming">Upcoming</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Notes / Description</label>
                <textarea 
                  value={editNotes} 
                  onChange={(e) => setEditNotes(e.target.value)} 
                  rows="2"
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-amber-500"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">New Image (Optional)</label>
                <input 
                  type="file" 
                  onChange={(e) => setEditImageFile(e.target.files[0])} 
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button 
                  type="button" 
                  onClick={() => setIsEditing(false)}
                  className="px-5 py-2 bg-gray-100 text-gray-700 font-bold rounded-xl text-sm hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-5 py-2 bg-amber-600 text-white font-bold rounded-xl text-sm hover:bg-amber-700 transition-colors shadow-md shadow-amber-600/20"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

// Helper function to sort years descending
function murthiSort(data) {
  return [...data].sort((a, b) => b.year - a.year);
}