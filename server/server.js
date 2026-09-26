import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';

import authRoutes from './routes/authRoutes.js';
import memberRoutes from './routes/memberRoutes.js';
import yearRoutes from './routes/yearRoutes.js';
import incomeRoutes from './routes/incomeRoutes.js';
import expenseRoutes from './routes/expenseRoutes.js';
import murtiBariRoutes from './routes/murtiBariRoutes.js';
import galleryRoutes from './routes/galleryRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import historyRoutes from './routes/historyRoutes.js';

dotenv.config();
connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// CORS configuration fix
app.use(cors({
  origin: true,
  credentials: true
}));

app.use(express.json());

// Routes Mapping
app.use('/api/auth', authRoutes);

// Committee / Members routes ke liye dono variations map kiye hain taaki 404 error na aaye
app.use('/api/members', memberRoutes);
app.use('/api/committee', memberRoutes);

app.use('/api/years', yearRoutes);

// Income routes ke liye dono variations (income aur incomes) map kar diye hain
app.use('/api/income', incomeRoutes);
app.use('/api/incomes', incomeRoutes);

app.use('/api/expenses', expenseRoutes);

// Murti Bari Routes
app.use('/api/murti-bari', murtiBariRoutes);
app.use('/api/murtibari', murtiBariRoutes);

// Gallery, Contact & History Routes
app.use('/api/gallery', galleryRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/history', historyRoutes);

// ---------------------------------------------------------
// SINGLE LINK SETUP: Serve React Frontend in Production
// ---------------------------------------------------------
const frontendBuildPath = path.join(__dirname, '../client/dist');
app.use(express.static(frontendBuildPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(frontendBuildPath, 'index.html'));
});
// ---------------------------------------------------------

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});