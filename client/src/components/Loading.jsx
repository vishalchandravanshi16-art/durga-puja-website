import React from 'react';

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="w-12 h-12 border-4 border-devotional-gold border-t-devotional-red rounded-full animate-spin mb-4"></div>
      <p className="text-devotional-darkRed font-semibold text-sm">लोड हो रहा है... / Loading Records...</p>
    </div>
  );
}