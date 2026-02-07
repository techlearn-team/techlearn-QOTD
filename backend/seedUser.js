require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const User = require("./models/User");

const seedUser = async () => {
  await connectDB();

  const existing = await User.findOne({ email: "demo@techlearn.com" });
  if (existing) {
    console.log("User already exists:", existing._id.toString());
    process.exit(0);
  }

  const user = await User.create({
    username: "demoUser",
    email: "demo@techlearn.com",
    tier: "paid", // IMPORTANT: paid so stats work
    runsUsedToday: 0,
    submittedToday: false,
    lastActiveDate: new Date().toISOString().split("T")[0]
  });

  console.log("✅ USER ID:", user._id.toString());
  process.exit(0);
};

seedUser();
