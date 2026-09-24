import React from 'react';
import { Calendar } from 'lucide-react';

export default function YearSelector({ years, selectedYear, onSelectYear }) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto py-2">
      <Calendar className="w-5 h-5 text-devotional-red flex-shrink-0" />
      <span className="text-sm font-bold text-gray-700 mr-2 flex-shrink-0">वर्ष चुनें / Select Year:</span>
      {years.map((y) => (
        <button
          key={y.year}
          onClick={() => onSelectYear(y.year)}
          className={`px-4 py-1.5 rounded-full text-sm font-bold transition flex-shrink-0 ${
            selectedYear === y.year
              ? 'bg-devotional-red text-white shadow'
              : 'bg-amber-100 text-devotional-darkRed hover:bg-amber-200'
          }`}
        >
          {y.year}
        </button>
      ))}
    </div>
  );
}