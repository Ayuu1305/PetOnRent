import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import paymentRoutes from "./routes/paymentRoutes.js";
import adminRoutes from "./routes/adminRoutes.js"; // ✅ Import Admin Routes
import petRoutes from "./routes/petRoutes.js"; // ✅ Import Public Pet Routes

dotenv.config();

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Register Routes
app.use("/api/payment", paymentRoutes);
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use("/api/admin", adminRoutes); // ✅ This already includes pet management
console.log("✅ Admin routes loaded");
app.use("/api", petRoutes); // Public pet routes


const PORT = process.env.PORT || 5000;

// ✅ Error Handling for Crashes
process.on("uncaughtException", (err) => {
  console.error("❌ Uncaught Exception:", err);
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("❌ Unhandled Rejection:", reason);
  process.exit(1);
});

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { dbName: "petOnRent" })
  .then(() => {
    console.log("✅ MongoDB connected successfully!");
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });
