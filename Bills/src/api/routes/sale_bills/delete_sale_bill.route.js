import { Router } from "express";
import { NotFoundError } from "../../../core/errors/errors.js";
import { SaleBill } from "../../models/bills/sale_bill.model.js";

const router = Router();

const DeleteSaleBill = async (req, res) => {
  try {
    const id = req.params.id;
    const saleBill = await SaleBill.findOneAndUpdate(
      { _id: id, is_deleted: false },
      { is_deleted: true }
    );
    if (!saleBill) throw new NotFoundError("Bill not found!");
    await saleBill.save();
    res.status(200).json({ msg: "Bill deleted successfully!" });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};
router.delete("/:id", DeleteSaleBill);
export { router as DeleteSaleBillRouter };
