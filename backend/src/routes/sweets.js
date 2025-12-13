import { Op } from "sequelize";
import express from "express";
import { Sweet } from "../models/index.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// GET all sweets
router.get("/", auth, async(req, res) => {
    const sweets = await Sweet.findAll();
    res.json(sweets);
});

// SEARCH sweets
router.get("/search", auth, async(req, res) => {
    try {
        const { name, category, minPrice, maxPrice } = req.query;

        const where = {};

        // Name filter
        if (name) {
            where.name = {
                [Op.like]: `%${name}%` };
        }

        // Category filter
        if (category) {
            where.category = {
                [Op.like]: `%${category}%` };
        }

        // ✅ PRICE FILTER (FIXED)
        if (minPrice || maxPrice) {
            where.price = {};

            if (minPrice) {
                where.price[Op.gte] = Number(minPrice);
            }

            if (maxPrice) {
                where.price[Op.lte] = Number(maxPrice);
            }
        }

        const sweets = await Sweet.findAll({ where });
        res.json(sweets);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Search failed" });
    }
});


// ADD sweet (ADMIN)
router.post("/", auth, async(req, res) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Admin only" });
    }

    const { name, category, price, quantity } = req.body;

    const sweet = await Sweet.create({
        name,
        category,
        price,
        quantity,
    });

    res.json(sweet);
});

export default router;