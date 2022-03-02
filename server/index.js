import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db/db.js";

// Api routes
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/users.routes.js";
import productRoutes from "./routes/product.routes.js";

// App config
const app = express();
dotenv.config();
const port = process.env.PORT || 8080;
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Api endpoints
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

// Listener
app.listen(port, () => console.log(`Start listening in port ${port}`));
