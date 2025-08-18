import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/authRouter.js";
import productRouter from "./routes/productRoutes.js";

dotenv.config();
const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected"));

app.use("/api/auth", authRouter);
app.use("/api/product",productRouter);

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
