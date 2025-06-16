import { Router } from "express";
import { CreatePurchaseBillRouter } from "./create_purchase_bill.route.js";
import { GetAllPurchaseBillsRouter } from "./get-all.route.js";
import { GetOnePurchaseBillRouter } from "./get_one.route.js";
const router = Router();
router.use(CreatePurchaseBillRouter);
router.use(GetAllPurchaseBillsRouter);
router.use(GetOnePurchaseBillRouter);
export { router as PurchaseBillsRouter };
