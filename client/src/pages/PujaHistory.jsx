import React, { useState, useEffect } from 'react';
import { Calendar, Drama, Sparkles, User, Award, ChevronRight, Clock, Star, ShieldCheck } from 'lucide-react';
import API from '../services/api'; // Shared API instance

export default function PujaHistory() {
  const [historyList, setHistoryList] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistoryData = async () => {
      try {
        console.log("Fetching history data from backend...");
        const response = await API.get('/history');
        console.log("API Response Data:", response.data);
        
        const data = response.data;
        let parsedData = [];
        
        if (Array.isArray(data)) {
          // Flatten if items contain nested days array
          parsedData = data.flatMap(item => {
            if (item.days && Array.isArray(item.days)) {
              return item.days.map(d => ({
                ...d,
                year: item.year || d.year,
                _id: d._id || item._id
              }));
            }
            return item;
          });
        } else if (data && typeof data === 'object') {
          parsedData = Object.values(data);
        }

        setHistoryList(parsedData);

        if (parsedData.length > 0) {
          const years = parsedData.map(item => Number(item.year)).filter(y => !isNaN(y));
          if (years.length > 0) {
            setSelectedYear(Math.max(...years));
          }
        }
      } catch (error) {
        console.error("Error fetching history data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistoryData();
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center text-amber-800 font-semibold">
        इतिहास डेटा लोड हो रहा है...
      </div>
    );
  }

  const availableYears = [...new Set(historyList.map(item => Number(item.year)).filter(y => !isNaN(y)))].sort((a, b) => b - a);

  if (availableYears.length === 0 || historyList.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-8 max-w-lg mx-auto shadow-sm">
          <Drama className="w-16 h-16 text-amber-700 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">कोई इतिहास कार्यक्रम उपलब्ध नहीं है</h2>
          <p className="text-gray-600 text-sm">
            अभी एडमिन डैशबोर्ड से कोई भी नाटक या रामलीला कार्यक्रम सुरक्षित (Save) नहीं किया गया है या डेटाबेस से कनेक्ट नहीं हो पा रहा है।
          </p>
        </div>
      </div>
    );
  }

  const currentYearItems = historyList.filter(item => Number(item.year) === Number(selectedYear));

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-2 sm:px-4 py-4 font-sans">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-amber-950 via-red-950 to-amber-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl border border-amber-500/30 text-center relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
          <Drama className="w-80 h-80 text-amber-300" />
        </div>

        <div className="inline-flex items-center gap-2 bg-amber-400/20 border border-amber-400/40 text-amber-300 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-3 backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>सांस्कृतिक मंच एवं ऐतिहासिक परंपरा</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-amber-300 tracking-wide drop-shadow-lg mb-2">
          वार्षिक नाटक व रामलीला इतिहास
        </h1>
        <p className="text-amber-100 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          आदिशक्ति नवयुवक संघ (पतरिहा) द्वारा प्रस्तुत किए जाने वाले ऐतिहासिक नाटक एवं रामलीला का विवरण।
        </p>

        {/* Year Selector Tabs */}
        <div className="mt-8">
          <p className="text-amber-200/80 text-xs font-bold uppercase tracking-wider mb-3">वर्ष चुनें / Select Year</p>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {availableYears.map((yr) => (
              <button
                key={yr}
                onClick={() => setSelectedYear(yr)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm sm:text-base transition-all duration-300 shadow-md cursor-pointer ${
                  Number(selectedYear) === Number(yr)
                    ? 'bg-amber-400 text-amber-950 scale-105 shadow-amber-400/20'
                    : 'bg-black/40 hover:bg-black/60 text-amber-200 border border-amber-500/30'
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>वर्ष {yr}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      {selectedYear && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left 2 Columns */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-white p-5 rounded-2xl border border-amber-200 shadow-sm gap-4">
              <div>
                <span className="text-xs font-bold text-red-700 bg-red-50 border border-red-200 px-3 py-1 rounded-md uppercase">
                  सांस्कृतिक नाटक महोत्सव
                </span>
                <h2 className="text-2xl font-bold text-gray-900 mt-2">
                  वर्ष {selectedYear} का मंचन कार्यक्रम
                </h2>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600 bg-amber-50 p-3 rounded-xl border border-amber-200">
                <User className="w-4 h-4 text-amber-700 shrink-0" />
                <div>
                  <span className="font-semibold block text-gray-800">मंडली:</span>
                  <span>आदिशक्ति नवयुवक संघ नाट्य मंडली</span>
                </div>
              </div>
            </div>

            {/* Days Cards Grid */}
            <div className="space-y-6">
              {currentYearItems.map((day, idx) => {
                const typeVal = day.type || day.category || "";
                const isRamlila = typeVal.toLowerCase().includes("ram") || typeVal.includes("रामलीला");
                
                const dayNameVal = day.dayName || day.day || day.divas || `दिन ${idx + 1}`;
                const themeVal = day.theme || day.tihm;
                const directorVal = day.director || day.sanchalak || day.nirdeshak;
                const castVal = day.cast || day.mainCast || day.actor || day.mukhyakalakar || day.artist;
                const titleVal = day.title || day.shirshak || day.name;
                const descVal = day.desc || day.description || day.vivaran;
                const dateVal = day.date || day.tithi;

                return (
                  <div 
                    key={day._id || idx}
                    className={`rounded-2xl p-5 sm:p-6 border transition-all duration-300 shadow-sm hover:shadow-md overflow-hidden ${
                      isRamlila 
                        ? 'bg-gradient-to-r from-amber-50 via-orange-50 to-amber-100 border-amber-400/80' 
                        : 'bg-white border-amber-200/80'
                    }`}
                  >
                    {/* Event Photo Rendering */}
                    {day.photo && (
                      <div className="mb-5 overflow-hidden rounded-xl border border-amber-200 shadow-sm">
                        <img 
                          src={day.photo} 
                          alt={titleVal || "Karyakram Photo"} 
                          className="w-full h-60 sm:h-80 object-cover hover:scale-105 transition-transform duration-500"
                          onError={(e)=>{e.target.src='https://via.placeholder.com/600x400?text=Image+Not+Found'}}
                        />
                      </div>
                    )}

                    {/* Top Badges */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`px-3 py-1 rounded-lg text-xs font-extrabold uppercase ${
                          isRamlila ? 'bg-amber-600 text-white' : 'bg-red-800 text-white'
                        }`}>
                          {dayNameVal.toString().startsWith('दिन') ? dayNameVal : `दिन ${dayNameVal}`}
                        </span>
                        {dateVal && (
                          <span className="text-xs font-semibold text-gray-600 flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                            <Clock className="w-3.5 h-3.5 text-amber-700" />
                            {dateVal}
                          </span>
                        )}
                      </div>

                      <span className={`text-xs font-bold px-3 py-1 rounded-full border ${
                        isRamlila 
                          ? 'bg-amber-200 text-amber-900 border-amber-300' 
                          : 'bg-red-100 text-red-800 border-red-200'
                      }`}>
                        {typeVal || "नाटक (Drama)"}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-extrabold text-gray-900 mb-3 flex items-center gap-2">
                      {isRamlila ? <Star className="w-6 h-6 text-amber-600 fill-amber-500 shrink-0" /> : <Drama className="w-6 h-6 text-red-700 shrink-0" />}
                      <span>{titleVal || "शीर्षक उपलब्ध नहीं"}</span>
                    </h3>

                    {/* Theme & Director info grid */}
                    {(themeVal || directorVal) && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 text-xs bg-white/60 p-3 rounded-xl border border-amber-100">
                        {themeVal && (
                          <div className="flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                            <span className="font-semibold text-gray-700">थीम (Theme):</span>
                            <span className="text-gray-900 font-bold">{themeVal}</span>
                          </div>
                        )}
                        {directorVal && (
                          <div className="flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4 text-red-700 shrink-0" />
                            <span className="font-semibold text-gray-700">संचालक / निर्देशक:</span>
                            <span className="text-gray-900 font-bold">{directorVal}</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Description */}
                    {descVal && (
                      <p className="text-gray-700 text-sm leading-relaxed mb-4 whitespace-pre-line">
                        {descVal}
                      </p>
                    )}

                    {/* Main Cast footer */}
                    {castVal && (
                      <div className="pt-3 border-t border-amber-200/60 flex flex-wrap items-center gap-2 text-xs">
                        <span className="font-bold text-gray-900 flex items-center gap-1">
                          <User className="w-3.5 h-3.5 text-amber-700" /> मुख्य कलाकार (Main Cast):
                        </span>
                        <span className="text-red-900 font-semibold bg-amber-50 px-3 py-1 rounded-md border border-amber-200">
                          {castVal}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Timeline */}
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-amber-200 shadow-sm sticky top-4">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-600" />
                <span>नाट्य यात्रा टाइमलाइन</span>
              </h3>

              <div className="space-y-3">
                {availableYears.map((yr) => {
                  const isActive = Number(selectedYear) === Number(yr);
                  return (
                    <button
                      key={yr}
                      onClick={() => setSelectedYear(yr)}
                      className={`w-full text-left p-3.5 rounded-xl border transition-all duration-200 flex items-center justify-between cursor-pointer ${
                        isActive 
                          ? 'bg-gradient-to-r from-amber-900 to-red-950 text-white border-amber-500 shadow-md' 
                          : 'bg-gray-50 hover:bg-amber-50 text-gray-800 border-gray-200'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`font-bold text-sm ${isActive ? 'text-amber-300' : 'text-amber-900'}`}>
                            वर्ष {yr}
                          </span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                            isActive ? 'bg-amber-400/20 text-amber-200 border border-amber-400/30' : 'bg-gray-200 text-gray-700'
                          }`}>
                            उपलब्ध
                          </span>
                        </div>
                      </div>
                      <ChevronRight className={`w-5 h-5 ${isActive ? 'text-amber-400' : 'text-gray-400'}`} />
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 p-4 bg-amber-50 rounded-xl border border-amber-200/80 text-xs text-amber-900 leading-relaxed">
                <p className="font-bold mb-1">विशेष सूचना:</p>
                ग्राम पतरिहा में हर वर्ष शारदीय नवरात्रि के शुभ अवसर पर सांस्कृतिक कार्यक्रम का आयोजन किया जाता है।
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}