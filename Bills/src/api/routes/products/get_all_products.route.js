import { Router } from "express";
import { Product } from "../../models/product/product.model.js";
const router = Router();

const GetAllProducts = async (req, res) => {
  try {
    const products = await Product.find({ is_deleted: false });
    res.status(200).json({ data: products });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};
router.get("/", GetAllProducts);
export { router as GetAllProductsRouter };
