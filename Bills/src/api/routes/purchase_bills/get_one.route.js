import { Router } from "express";
import { PurchaseBill } from "../../models/bills/purchase_bill.model.js";
import { NotFoundError } from "../../../core/errors/errors.js";
const router = Router();
const GetOnePurchaseBill = async (req, res) => {
  try {
    const { id } = req.params;
    const purchaseBill = await PurchaseBill.findOne({
      _id: id,
      is_deleted: false,
    });
    if (!purchaseBill) throw new  NotFoundError("Bill  not found !");
    res
      .status(200)
      .json({ msg: "Bill found successfully!", data: purchaseBill });
  } catch (err) {
    res.status(err.status_code || 500).json({ msg: err.message });
  }
};
router.get("/:id", GetOnePurchaseBill);
export { router as GetOnePurchaseBillRouter };
