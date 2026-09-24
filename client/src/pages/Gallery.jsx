import React, { useState, useEffect } from 'react';
import API from '../services/api'; // Shared API instance import kiya gaya hai

export default function Gallery() {
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedCat, setSelectedCat] = useState('All');
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = ['All', 'Maa Durga', 'Murti', 'Pandal', 'Puja', 'Cultural Program', 'Visarjan', 'Committee', 'Old Memories'];

  // Backend API se gallery ka data laana
  const fetchGalleryData = async () => {
    setLoading(true);
    try {
      const res = await API.get('/gallery');
      let allPhotos = res.data;

      // Filter logic (Year aur Category ke anusar)
      let filtered = allPhotos;

      if (selectedYear !== '') {
        filtered = filtered.filter(p => String(p.year) === String(selectedYear));
      }

      if (selectedCat !== 'All') {
        filtered = filtered.filter(p => p.category === selectedCat);
      }

      setPhotos(filtered);

      // Dropdown ke liye unique years nikalna
      const uniqueYears = [...new Set(allPhotos.map(p => p.year))]
        .sort((a, b) => b - a)
        .map(yr => ({ year: yr }));
      setYears(uniqueYears);

    } catch (error) {
      console.error("Error fetching gallery data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGalleryData();
  }, [selectedYear, selectedCat]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 py-6 font-sans">
      <div className="border-b border-amber-200 pb-4">
        <h1 className="text-3xl font-extrabold text-amber-900">फोटो गैलरी / Photo Gallery</h1>
        <p className="text-sm text-gray-600">पावन स्मृतियां और दिव्य दृश्य</p>
      </div>

      {/* Filters (Categories & Years) */}
      <div className="flex flex-wrap gap-2 items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition shadow-sm cursor-pointer ${
                selectedCat === cat 
                  ? 'bg-red-800 text-white' 
                  : 'bg-white text-gray-700 hover:bg-amber-100 border border-amber-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="bg-white border border-amber-300 rounded-lg px-3 py-1.5 text-xs font-bold text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
        >
          <option value="">सभी वर्ष / All Years</option>
          {years.map(y => <option key={y.year} value={y.year}>{y.year}</option>)}
        </select>
      </div>

      {/* Loading or Gallery Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-red-800"></div>
        </div>
      ) : photos.length === 0 ? (
        <div className="text-center py-16 bg-amber-50/50 rounded-2xl border border-amber-200">
          <p className="text-gray-600 font-medium">इस वर्ष या श्रेणी (Category) में कोई फोटो उपलब्ध नहीं है।</p>
          <p className="text-xs text-amber-700 mt-1">कृपया एडमिन डैशबोर्ड से तस्वीरें अपलोड करें।</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {photos.map((item) => (
            <div key={item._id} className="group relative bg-white rounded-xl overflow-hidden shadow-md border border-amber-200 hover:shadow-lg transition duration-300">
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
          ))}
        </div>
      )}
    </div>
  );
}