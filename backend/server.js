require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const impactRoutes = require("./routes/impactRoutes");
const modelSuggestionRoutes = require("./routes/modelSuggestionRoutes");
const userRoutes = require("./routes/userRoutes");
const userSustainabilityRoutes = require("./routes/userSustainabilityRoutes");
const promptOptimizerRoutes = require("./routes/promptOptimizerRoutes");
const enterpriseRoutes = require("./routes/enterpriseRoutes");







const app = express();

// DB connection
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("CarbonLensAI backend is running");
});

// API routes
app.use("/api", impactRoutes);
app.use("/api", modelSuggestionRoutes);
app.use("/api", userRoutes);
app.use("/api", userSustainabilityRoutes);
app.use("/api", promptOptimizerRoutes);
app.use("/api", enterpriseRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
