import { Router } from "express";
import { SellBill } from "../../models/bills/sell_bill.model.js";
import { NotFoundError } from "../../../core/errors/errors.js";
const router = Router();
const GetOneSellBill = async (req, res) => {
  try {
    const { id } = req.params;
    const sellBill = await SellBill.findOne({ _id: id, is_deleted: false });
    if (!sellBill) throw new NotFoundError("Bill  not found !");
    res.status(200).json({ msg: "Bill found successfully!", data: sellBill });
  } catch (err) {
    res.status(err.status_code || 500).json({ msg: err.message });
  }
};
router.get("/:id", GetOneSellBill);
export { router as GetOneSellBillRouter };
