import { Router } from "express";
import { Product } from "../../models/product/product.model.js";
import { NotFoundError } from "../../../core/errors/errors.js";
const router = Router();

const UpdateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const product = await Product.findOneAndUpdate(
      { _id: id, is_deleted: false },
      { ...data },
      { new: true }
    );
    if (!product) throw new NotFoundError("Product not found!");
    res
      .status(200)
      .json({ msg: "Product Updated successfully!", data: product });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
router.put("/:id", UpdateProduct);
export { router as UpdateProductRouter };
