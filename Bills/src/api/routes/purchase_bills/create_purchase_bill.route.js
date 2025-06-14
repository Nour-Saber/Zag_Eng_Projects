import { Router } from "express";
const router = Router();
import { PurchaseBill } from "../../models/bills/purchase_bill.model.js";
import { BadRequestError } from "../../../core/errors/errors.js";
const CreatePurchaseBill = async (req, res) => {
  try {
    const data = req.body;
    const newPurchaseBill = await PurchaseBill({ ...data });
    if (!newPurchaseBill) throw BadRequestError("Bill not Created !");
    await newPurchaseBill.save();
    res.status(200).json({ data: newPurchaseBill });
  } catch (err) {
    res.status(err.status_code || 500).json({ msg: err.message });
  }
};
router.post("/", CreatePurchaseBill);
export { router as CreatePurchaseBillRouter };
