import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";

import "dotenv/config";
import { ClientRouter } from "./api/routes/client/index.js";
import { productRouter } from "./api/routes/products/index.js";
import { ProviderRouter } from "./api/routes/provider/index.js";
const app = express();

app.listen(process.env.PORT, () => {
  console.log(`Listen on port ${process.env.PORT}`);
});
const connectToDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    await mongoose.connect(uri);
    console.log("connected to DB !");
  } catch (err) {
    console.log(err.message);
  }
};
connectToDB();
app.use(morgan("dev"));
app.use(express.json());
app.use('/client',ClientRouter);
app.use('/product',productRouter);
app.use('/provider',ProviderRouter)
