import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import "dotenv/config";
import { ProductRouter} from "./api/routes/products/index.js";
import { categoryRouter } from "./api/routes/categories/index.js";
import { usersRouter } from "./api/routes/auth/index.js";
import path from 'path';
import { fileURLToPath } from "url";
import { CartRouters } from "./api/routes/carts/index.js";
import { authenticateToken } from "./core/middlewares/authenticateToken.middleware.js";

const ___filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(___filename);
const app = express();
app.listen(process.env.PORT, () => {
  console.log(`running on port ${process.env.PORT}`);
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
app.use('/auth',usersRouter);
app.use(authenticateToken);
app.use('/public',express.static(path.join(__dirname,'../public')));
app.use("/products", ProductRouter);
app.use('/category',categoryRouter);
app.use('/cart',CartRouters);

