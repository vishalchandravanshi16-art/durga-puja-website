import React from 'react';

const MemberCard = ({ member, onDelete, onEdit, isAdmin }) => {
  // Cloudinary URL ya backend URL ko handle karne ke liye safe logic
  let imagePath = member.photo || member.image || '';
  imagePath = imagePath.replace(/\\/g, '/');

  const API_BASE_URL = process.env.REACT_APP_API_URL || '';

  const imageUrl = imagePath 
    ? (imagePath.startsWith('http') ? imagePath : `${API_BASE_URL}/${imagePath.replace(/^\/+/, '')}`)
    : 'https://via.placeholder.com/150';

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl p-5 flex flex-col items-center text-center text-white relative group transition-all duration-300 hover:scale-105">
      
      {/* Profile Image */}
      <img
        src={imageUrl}
        alt={member.name}
        className="w-24 h-24 object-cover rounded-full mb-3 border-2 border-amber-400 shadow-md"
        onError={(e) => { 
          e.target.onerror = null; 
          e.target.src = 'https://via.placeholder.com/150'; 
        }}
      />

      {/* Member Name */}
      <h3 className="text-lg font-bold text-slate-100 uppercase tracking-wide">{member.name}</h3>
      
      {/* Position / Pad */}
      <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold rounded-full mt-1">
        {member.position || member.pad || 'सक्रिय सदस्य'}
      </span>

      {/* Responsibility */}
      {member.responsibility && (
        <p className="text-xs text-slate-400 mt-2">
          {member.responsibility}
        </p>
      )}

      {/* Phone Number */}
      {member.phone && (
        <a 
          href={`tel:${member.phone}`} 
          className="text-xs text-cyan-400 font-mono mt-2 hover:underline"
        >
          📞 {member.phone}
        </a>
      )}

      {/* Year (Optional - Agar na ho toh error nahi dega) */}
      {member.year && (
        <span className="text-[10px] text-slate-500 mt-1">
          वर्ष: {member.year}
        </span>
      )}

      {/* Admin Actions (Delete / Edit) */}
      {isAdmin && (
        <div className="flex gap-2 mt-4 w-full">
          {onEdit && (
            <button
              onClick={() => onEdit(member)}
              className="flex-1 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded-lg font-semibold transition"
            >
              Edit
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(member._id)}
              className="flex-1 py-1 bg-red-600 hover:bg-red-700 text-white text-xs rounded-lg font-semibold transition"
            >
              Delete
            </button>
          )}
        </div>
      )}

    </div>
  );
};

export default MemberCard;