import React from 'react';

export default function GalleryCard({ item }) {
  return (
    <div className="group relative bg-white rounded-xl overflow-hidden shadow-md border border-amber-200 hover:shadow-lg transition duration-300">
      <div className="overflow-hidden h-60 bg-gray-100">
        <img 
          src={item.imageUrl} 
          alt={item.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition duration-300" 
          onError={(e)=>{e.target.src='https://via.placeholder.com/400x300?text=Image+Not+Found'}}
        />
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