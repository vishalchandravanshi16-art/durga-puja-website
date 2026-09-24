import React from 'react';
import { Heart, Landmark, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-devotional-darkRed text-amber-100 border-t-4 border-devotional-gold pt-10 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Landmark className="text-devotional-gold w-6 h-6" />
            <h3 className="text-xl font-bold text-devotional-gold">आदिशक्ति नवयुवक संघ दुर्गा पूजा समिति</h3>
          </div>
          <p className="text-sm text-amber-200/80 leading-relaxed">
           ग्राम व पोस्ट: पतरिहाँ, सहार, भोजपुर (बिहार) की ऐतिहासिक दुर्गा पूजा का आधिकारिक डिजिटल पोर्टल। पारदर्शी वित्तीय रिकॉर्ड और सांस्कृतिक धरोहर का डिजिटलीकरण।
          </p>
        </div>

        <div>
          <h4 className="text-lg font-bold text-devotional-gold mb-3 border-b border-red-800 pb-1">संपर्क सूत्र / Contact</h4>
          <ul className="space-y-2 text-sm text-amber-200/90">
            <li className="flex items-center gap-2"><MapPin className="w-4 h-4 text-devotional-gold"/> ग्राम व पोस्ट: पतरिहाँ</li>
            <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-devotional-gold"/> +91 8083440351 (अध्यक्ष)</li>
            <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-devotional-gold"/> contact@[PATARIHAN].org</li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-bold text-devotional-gold mb-3 border-b border-red-800 pb-1">जय माता दी</h4>
          <p className="text-xs text-amber-200/70 leading-relaxed">
            "या देवी सर्वभूतेषु शक्ति-रूपेण संस्थिता। नमस्तस्यै नमस्तस्यै नमस्तस्यै नमो नमः॥"
          </p>
        </div>
      </div>

      <div className="mt-8 pt-4 border-t border-red-900 text-center text-xs text-amber-200/60 flex flex-col sm:flex-row justify-between items-center max-w-7xl mx-auto px-4 gap-2">
        <p>© {new Date().getFullYear()} Shri Durga Puja Samiti – [PATARIHAN]. All rights reserved.</p>
        <p className="flex items-center gap-1">
          Built with Devotion <Heart className="w-3 h-3 text-red-400 fill-current" /> for Village Community
        </p>
      </div>
    </footer>
  );
}