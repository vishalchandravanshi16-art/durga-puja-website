import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from './models/User.js';

const MONGO_URI = 'mongodb+srv://vishalchandravanshi16_db_user:Vishal9693@cluster0.gbz68yz.mongodb.net/durga_puja_db?retryWrites=true&w=majority';

async function createAdmin() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB कनेक्शन सफल!");

    await User.deleteMany({ email: "vishal@gmail.com" });

    const hashedPassword = await bcrypt.hash("vishalpassword123", 10);

    const newAdmin = new User({
      name: "Vishal Admin",
      email: "vishal@gmail.com",
      passwordHash: hashedPassword,
      role: "admin"
    });

    await newAdmin.save();
    console.log("🎉 एडमिन अकाउंट (passwordHash के साथ) सफलतापूर्वक बन गया!");
    process.exit(0);
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
}

createAdmin();