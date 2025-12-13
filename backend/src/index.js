import dotenv from "dotenv";
dotenv.config(); // ✅ MUST be first, before any other imports

import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.js";
import sweetRoutes from "./routes/sweets.js";

const app = express();

app.use(cors());
app.use(express.json());

// quick sanity check (remove later)
console.log("JWT_SECRET loaded:", process.env.JWT_SECRET);

app.use("/api/auth", authRoutes);
app.use("/api/sweets", sweetRoutes);

app.listen(process.env.PORT || 5000, () => {
    console.log("Backend running on port", process.env.PORT || 5000);
});