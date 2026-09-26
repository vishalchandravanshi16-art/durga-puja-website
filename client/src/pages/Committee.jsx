import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Committee = () => {
  const [committeeMembers, setCommitteeMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check if admin is logged in via token
    const token = localStorage.getItem('token');
    setIsAdmin(!!token);

    const fetchMembers = async () => {
      try {
        const API_BASE_URL = process.env.REACT_APP_API_URL || '';
        const res = await axios.get(`${API_BASE_URL}/api/committee`);
        setCommitteeMembers(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching committee members:", err);
        setLoading(false);
      }
    };
    fetchMembers();
  }, []);

  // Handle Delete Member (Admin Only)
  const handleDelete = async (id) => {
    if (window.confirm("Kya aap sach mein is sadasya ko hatana chahte hain?")) {
      try {
        const token = localStorage.getItem('token');
        const API_BASE_URL = process.env.REACT_APP_API_URL || '';
        await axios.delete(`${API_BASE_URL}/api/committee/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCommitteeMembers(committeeMembers.filter(member => member._id !== id));
        alert("Sadasya safaltaपूर्वक hata diya gaya!");
      } catch (err) {
        console.error("Error deleting member:", err);
        alert("Sadasya hatane mein samasya aayi.");
      }
    }
  };

  // Handle Edit Member (Aap ise apne admin dashboard ya edit modal par redirect kar sakte hain)
  const handleEdit = (member) => {
    // Aap chahein toh ise AdminDashboard ya kisi edit form par bhej sakte hain
    alert(`Edit feature: Aap ${member.name} ko Admin Dashboard se edit kar sakte hain.`);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white py-12 px-4 sm:px-6 lg:px-8 font-sans">
      {/* Dynamic Animated Spinning Hacker Border Style */}
      <style>{`
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-spin-border {
          animation: spin-slow 4s linear infinite;
        }
      `}</style>

      {/* Header Banner */}
      <div className="max-w-7xl mx-auto text-center mb-12">
        <div className="bg-gradient-to-r from-red-900 via-amber-900 to-red-900 border-2 border-amber-500/50 rounded-2xl p-6 shadow-[0_0_25px_rgba(245,158,11,0.3)]">
          <h1 className="text-3xl sm:text-5xl font-black text-amber-300 tracking-wide drop-shadow-md">
            आदिशक्ति नवयुवक संघ दुर्गा पूजा समिति
          </h1>
          <p className="text-amber-100 text-sm sm:text-lg mt-2 font-medium">
            पतरिहाँ (सहार, भोजपुर) — पूजा समारोह के सफल संचालन हेतु समर्पित मुख्य पदाधिकारी
          </p>
        </div>
      </div>

      {/* Members Grid Container */}
      <div className="max-w-7xl mx-auto">
        {loading ? (
          <p className="text-center text-amber-400 text-lg font-mono">लोड हो रहा है...</p>
        ) : committeeMembers.length === 0 ? (
          <p className="text-center text-slate-400 text-lg">कोई कमेटी सदस्य उपलब्ध नहीं है।</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {committeeMembers.map((member, index) => {
              let imagePath = member.photo || member.image || "";
              imagePath = imagePath.replace(/\\/g, '/');
              
              const API_BASE_URL = process.env.REACT_APP_API_URL || '';
              const imageUrl = imagePath 
                ? (imagePath.startsWith('http') ? imagePath : `${API_BASE_URL}/${imagePath.replace(/^\/+/, '')}`)
                : "https://via.placeholder.com/150/1e293b/f59e0b?text=Member";

              return (
                <div
                  key={member._id || index}
                  className="relative group rounded-2xl overflow-hidden p-[2px] bg-slate-900 transition-all duration-300 hover:scale-105 flex flex-col justify-between"
                >
                  {/* Spinning Neon Glowing Cyber Border (Hacker Look) */}
                  <div className="absolute -inset-[100%] animate-spin-border bg-[conic-gradient(from_0deg,#ff0055,#00e5ff,#7600bc,#ff0055)] opacity-80 group-hover:opacity-100 blur-sm"></div>

                  {/* Inner Card Body */}
                  <div className="relative z-10 h-full bg-slate-900/95 backdrop-blur-xl rounded-2xl p-6 flex flex-col items-center justify-between border border-slate-800 w-full">
                    
                    {/* Profile Image with Neon Glow */}
                    <div className="relative w-32 h-32 mb-4">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-500 via-cyan-400 to-purple-600 animate-pulse blur-md opacity-70"></div>
                      <img
                        src={imageUrl}
                        alt={member.name}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://via.placeholder.com/150/1e293b/f59e0b?text=Member";
                        }}
                        className="relative z-10 w-full h-full object-cover rounded-full border-2 border-amber-400 shadow-xl"
                      />
                    </div>

                    {/* Details */}
                    <div className="text-center w-full">
                      <h3 className="text-lg font-bold text-slate-100 tracking-wide uppercase mb-1">
                        {member.name}
                      </h3>
                      
                      <div className="inline-block px-3 py-1 bg-amber-500/10 border border-amber-500/40 rounded-full mb-2">
                        <span className="text-xs font-semibold text-amber-300">
                          {member.position || member.role}
                        </span>
                      </div>

                      <p className="text-xs text-slate-400 mb-4 h-8 flex items-center justify-center">
                        {member.responsibility || member.desc || "समिति के सक्रिय सदस्य"}
                      </p>
                    </div>

                    {/* Phone Button */}
                    <div className="w-full mt-auto space-y-2">
                      <a
                        href={`tel:${member.phone}`}
                        className="flex items-center justify-center gap-2 w-full py-2 px-4 bg-slate-800/80 hover:bg-amber-500 hover:text-slate-950 text-amber-300 border border-amber-500/30 rounded-xl font-mono text-sm transition-all duration-300 shadow-inner"
                      >
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.27c1.12.45 2.33.69 3.48.69a1 1 0 011 1v3.5a1 1 0 01-1 1C10.77 22 2 13.93 2 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.15.24 2.36.69 3.48a1 1 0 01-.27 1.1l-2.2 2.21z"/>
                        </svg>
                        {member.phone || "उपलब्ध नहीं"}
                      </a>

                      {/* Admin Edit & Delete Buttons (Visible only when logged in) */}
                      {isAdmin && (
                        <div className="flex gap-2 w-full pt-1">
                          <button
                            onClick={() => handleEdit(member)}
                            className="flex-1 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-all shadow"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(member._id)}
                            className="flex-1 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold transition-all shadow"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Committee;