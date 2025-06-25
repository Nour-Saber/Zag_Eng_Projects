import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";

import "dotenv/config";
import { ClientRouter } from "./api/routes/client/index.js";
import { productRouter } from "./api/routes/products/index.js";
import { ProviderRouter } from "./api/routes/provider/index.js";
import { PurchaseBillsRouter } from "./api/routes/purchase_bills/index.js";
import { SellBillsRouter } from "./api/routes/sell_bills/index.js";
import { CacheDrawerRouter } from "./api/routes/safe_and_cache/get_cache_drawer.route.js";
import { SafeRouter } from "./api/routes/safe_and_cache/get_safe.route.js";
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
app.use("/client", ClientRouter);
app.use("/product", productRouter);
app.use("/provider", ProviderRouter);
app.use("/purchase_bill", PurchaseBillsRouter);
app.use("/sell_bill", SellBillsRouter);
app.use("/cache", CacheDrawerRouter);
app.use("/safe", SafeRouter);
