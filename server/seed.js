import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import connectDB from './config/db.js';

import User from './models/User.js';
import PujaYear from './models/PujaYear.js';
import CommitteeMember from './models/CommitteeMember.js';
import Income from './models/Income.js';
import Expense from './models/Expense.js';
import MurtiBari from './models/MurtiBari.js';
import Gallery from './models/Gallery.js';

dotenv.config();

const seedData = async () => {
  await connectDB();
  try {
    await User.deleteMany();
    await PujaYear.deleteMany();
    await CommitteeMember.deleteMany();
    await Income.deleteMany();
    await Expense.deleteMany();
    await MurtiBari.deleteMany();
    await Gallery.deleteMany();

    // Admin User (Fixed: using passwordHash instead of password)
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash('admin123', salt);
    await User.create({
      name: 'Pujari Admin',
      email: 'admin@durgapuja.com',
      passwordHash: hash,
      role: 'admin'
    });

    // Years
    await PujaYear.create([
      { year: 2026, pujaDate: '11 Oct - 20 Oct 2026', description: 'Annual 2026 Celebration', isCurrent: true },
      { year: 2025, pujaDate: '29 Sep - 08 Oct 2025', description: 'Grand 2025 Festival', isCurrent: false },
      { year: 2024, pujaDate: '09 Oct - 13 Oct 2024', description: 'Historic 2024 Celebration', isCurrent: false }
    ]);

    // Committee Members 2026 (7 Core Members)
    await CommitteeMember.create([
      { name: 'Rameshwar Sharma', position: 'अध्यक्ष / President', responsibility: 'Overall Governance', phone: '+91 9876543210', year: 2026, order: 1, photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300' },
      { name: 'Sanjay Kumar Verma', position: 'सचिव / Secretary', responsibility: 'Execution & Events', phone: '+91 9876543211', year: 2026, order: 2, photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300' },
      { name: 'Amitabh Gupta', position: 'कोषाध्यक्ष / Treasurer', responsibility: 'Financial Records', phone: '+91 9876543212', year: 2026, order: 3, photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300' },
      { name: 'Rajesh Mishra', position: 'सदस्य / Member', responsibility: 'Pandal Management', phone: '+91 9876543213', year: 2026, order: 4, photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300' },
      { name: 'Sunil Prasad', position: 'सदस्य / Member', responsibility: 'Prasad & Bhandara', phone: '+91 9876543214', year: 2026, order: 5, photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300' },
      { name: 'Vikas Kumar', position: 'सदस्य / Member', responsibility: 'Cultural Program', phone: '+91 9876543215', year: 2026, order: 6, photo: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=300' },
      { name: 'Manoj Singh', position: 'सदस्य / Member', responsibility: 'Decoration & Lights', phone: '+91 9876543216', year: 2026, order: 7, photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300' }
    ]);

    // Financial Records 2026 (Updated with category)
    await Income.create([
      { year: 2026, category: 'Donation', source: 'Chanda Collection', donorName: 'Gram Niwasi Collective', amount: 120000, description: 'Door-to-door village donation' },
      { year: 2026, category: 'Sponsorship', source: 'Sponsorship', donorName: 'Local Hardware Store', amount: 25000, description: 'Banner sponsorship' },
      { year: 2026, category: 'Donation', source: 'Special Donation', donorName: 'Choudhary Family', amount: 15000, description: 'Bhandara contribution' }
    ]);

    await Expense.create([
      { year: 2026, category: 'Murti / idol', amount: 35000, paidTo: 'Sculptor Ramu Pal', description: 'Maa Durga Prattima Making Advance' },
      { year: 2026, category: 'Pandal & Decoration', amount: 55000, paidTo: 'Star Tent House', description: 'Main Pandal Structure & Seating' },
      { year: 2026, category: 'Lighting & Sound', amount: 20000, paidTo: 'Raja Sound System', description: 'Dhak & Sound setup for 5 days' },
      { year: 2026, category: 'Puja Samagri', amount: 15500, paidTo: 'Panditji Store', description: 'Havan & Archana materials' }
    ]);

    // Murti Bari History
    await MurtiBari.create([
      { year: 2025, familyName: 'Sharma Parivar', address: 'Main Chowk Ward 2', status: 'Completed', notes: 'Successfully hosted with full devotional splendor.' },
      { year: 2026, familyName: 'Verma Parivar', address: 'Near Shiv Mandir', status: 'Current', notes: 'Host family for current year 2026 Puja Murti.' },
      { year: 2027, familyName: 'Singh Parivar', address: 'East Tola', status: 'Upcoming', notes: 'Nominated Host Family for 2027 Puja.' },
      { year: 2028, familyName: 'Gupta Parivar', address: 'Station Road', status: 'Upcoming', notes: 'Reserved for 2028.' }
    ]);

    // Gallery Initial Data
    await Gallery.create([
      { year: 2026, category: 'Maa Durga', imageUrl: 'https://images.unsplash.com/photo-1600100397608-f010e423b971?w=800', title: 'Maa Durga Pratima 2026', description: 'Divine Murti Darshan' },
      { year: 2026, category: 'Pandal', imageUrl: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=800', title: 'Grand Gate Setup', description: 'Illuminated Pandal Entry' },
      { year: 2025, category: 'Cultural Program', imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800', title: 'Aarti & Bhajan Evening', description: 'Devotees participating in Aarti' }
    ]);

    console.log('Sample Data Seeded Successfully!');
    process.exit();
  } catch (err) {
    console.error(`Seeding Failed: ${err.message}`);
    process.exit(1);
  }
};

seedData();