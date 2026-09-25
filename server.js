const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

// Initialize Express App
const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: "15mb" }));
app.use(express.urlencoded({ extended: true, limit: "15mb" }));

// Serve frontend static assets (HTML, CSS, JS, images)
app.use(express.static(__dirname));

// Route Handlers
const farmerRoutes = require("./farmerRoutes");
const weatherRoutes = require("./weatherRoutes");
const diagnosisRoutes = require("./diagnosisRoutes");
const calendarRoutes = require("./calendarRoutes");
const marketRoutes = require("./marketRoutes");
const advisorRoutes = require("./advisorRoutes");
const assistantRoutes = require("./assistantRoutes");

// API Endpoints
app.use("/api/farmers", farmerRoutes);
app.use("/api/weather", weatherRoutes);
app.use("/api/diagnosis", diagnosisRoutes);
app.use("/api/calendar", calendarRoutes);
app.use("/api/market", marketRoutes);
app.use("/api/advisors", advisorRoutes);
app.use("/api/assistant", assistantRoutes);

// Health Check Endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    system: "AI Farming System - Zimbabwe",
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Serve frontend SPA at root
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// 404 Handler for undefined API routes
app.use("/api", (req, res) => {
  res.status(404).json({ error: "API endpoint not found" });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`=================================================`);
  console.log(` AI Farming System (Zimbabwe) is Live & Running!`);
  console.log(` Server URL : http://localhost:${PORT}`);
  console.log(` Health Check: http://localhost:${PORT}/api/health`);
  console.log(` Mode       : Prototype Connected (API Mode)`);
  console.log(`=================================================`);
});