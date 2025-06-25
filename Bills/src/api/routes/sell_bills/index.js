import { Router } from "express";
import { CreateSellBillRouter } from "./create_Sell_bill.route.js";
import { GetAllSellBillsRouter } from "./get-all.route.js";
import { GetOneSellBillRouter } from "./get-one.route.js";
const router = Router();
router.use(CreateSellBillRouter);
router.use(GetAllSellBillsRouter);
router.use(GetOneSellBillRouter);
export { router as SellBillsRouter };
