import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAdmin } from '../services/api'; // Yaha path theek kar diya gaya hai

export default function Login({ setAuthToken }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    try {
      const res = await loginAdmin({ email, password });
      
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      
      if (setAuthToken) setAuthToken(res.data.token);
      
      navigate('/admin');
    } catch (err) {
      console.error('Login Frontend Error:', err);
      setErrorMsg(err.response?.data?.message || 'Galat Email ya Password hai! Kripya dubara koshish karein.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Admin Login</h2>
        {errorMsg && <p className="text-xs font-bold mb-4 text-rose-600 bg-rose-50 p-2 rounded">{errorMsg}</p>}
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Email Address</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="w-full border p-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-600" 
              required 
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="w-full border p-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-600" 
              required 
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-red-600 text-white py-2.5 rounded-lg font-bold text-sm hover:bg-red-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}