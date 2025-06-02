import { Router } from "express";
import { Product } from "../../models/product/product.model.js";
import { NotFoundError } from "../../../core/errors/errors.js";
const router = Router();

const DeleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findOneAndUpdate(
      { _id: id, is_deleted: false },
      { is_deleted: true }
    );
    if (!product) throw new NotFoundError("Product not found!");
    await product.save();
    res.status(200).json({ msg: "Product deleted successfully!" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
router.delete("/:id", DeleteProduct);
export { router as DeleteProductRouter };
