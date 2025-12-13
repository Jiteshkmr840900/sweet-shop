import request from "supertest";
import express from "express";
import dotenv from "dotenv";
import sweetRoutes from "../src/routes/sweets.js";
import authRoutes from "../src/routes/auth.js";
import sequelize from "../src/config.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/sweets", sweetRoutes);

let token;

beforeAll(async() => {
    await sequelize.sync({ force: true });

    // Create admin user
    await request(app)
        .post("/api/auth/register")
        .send({
            username: "admin",
            password: "admin123",
            role: "admin"
        });

    // Login
    const res = await request(app)
        .post("/api/auth/login")
        .send({
            username: "admin",
            password: "admin123"
        });

    token = res.body.token;
});

afterAll(async() => {
    await sequelize.close();
});

describe("Sweet API Tests", () => {
    test("Create a sweet (authorized)", async() => {
        const res = await request(app)
            .post("/api/sweets")
            .set("Authorization", `Bearer ${token}`)
            .send({
                name: "Rasgulla",
                category: "Milk",
                price: 20,
                quantity: 50
            });

        expect(res.statusCode).toBe(200);
        expect(res.body.name).toBe("Rasgulla");
    });

    test("Get all sweets (public)", async() => {
        const res = await request(app).get("/api/sweets");
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
    });

    test("Update a sweet (authorized)", async() => {
        const sweets = await request(app).get("/api/sweets");
        const id = sweets.body[0].id;

        const res = await request(app)
            .put(`/api/sweets/${id}`)
            .set("Authorization", `Bearer ${token}`)
            .send({ price: 25 });

        expect(res.statusCode).toBe(200);
    });

    test("Delete a sweet (authorized)", async() => {
        const sweets = await request(app).get("/api/sweets");
        const id = sweets.body[0].id;

        const res = await request(app)
            .delete(`/api/sweets/${id}`)
            .set("Authorization", `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
    });

    test("Reject sweet creation without token", async() => {
        const res = await request(app)
            .post("/api/sweets")
            .send({
                name: "Ladoo",
                category: "Festival",
                price: 15,
                quantity: 30
            });

        expect(res.statusCode).toBe(401);
    });
});