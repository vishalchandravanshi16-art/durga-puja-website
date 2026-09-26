import React from 'react';

const MemberCard = ({ member }) => {
  // Cloudinary URL ya backend URL ko handle karne ke liye safe logic
  let imagePath = member.photo || member.image || '';
  imagePath = imagePath.replace(/\\/g, '/');

  const API_BASE_URL = process.env.REACT_APP_API_URL || '';

  const imageUrl = imagePath 
    ? (imagePath.startsWith('http') ? imagePath : `${API_BASE_URL}/${imagePath.replace(/^\/+/, '')}`)
    : 'https://via.placeholder.com/150';

  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center text-center border border-gray-200">
      <img
        src={imageUrl}
        alt={member.name}
        className="w-24 h-24 object-cover rounded-full mb-3 border-2 border-purple-600"
        onError={(e) => { 
          e.target.onerror = null; 
          e.target.src = 'https://via.placeholder.com/150'; 
        }}
      />
      <h3 className="text-lg font-bold text-gray-800">{member.name}</h3>
      <p className="text-sm font-semibold text-purple-600">{member.position}</p>
      {member.responsibility && (
        <p className="text-xs text-gray-500 mt-1">उत्तरदायित्व: {member.responsibility}</p>
      )}
      {member.phone && (
        <p className="text-xs text-gray-500">मोबाइल: {member.phone}</p>
      )}
      <p className="text-xs text-gray-400 mt-1">वर्ष: {member.year}</p>
    </div>
  );
};

export default MemberCard;