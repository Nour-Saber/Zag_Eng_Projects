import { Router } from "express";
import { NotFoundError } from "../../../core/errors/Errors.js";
import { Product } from "../../models/products/products.model.js";

const router = Router();
const GetAllProducts = async (req, res) => {
  try {
    const query = buildQuery(req);
    const products = await Product.find(query);
    if (!products) throw new NotFoundError("Products not found!");
    res
      .status(200)
      .json({ message: "products found successfully!", data: products });
  } catch (err) {
    res.status(err.staus_code || 500).json({ message: err.message });
  }
};
const buildQuery = (req) => {
  const { name, category, brand, minPrice, maxPrice, startDate, endDate } =
    req.query;
  const query = {
    ...(name && { name: { $regex: name, $options: "i" } }),
    ...(category && { category: category }),
    ...(brand && { brand: brand }),
    ...(maxPrice && { price: { $lte: maxPrice } }),
    ...(minPrice && { price: { $gte: minPrice } }),
    ...(startDate && { createdAt: { $gte: startDate } }),
    ...(endDate && { createdAt: { $lte: endDate } }),
    is_deleted: false,
  };
  return query;
};
router.get("/", GetAllProducts);
export { router as GetAllProductsRouter };
