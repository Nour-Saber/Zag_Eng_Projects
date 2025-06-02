import { Router } from "express";
import { AddProductRouter } from "./add_product.route.js";
import { GetOneProductRouter } from "./get_product.route.js";
import { GetAllProductsRouter } from "./get_all_products.route.js";
import { DeleteProductRouter } from "./delete_product.route.js";
import { UpdateProductRouter } from "./update_product.route.js";

const router = Router();

router.use(AddProductRouter);
router.use(DeleteProductRouter);
router.use(UpdateProductRouter);
router.use(GetOneProductRouter);
router.use(GetAllProductsRouter);
export { router as productRouter };
