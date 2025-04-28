import { Router } from "express";
import { Product } from "../../models/products/products.model.js";
import { NotFoundError } from "../../../core/errors/Errors.js";

const router = Router();

const UpdateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const product = await Product.findOneAndUpdate(
      { _id: id, is_deleted: false },
      { ...data }
    );
    if (!product) throw new NotFoundError();
    await product.save();
    res.status(200).json({
      data: product,
    });
  } catch (err) {
    res.status(err.status_code).json({
      message: err.message,
    });
  }
};
router.put("/:id", UpdateProduct);
export { router as UpdateProductRouter };
