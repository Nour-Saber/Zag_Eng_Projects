import { Router } from "express";
import { PurchaseBill } from "../../models/bills/purchase_bill.model.js";

const router = Router();
const GetAllPurchaseBills = async (req, res) => {
  try {
    const purchaseBills = await PurchaseBill.find();
    res.status(200).json({ data: purchaseBills });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
router.get("/", GetAllPurchaseBills);
export { router as GetAllPurchaseBillsRouter };
