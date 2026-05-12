import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRouter from "./Routes/userDataRoutes.js";
import adminRouter from "./Routes/adminDataRoutes.js";
import customerRoute from "./Routes/customerRoute.js";
import adminProductRouter from "./Routes/adminProductRoute.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use(
  cors()
);

app.use(cookieParser());

// MongoDB Connection
mongoose
  .connect(process.env.mongoURI)
  .then(() => {
    console.log("MongoDB Connected Successfully");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send("Backend Running");
});

// Routes
app.use("/api/v1", authRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/customer", customerRoute);
app.use("/api/v1/product", adminProductRouter);

// IMPORTANT
export default app;
