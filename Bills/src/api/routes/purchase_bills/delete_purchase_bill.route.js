import { Router } from "express";
import { NotFoundError } from "../../../core/errors/errors.js";
import { PurchaseBill } from "../../models/bills/purchase_bill.model.js";

const router = Router();

const DeletePurchaseBill = async (req, res) => {
  try {
    const id = req.params.id;
    const purchaseBill = await PurchaseBill.findOneAndUpdate(
      { _id: id, is_deleted: false },
      { is_deleted: true }
    );
    if (!purchaseBill) throw new NotFoundError("Bill not found!");
    await purchaseBill.save();
    res.status(200).json({ msg: "Bill deleted successfully!" });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};
router.delete("/:id", DeletePurchaseBill);
export { router as DeletePurchaseBillRouter };
