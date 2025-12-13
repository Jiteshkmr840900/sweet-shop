import request from "supertest";
import express from "express";
import dotenv from "dotenv";
import authRoutes from "../src/routes/auth.js";
import sequelize from "../src/config.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use("/api/auth", authRoutes);

beforeAll(async() => {
    await sequelize.sync({ force: true });
});

afterAll(async() => {
    await sequelize.close();
});

describe("Auth API Tests", () => {
    test("Register a new user", async() => {
        const res = await request(app)
            .post("/api/auth/register")
            .send({
                username: "testuser",
                password: "password123",
                role: "admin"
            });

        expect(res.statusCode).toBe(200);
        expect(res.body.username).toBe("testuser");
    });

    test("Login with valid credentials", async() => {
        const res = await request(app)
            .post("/api/auth/login")
            .send({
                username: "testuser",
                password: "password123"
            });

        expect(res.statusCode).toBe(200);
        expect(res.body.token).toBeDefined();
    });

    test("Login fails with wrong password", async() => {
        const res = await request(app)
            .post("/api/auth/login")
            .send({
                username: "testuser",
                password: "wrongpass"
            });

        expect(res.statusCode).toBe(400);
    });
});