require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to Database
connectDB();

// Route Imports
const qotdRoutes = require("./routes/qotd");
const submitRoutes = require("./routes/submit");
const leaderboardRoutes = require("./routes/leaderboard");
const authRoutes = require("./routes/auth");
const runRoutes = require("./routes/run");
const solutionRoutes = require("./routes/solution");
const statsRoutes = require("./routes/stats");

// Routes
app.use("/api/qotd", qotdRoutes);
app.use("/api/submit", submitRoutes);
app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/run", runRoutes);
app.use("/api/solution", solutionRoutes);
app.use("/api/stats", statsRoutes);

// Health Check (important for deployment)
app.get("/", (req, res) => {
  res.status(200).json({
    message: "QOTD Team Backend API is live",
    status: "Healthy"
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Server Error",
    message: err.message
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
