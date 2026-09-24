import React, { useEffect, useState } from 'react';
import { Mail, Phone, Trash2 } from 'lucide-react';

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/contact/all');
      const data = await res.json();
      setMessages(data);
    } catch (err) {
      console.error('Error fetching messages:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('क्या आप इस संदेश को डिलीट करना चाहते हैं?')) {
      try {
        const res = await fetch(`http://localhost:5000/api/contact/${id}`, {
          method: 'DELETE',
        });
        const data = await res.json();
        if (data.success) {
          setMessages(messages.filter((msg) => msg._id !== id));
        } else {
          alert('डिलीट करने में समस्या आई!');
        }
      } catch (err) {
        console.error('Error deleting message:', err);
        alert('सर्वर एरर! कृपया दोबारा प्रयास करें।');
      }
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md border border-amber-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <Mail className="w-5 h-5 text-amber-600" />
          प्राप्त संदेश एवं सुझाव ({messages.length})
        </h2>
        <button 
          onClick={fetchMessages}
          className="text-xs bg-amber-100 text-amber-800 px-3 py-1.5 rounded-lg font-semibold hover:bg-amber-200 transition"
        >
          रिफ्रेश करें
        </button>
      </div>

      {loading ? (
        <p className="text-center text-gray-500 py-8">लोड हो रहा है...</p>
      ) : messages.length === 0 ? (
        <p className="text-center text-gray-500 py-8">अभी तक कोई संदेश प्राप्त नहीं हुआ है।</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-amber-50 text-amber-900 border-b border-amber-200">
                <th className="p-3 font-bold">दिनांक</th>
                <th className="p-3 font-bold">नाम</th>
                <th className="p-3 font-bold">मोबाइल नंबर</th>
                <th className="p-3 font-bold">पता</th>
                <th className="p-3 font-bold">संदेश / सुझाव</th>
                <th className="p-3 font-bold text-center">कार्रवाई</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((msg) => (
                <tr key={msg._id} className="border-b border-gray-100 hover:bg-amber-50/50 transition">
                  <td className="p-3 text-gray-500 whitespace-nowrap">
                    {new Date(msg.createdAt).toLocaleDateString('hi-IN')}
                  </td>
                  <td className="p-3 font-bold text-gray-800">{msg.name}</td>
                  <td className="p-3 text-amber-700 font-semibold">
                    <a href={`tel:${msg.phone}`} className="hover:underline flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5" /> {msg.phone}
                    </a>
                  </td>
                  <td className="p-3 text-gray-600">{msg.address}</td>
                  <td className="p-3 text-gray-700 max-w-xs">{msg.message}</td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => handleDelete(msg._id)}
                      className="p-1.5 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
                      title="संदेश डिलीट करें"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}