import { Router } from "express";
import { SaleBill } from "../../models/bills/sale_bill.model.js";
const router = Router();
const GetAllSaleBills = async (req, res) => {
  try {
    const saleBills = await SaleBill.find();
    res.status(200).json({ data: saleBills });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
router.get("/", GetAllSaleBills);
export { router as GetAllSaleBillsRouter };
