import React from 'react';

const MemberCard = ({ member }) => {
  // Backend se aane wale photo path ko handle karne ke liye base URL jod rahe hain
  const imageUrl = member.photo 
    ? (member.photo.startsWith('http') ? member.photo : `http://localhost:5000/${member.photo}`)
    : 'https://via.placeholder.com/150';

  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center text-center border border-gray-200">
      <img 
        src={imageUrl} 
        alt={member.name} 
        className="w-24 h-24 object-cover rounded-full mb-3 border-2 border-purple-600"
        onError={(e) => { e.target.src = 'https://via.placeholder.com/150'; }}
      />
      <h3 className="text-lg font-bold text-gray-800">{member.name}</h3>
      <p className="text-sm font-semibold text-purple-600">{member.position}</p>
      {member.responsibility && (
        <p className="text-xs text-gray-500 mt-1">उत्तरदायित्व: {member.responsibility}</p>
      )}
      {member.phone && (
        <p className="text-xs text-gray-500">मोबाईल: {member.phone}</p>
      )}
      <p className="text-xs text-gray-400 mt-1">वर्ष: {member.year}</p>
    </div>
  );
};

export default MemberCard;