import { Router } from "express";
import { SellBill } from "../../models/bills/sell_bill.model.js";
const router = Router();
const GetAllSellBills = async (req, res) => {
  try {
    const SellBills = await SellBill.find();
    res.status(200).json({ data: SellBills });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
router.get("/", GetAllSellBills);
export { router as GetAllSellBillsRouter };
