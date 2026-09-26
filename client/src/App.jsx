import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Committee from './pages/Committee';
import FinancialReport from './pages/FinancialReport';
import MurtiBari from './pages/MurtiBari';
import Gallery from './pages/Gallery';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import PujaHistory from './pages/PujaHistory';
import Contact from './pages/Contact';
import { AuthProvider } from './context/AuthContext';

const ProtectedRoute = ({ element }) => {
  const token = localStorage.getItem('token');
  return token ? element : <Navigate to="/login" replace />;
};

export default function App() {
  const isAdminLoggedIn = !!localStorage.getItem('token');

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col justify-between bg-[#FAF8F5]">
          <Navbar />
          <main className="flex-grow py-8 px-2 sm:px-6">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/committee" element={<Committee />} />
              <Route path="/financials" element={<FinancialReport />} />
              <Route path="/history" element={<PujaHistory isAdmin={isAdminLoggedIn} />} />
              <Route path="/murti-bari" element={<MurtiBari />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin" element={<ProtectedRoute element={<AdminDashboard />} />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}