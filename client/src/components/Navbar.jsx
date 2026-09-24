import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Shield, Landmark } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'गृह / Home', path: '/' },
    { name: 'समिति / Committee', path: '/committee' },
    { name: 'आय-व्यय / Financials', path: '/financials' },
    { name: 'इतिहास / History', path: '/history' },
    { name: 'मूर्ति की बारी / Murti Bari', path: '/murti-bari' },
    { name: 'गैलरी / Gallery', path: '/gallery' },
    { name: 'संपर्क / Contact', path: '/contact' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-devotional-red text-white shadow-lg sticky top-0 z-50 border-b-4 border-devotional-gold">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-3">
            <div className="bg-devotional-gold p-2 rounded-full text-devotional-darkRed">
              <Landmark className="h-6 w-6" />
            </div>
            <div>
             <span className="text-xl font-bold text-amber-300">
  आदिशक्ति नवयुवक संघ
</span>
<span className="block text-xs text-amber-100">
  दुर्गा पूजा समिति, पतरिहाँ (सहार, भोजपुर)
</span>
            </div>
          </Link>

          <div className="hidden md:flex space-x-1 lg:space-x-4 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-md text-sm font-semibold transition-colors duration-200 ${
                  isActive(link.path)
                    ? 'bg-devotional-gold text-devotional-darkRed shadow-sm'
                    : 'hover:bg-devotional-darkRed text-amber-50'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/admin"
              className="flex items-center gap-1 bg-devotional-gold text-devotional-darkRed px-3 py-1.5 rounded-md font-bold text-xs hover:bg-yellow-400 transition"
            >
              <Shield className="w-4 h-4" />
              Admin
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-amber-100 hover:text-white p-2 rounded-md focus:outline-none"
            >
              {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-devotional-darkRed px-2 pt-2 pb-4 space-y-1 sm:px-3 border-t border-red-800">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive(link.path) ? 'bg-devotional-gold text-devotional-darkRed font-bold' : 'text-amber-100 hover:bg-red-800'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/admin"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-bold bg-devotional-gold text-devotional-darkRed text-center"
          >
            Admin Panel Login
          </Link>
        </div>
      )}
    </nav>
  );
}