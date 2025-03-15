import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import { bookRouters } from "./routes/book.routs.js";
import morgan from "morgan";

import { logger } from "./middlewares/custome.middleware.js";

import { authRouter } from "./routes/auth.route.js";

const app = express();
app.listen(process.env.PORT, () => {
  console.log(`Listening ON PORT ${process.env.PORT}`);
});
const connectToDb = async () => {
  try {
    const Uri = process.env.MONGO_URI;
    await mongoose.connect(Uri);
    console.log("Database connected");
  } catch (error) {
    console.log(error);
  }
};

connectToDb();
app.use(morgan("dev"));
app.use(express.json());
app.use(logger);
app.use("/books", bookRouters);
app.use("/auth", authRouter);
