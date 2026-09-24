import React from 'react';

export default function FinancialCard({ title, hindiTitle, amount, icon: Icon, type }) {
  const getColors = () => {
    switch(type) {
      case 'income': return 'border-emerald-500 text-emerald-700 bg-emerald-50';
      case 'expense': return 'border-rose-500 text-rose-700 bg-rose-50';
      default: return 'border-amber-500 text-amber-800 bg-amber-50';
    }
  };

  return (
    <div className={`p-6 rounded-xl border-l-4 shadow-sm ${getColors()} transition hover:shadow-md`}>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-xs uppercase tracking-wider font-semibold text-gray-500">{title} / {hindiTitle}</p>
          <h3 className="text-3xl font-black mt-1">₹{amount.toLocaleString('en-IN')}</h3>
        </div>
        <div className="p-3 bg-white rounded-full shadow-inner">
          <Icon className="w-8 h-8" />
        </div>
      </div>
    </div>
  );
}