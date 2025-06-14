import { Router } from "express";
import { CreateSaleBillRouter } from "./create_sale_bill.route.js";
import { DeleteSaleBillRouter } from "./delete_sale_bill.route.js";
const router = Router();
router.use(CreateSaleBillRouter);
router.use(DeleteSaleBillRouter);
export { router as SaleBillsRouter };