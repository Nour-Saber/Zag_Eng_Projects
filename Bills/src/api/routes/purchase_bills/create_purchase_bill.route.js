import { Router } from "express";
const router = Router();
import { PurchaseBill } from "../../models/bills/purchase_bill.model.js";
import { BadRequestError } from "../../../core/errors/errors.js";
import { SafeTransaction } from "../../models/transactions/safe_transactions.model.js";
import { Safe } from "../../models/safe/safe.model.js";
const CreatePurchaseBill = async (req, res) => {
  try {
    const data = req.body;
    const { provider, date, total_cost } = data;
    const newPurchaseBill = await PurchaseBill({ ...data });
    const newSafeTransaction = await SafeTransaction({
      provider,
      date,
      cost: total_cost,
      bill: newPurchaseBill._id,
    });
    if (!newPurchaseBill) throw BadRequestError("Bill not Created !");
    await newPurchaseBill.save();
    await newSafeTransaction.save();
    res.status(200).json({ data: newPurchaseBill });
  } catch (err) {
    res.status(err.status_code || 500).json({ msg: err.message });
  }
};
router.post("/", CreatePurchaseBill);
export { router as CreatePurchaseBillRouter };
