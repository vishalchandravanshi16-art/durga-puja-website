import React from 'react';

export default function GalleryCard({ item, onDelete, onUpdate }) {
  // LocalStorage se check karenge ki admin login hai ya nahi (Token hai ya nahi)
  const isAdmin = Boolean(localStorage.getItem('token'));

  return (
    <div className="group relative bg-white rounded-xl overflow-hidden shadow-md border border-amber-200 hover:shadow-lg transition duration-300">
      <div className="overflow-hidden h-60 bg-gray-100 relative">
        <img
          src={item.imageUrl}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
          onError={(e)=>(e.target.src='https://via.placeholder.com/400x300?text=Image+Not+Found')}
        />

        {/* Delete aur Update Buttons - Sirf tabhi dikhenge jab Admin logged-in hoga (Token hoga) */}
        {isAdmin && (
          <div className="absolute top-2 right-2 flex gap-2 opacity-90 group-hover:opacity-100 transition-opacity">
            {onUpdate && (
              <button
                onClick={() => onUpdate(item)}
                className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow-md text-xs font-bold"
                title="Update Item"
              >
                ✏️
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(item._id)}
                className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-full shadow-md text-xs font-bold"
                title="Delete Item"
              >
                🗑️
              </button>
            )}
          </div>
        )}
      </div>

      <div className="p-4 bg-white">
        <span className="text-[11px] uppercase font-extrabold text-amber-700 tracking-wider">
          {item.year} • {item.category}
        </span>
        <h4 className="font-bold text-sm text-gray-900 mt-1">{item.title}</h4>
        {item.description && <p className="text-xs text-gray-500 mt-1">{item.description}</p>}
      </div>
    </div>
  );
}