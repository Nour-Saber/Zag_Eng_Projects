import { Router } from "express";
import { Product } from "../../models/products/products.model.js";
import { BadRequestError } from "../../../core/errors/Errors.js";
import { upload } from "../../../config/multer/multerConfig.js";

const router = Router();

const CreateProduct = async (req, res) => {
  try {

    const data = req.body;
    const img = req.file.path.replace(/\\/g, "/");
    const newProduct = await Product({ ...data , image : img});
    
    await newProduct.save();
    if (!newProduct) throw new BadRequestError("error");
    res.status(201).json({
      message:"product created successfully",
      data:newProduct
    });
  } catch (err) {
    res.status(err.status_code || 500).json({ msg: err.message  || "server error"});
  }
};
router.post("/",upload.single("image"), CreateProduct);
export { router as CreateProductRouter };
