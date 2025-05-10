import { Router } from "express";
import { CreateOrderRouter } from "./create_order.route.js";
import { GetAllordersRouter } from "./get_all_orders.route.js";
import { GetMyOrdersRouter } from "./get_my_orders.route.js";

const router = Router();
router.use(CreateOrderRouter);
router.use(GetMyOrdersRouter);
router.use(GetAllordersRouter);
export { router as orderRouters };
