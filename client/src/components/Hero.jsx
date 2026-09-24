import React from 'react';
import { Link } from 'react-router-dom';

const quickLinks = [
  {
    title: "समिति",
    subTitle: "Committee",
    icon: "👥",
    link: "/committee",
    bgColor: "bg-red-50 hover:bg-red-100",
    iconBg: "bg-red-800 text-white"
  },
  {
    title: "वित्तीय रिपोर्ट",
    subTitle: "Financial Report",
    icon: "₹",
    link: "/financials",
    bgColor: "bg-amber-50 hover:bg-amber-100",
    iconBg: "bg-amber-800 text-white"
  },
  {
    title: "फोटो गैलरी",
    subTitle: "Gallery",
    icon: "🖼️",
    link: "/gallery",
    bgColor: "bg-red-50 hover:bg-red-100",
    iconBg: "bg-red-800 text-white"
  },
  {
    title: "पूजा इतिहास",
    subTitle: "Puja History",
    icon: "📜",
    link: "/history",
    bgColor: "bg-amber-50 hover:bg-amber-100",
    iconBg: "bg-amber-800 text-white"
  },
  {
    title: "मूर्ति की बारी",
    subTitle: "Murti Bari",
    icon: "🛕",
    link: "/murti-bari",
    bgColor: "bg-red-50 hover:bg-red-100",
    iconBg: "bg-red-800 text-white"
  },
  {
    title: "संपर्क",
    subTitle: "Contact",
    icon: "📞",
    link: "/contact",
    bgColor: "bg-amber-50 hover:bg-amber-100",
    iconBg: "bg-amber-800 text-white"
  }
];

const Hero = () => {
  return (
    <div className="bg-[#fcf8f2] py-8 text-slate-800">
      
      {/* 1. HERO MAIN SECTION (Left Text + Right Durga Photo Frame) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Side Content */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-block px-3 py-1 bg-amber-100 border border-amber-300/80 rounded-full">
              <p className="text-amber-800 text-xs sm:text-sm font-bold">
                जय माता दी
              </p>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-amber-950 tracking-tight leading-tight">
              आदिशक्ति नवयुवक संघ <br />
              <span className="text-red-800">दुर्गा पूजा समिति</span>
            </h1>

            <div>
              <h2 className="text-lg sm:text-xl font-bold text-amber-900">
                पतरिहाँ (सहार, भोजपुर)
              </h2>
              <p className="text-xs font-semibold text-amber-700 tracking-wider uppercase mt-0.5">
                PATARIHAN (SAHAR, BHOJPUR) — BIHAR
              </p>
            </div>

            {/* Date Badge */}
            <div className="inline-flex items-center gap-2 bg-amber-100/70 border border-amber-300 px-3.5 py-1.5 rounded-full text-amber-900 font-medium text-xs sm:text-sm">
              <span>📅</span>
              <span>आगामी पूजा तिथि: <strong>11 अक्टूबर – 20 अक्टूबर 2026</strong></span>
            </div>

            {/* Description */}
            <div className="space-y-2 text-slate-700 text-sm sm:text-base leading-relaxed max-w-xl">
              <p className="font-medium text-amber-950">
                हर साल की भाँति इस साल भी आप सभी ग्रामवासियों एवं श्रद्धालुओं का हार्दिक अभिनंदन एवं स्वागत करती है और सदैव करती रहेगी।
              </p>
              <p className="text-slate-600 text-xs sm:text-sm">
                हमारे गांव की पावन परंपरा और माता रानी की असीम कृपा का डिजिटल लेखा-जोखा। संपूर्ण वित्तीय पारदर्शिता और ऐतिहासिक स्मृतियों का एक स्थल।
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                to="/committee"
                className="bg-red-800 hover:bg-red-900 text-white font-bold text-sm px-5 py-2.5 rounded-xl shadow-md transition-all duration-200 flex items-center gap-2"
              >
                समिति देखें / View Committee →
              </Link>
              <Link
                to="/financials"
                className="bg-white hover:bg-amber-50 text-amber-900 border border-amber-300 font-bold text-sm px-5 py-2.5 rounded-xl shadow-sm transition-all duration-200"
              >
                वित्तीय रिपोर्ट / Financial Report
              </Link>
            </div>
          </div>

          {/* Right Side Maa Durga Photo Frame */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group w-full max-w-md">
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 via-red-500 to-amber-600 rounded-3xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
              
              <div className="relative bg-amber-900 p-1.5 rounded-2xl border-2 border-amber-400/80 shadow-xl overflow-hidden">
                <img
                  src="/durga-puja.png"
                  alt="Maa Durga"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/600x400/991b1b/fef3c7?text=Maa+Durga";
                  }}
                  className="w-full h-[350px] sm:h-[390px] object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 2. "जानकारी एक जगह / QUICK INFORMATION" (6 Clickable Cards) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="mb-6 border-b border-amber-200/80 pb-3">
          <h3 className="text-xl sm:text-2xl font-extrabold text-amber-950 flex items-center gap-2">
            जानकारी एक जगह <span className="text-xs sm:text-sm font-normal text-amber-700">/ Quick information</span>
          </h3>
        </div>

        {/* 6 Clickable Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {quickLinks.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className="group flex flex-col items-center p-4 rounded-xl bg-white border border-amber-200/60 shadow-sm hover:shadow-md hover:border-amber-400 hover:-translate-y-1 transition-all duration-200 text-center"
            >
              <div className={`w-12 h-12 rounded-full ${item.iconBg} flex items-center justify-center text-xl mb-2.5 shadow-sm group-hover:scale-110 transition-transform`}>
                {item.icon}
              </div>

              <h4 className="text-sm font-bold text-slate-800 group-hover:text-red-800 transition-colors">
                {item.title}
              </h4>
              <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                {item.subTitle}
              </p>
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Hero;