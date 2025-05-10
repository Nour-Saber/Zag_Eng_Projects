import { Router } from "express";
import { AddToCartRouter } from "./add_to_cart.model.js";
import { DeleteFromCartRouter } from "./delete_from_cart.route.js";
import { getCartRouter } from "./get_cart.route.js";

const router = Router();
router.use(AddToCartRouter);
router.use(DeleteFromCartRouter);
router.use(getCartRouter);

export { router as CartRouters };
