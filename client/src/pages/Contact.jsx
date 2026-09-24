import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle2, 
  HeartHandshake, 
  Building2, 
  Users,
  MessageSquare
} from 'lucide-react';
import API from '../services/api'; // <--- Yeh humne API import kar liya hai

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.name && formData.phone && formData.message) {
      setLoading(true);
      setErrorMsg('');
      try {
        // Yahan ab humne localhost hata kar API.post use kiya hai jo automatically Render ka URL utha lega
        const response = await API.post('/contact/send', formData);

        if (response.status === 200 || response.status === 201) {
          setSubmitted(true);
          setFormData({ name: '', phone: '', address: '', message: '' });
          setTimeout(() => setSubmitted(false), 5000);
        } else {
          setErrorMsg('संदेश भेजने में समस्या आई।');
        }
      } catch (error) {
        console.error("Submit Error:", error);
        setErrorMsg('सर्वर से कनेक्ट नहीं हो सका। कृपया सुनिश्चित करें कि बैकएंड चालू है।');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 py-6 font-sans">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-red-950 via-amber-900 to-red-950 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-amber-500/30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-300 px-3 py-1 rounded-full text-xs font-semibold mb-3 border border-amber-400/30">
              <HeartHandshake className="w-3.5 h-3.5 text-amber-400" />
              <span>समिति संपर्क एवं सहायता केंद्र</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-amber-300">
              संपर्क करें / Contact Us
            </h1>
            <p className="text-amber-100/80 text-sm sm:text-base mt-1">
              आदिशक्ति नवयुवक संघ दुर्गा पूजा समिति, पतरिहाँ (सहार, भोजपुर)
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Side: Address Details */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 shadow-xl border border-amber-100 space-y-4">
            <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-amber-600" />
              पूजा स्थल एवं मुख्य पता
            </h2>

            <div className="space-y-3.5">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5 text-amber-700" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-gray-500 block">स्थान / ग्राम</span>
                  <p className="text-sm font-bold text-gray-800">
                    ग्राम व पोस्ट: पतरिहाँ, नवादा, प्रखंड: सहार, जिला: भोजपुर, बिहार - 802208
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-orange-100 text-orange-900 flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-5 h-5 text-orange-700" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-gray-500 block">दर्शन समय (दुर्गा पूजा)</span>
                  <p className="text-sm font-bold text-gray-800">प्रातः 05:00 AM से रात्रि 11:00 PM तक</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-red-100 text-red-900 flex items-center justify-center shrink-0 mt-0.5">
                  <Mail className="w-5 h-5 text-red-700" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-gray-500 block">ईमेल संपर्क</span>
                  <p className="text-sm font-bold text-gray-800">contact@patarihanpuja.org</p>
                </div>
              </div>
            </div>
          </div>

          {/* मुख्य संपर्क अधिकारी (Call Direct Click Feature) */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-6 shadow-md border border-amber-200">
            <h3 className="text-base font-bold text-amber-950 mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-amber-600" />
              मुख्य संपर्क अधिकारी
            </h3>
            <div className="space-y-3">
              <div className="bg-white p-3.5 rounded-2xl border border-amber-100 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-sm font-extrabold text-gray-900">अध्यक्ष / व्यवस्थापक</p>
                  <p className="text-xs font-medium text-gray-600">आदिशक्ति नवयुवक संघ</p>
                </div>
                
                {/* 📞 सीधे फोन डायल होने वाला बटन */}
                <a 
                  href="tel:+919693088257" 
                  className="bg-amber-500 hover:bg-amber-600 active:scale-95 text-white px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-amber-500/20"
                >
                  <Phone className="w-4 h-4" /> Call
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Message Form */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-amber-100">
          <div className="mb-6">
            <h2 className="text-2xl font-extrabold text-gray-900 flex items-center gap-2">
              <MessageSquare className="w-6 h-6 text-amber-600" />
              संदेश या सुझाव भेजें
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              फ़ॉर्म भरने के बाद आपका संदेश सुरक्षित रूप से समिति के पास जमा हो जाएगा।
            </p>
          </div>

          {submitted ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="text-lg font-bold text-emerald-900">जय माता दी! आपका संदेश सफलतापूर्वक समिति के पास जमा हो गया है।</h3>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMsg && (
                <div className="p-3 bg-red-100 text-red-700 text-sm font-semibold rounded-xl">
                  ⚠️ {errorMsg}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">आपका नाम (Name) *</label>
                  <input
                    type="text"
                    required
                    placeholder="जैसे: राहुल कुमार"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">मोबाइल नंबर (Phone Number) *</label>
                  <input
                    type="tel"
                    required
                    placeholder="जैसे: 9693088257"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">ग्राम / पता (Village / Address) *</label>
                <input
                  type="text"
                  required
                  placeholder="जैसे: पतरिहाँ, सहार"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">आपका संदेश या सुझाव (Message) *</label>
                <textarea
                  rows="4"
                  required
                  placeholder="अपना संदेश यहाँ लिखें..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-amber-500"
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full sm:w-auto px-8 py-3.5 bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-amber-500/30 transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" /> 
                {loading ? 'भेजा जा रहा है...' : 'संदेश भेजें'}
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}