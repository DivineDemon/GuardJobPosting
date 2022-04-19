import mysql from "mysql";
import express from "express";
import cors from "cors";
import "dotenv/config";
import { connection } from "./db.js";

// Importing Routes
import { router as guardRoute } from "./routes/guard.js";

// Initializing Express App
const app = express();

// Middleware
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use("/guards", guardRoute);

// Starting the App
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server Running on Port: ${PORT}`));
