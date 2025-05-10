import { Router } from "express";
import { Product } from "../../models/products/products.model.js";
import { BadRequestError } from "../../../core/errors/Errors.js";
import { upload } from "../../../config/multer/multerConfig.js";
import { validateBody } from "../../../core/middlewares/validation.middleware.js";
import { CreateProductSchema } from "./validation/validate_product.route.js";
import { authorize } from "../../../core/middlewares/authorizeUsers.middleware.js";

const router = Router();

const CreateProduct = async (req, res) => {
  try {
    const data = req.body;
    const img = req.file.path.replace(/\\/g, "/");
    const { name, price, category, description } = data;
    const existingProduct = await Product.findOne({
      is_deleted: false,
      name: name,
      price: price,
      category: category,
      description: description,
    });
    if (existingProduct) {
      existingProduct.stock = +existingProduct.stock + +data.stock;
      await existingProduct.save();
      res.status(201).json({
        message: "product created successfully",
        data: existingProduct,
      });
    } else {
      const newProduct = await Product({ ...data, image: img });

      await newProduct.save();
      if (!newProduct) throw new BadRequestError("error");

      res.status(201).json({
        message: "product created successfully",
        data: newProduct,
      });
    }
  } catch (err) {
    res.status(err.status_code || 500).json(err);
    console.log(err);
  }
};
router.post(
  "/",
  authorize(["admin"]),
  upload.single("image"),
  validateBody(CreateProductSchema),
  CreateProduct
);
export { router as CreateProductRouter };
