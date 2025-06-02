import { Router } from "express";
import { Product } from "../../models/product/product.model.js";
import {BadRequestError} from "../../../core/errors/errors.js";
const router = Router();

const AddProduct = async (req, res) => {
  try {
    const data = req.body;
    const newProduct = await Product({ ...data });
    await newProduct.save();
    if (!newProduct) throw new BadRequestError("Product not created!");
    res
      .status(200)
      .json({ msg: "Product created successfully!", data: newProduct });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};
router.post("/", AddProduct);
export { router as AddProductRouter };
