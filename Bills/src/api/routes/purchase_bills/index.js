import { Router } from "express";
import { CreatePurchaseBillRouter } from "./create_purchase_bill.route.js";
import { DeletePurchaseBillRouter } from "./delete_purchase_bill.route.js";
const router = Router();
router.use(CreatePurchaseBillRouter);
router.use(DeletePurchaseBillRouter)
export { router as PurchaseBillsRouter };
