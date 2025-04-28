import { NotFoundError } from "../../../core/errors/Errors.js";
import { Product } from "../../models/products/products.model.js";


import { Router } from "express";
const router = Router();
const GetOneProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findOne({_id:id , is_deleted :false});
    if (!product) throw new NotFoundError();
    res.status(200).json({ 
        data:product ,
    });
  } catch (err) {
    res.status(err.status_code || 500).json({message:err.message});
  }
};
router.get('/:id',GetOneProduct);
export { router as GetOneProductRouter };
