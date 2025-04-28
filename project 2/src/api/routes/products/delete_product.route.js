import { NotFoundError } from "../../../core/errors/Errors.js";
import { Product } from "../../models/products/products.model.js";
import { Router } from "express";
const router = Router();

const DeleteProduct = async (req, res) => {
  try {
    const id = req.params.id;

    const product = await Product.findByIdAndUpdate(id,{is_deleted:true})
    if (!product) throw new NotFoundError();
    await product.save();
    res.status(200).json("Deleted successfully !");
  } catch (err) {
    res.status(err.status_code || 500).json(err.message);
  }
};
router.delete('/:id',DeleteProduct);
export { router as DeleteProductRouter };
