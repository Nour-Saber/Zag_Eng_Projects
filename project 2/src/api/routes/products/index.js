import { Router } from "express";
import { GetOneProductRouter } from "./get_product.route.js";
import { CreateProductRouter } from "./create_product.route.js";
import { DeleteProductRouter } from "./delete_product.route.js";
import { UpdateProductRouter } from "./update_product.route.js";
import { GetAllProductsRouter } from "./get_all_products.route.js";
const router = Router();
router.use(DeleteProductRouter);

router.use(GetOneProductRouter);
router.use(CreateProductRouter);
router.use(UpdateProductRouter);
router.use(GetAllProductsRouter);
export { router as ProductRouter };
