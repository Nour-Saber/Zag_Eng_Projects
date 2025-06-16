import { Router } from "express";
import { CreateSaleBillRouter } from "./create_sale_bill.route.js";
import { GetAllSaleBillsRouter } from "./get-all.route.js";
import { GetOneSaleBillRouter } from "./get-one.route.js";
const router = Router();
router.use(CreateSaleBillRouter);
router.use(GetAllSaleBillsRouter);
router.use(GetOneSaleBillRouter);
export { router as SaleBillsRouter };
