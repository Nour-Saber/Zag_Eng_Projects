import { Router } from "express";
import { SaleBill } from "../../models/bills/sale_bill.model.js";
import { NotFoundError } from "../../../core/errors/errors.js";
const router = Router();
const GetOneSaleBill = async (req, res) => {
  try {
    const { id } = req.params;
    const saleBill = await SaleBill.findOne({ _id: id, is_deleted: false });
    if (!saleBill) throw new NotFoundError("Bill  not found !");
    res.status(200).json({ msg: "Bill found successfully!", data: saleBill });
  } catch (err) {
    res.status(err.status_code || 500).json({ msg: err.message });
  }
};
router.get("/:id", GetOneSaleBill);
export { router as GetOneSaleBillRouter };
