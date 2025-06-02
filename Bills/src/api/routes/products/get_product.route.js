import { Router } from "express";
import { Product } from "../../models/product/product.model.js";
import { NotFoundError } from "../../../core/errors/errors.js";
const router = Router();

const GetOneProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findOne({ _id: id, is_deleted: false });
    if (!product) throw new NotFoundError("product not found!");
    res.status(200).json({ msg: "Product found successfully!", data: product });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
router.get("/:id", GetOneProduct);
export { router as GetOneProductRouter };
