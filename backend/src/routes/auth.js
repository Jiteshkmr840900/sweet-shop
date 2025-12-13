import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/index.js";

const router = express.Router();

/**
 * REGISTER
 */
router.post("/register", async(req, res) => {
    try {
        const { username, password, role } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "Username and password required" });
        }

        // 🔒 prevent duplicate users
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }

        const hash = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            password: hash,
            role: role || "user"
        });

        // ❌ never return password
        res.status(201).json({
            id: user.id,
            username: user.username,
            role: user.role
        });
    } catch (err) {
        res.status(500).json({ message: "Registration failed" });
    }
});

/**
 * LOGIN
 */
router.post("/login", async(req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "Username and password required" });
        }

        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const ok = await bcrypt.compare(password, user.password);
        if (!ok) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // 🔑 JWT secret safety check
        if (!process.env.JWT_SECRET) {
            return res.status(500).json({ message: "JWT secret not configured" });
        }

        const token = jwt.sign({ id: user.id, role: user.role },
            process.env.JWT_SECRET, { expiresIn: "1h" }
        );

        res.json({
            token,
            role: user.role
        });

    } catch (err) {
        res.status(500).json({ message: "Login failed" });
    }
});

export default router;