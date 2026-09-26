import React from 'react';

export default function MurtiBariCard({ item }) {
  const backendUrl = 'https://durga-puja-app-2026.onrender.com';
  
  const imageUrl = item.image 
    ? (item.image.startsWith('http') ? item.image : `${backendUrl}/${item.image}`) 
    : 'https://via.placeholder.com/150';

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-4 border border-orange-100">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            {item.year}
          </span>
          <h3 className="text-xl font-bold text-gray-800 mt-2">{item.familyName}</h3>
          <p className="text-gray-600 text-sm mt-1">
            <strong>अभिभावक / पिता का नाम:</strong> {item.fatherName}
          </p>
          <p className="text-gray-600 text-sm">
            <strong>ग्राम / स्थान:</strong> {item.address}
          </p>
          {item.notes && (
            <p className="text-gray-500 text-sm mt-2 italic">
              <strong>विशेष विवरण:</strong> {item.notes}
            </p>
          )}
        </div>
        
        <div className="flex flex-col items-center">
          <img 
            src={imageUrl} 
            alt="Murti Bari" 
            className="w-32 h-32 object-cover rounded-lg border border-gray-200 shadow-sm"
          />
          <span className={`mt-2 px-2.5 py-0.5 rounded-full text-xs font-medium ${item.status === 'Current' ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-800'}`}>
            {item.status}
          </span>
        </div>
      </div>
    </div>
  );
}