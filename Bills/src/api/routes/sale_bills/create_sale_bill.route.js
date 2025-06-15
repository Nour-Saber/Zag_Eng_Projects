import { Router } from "express";
import { SaleBill } from "../../models/bills/sale_bill.model.js";
import { BadRequestError } from "../../../core/errors/errors.js";
import { CacheDrawerTransaction } from "../../models/transactions/cache drawer_transaction.model.js";
import { CacheDrawer } from "../../models/cache drawer/cache drawer.model.js";
const router = Router();
const CreateSaleBill = async (req, res) => {
  try {
    const data = req.body;
    const newSaleBill = await SaleBill({ ...data });
    const { date, client, total_cost } = data;
    const newCacheDrawerTransaction = await CacheDrawerTransaction({
      client,
      date,
      cost: total_cost,
      bill: newSaleBill._id,
    });
    const cache = await CacheDrawer.findOne();
    cache.balance += total_cost;
    cache.last_transaction_date = date;
    await cache.save();

    if (!newSaleBill) throw new BadRequestError("Bill not created!");
    await newSaleBill.save();
    await newCacheDrawerTransaction.save();
    res
      .status(200)
      .json({ msg: "bill created successfully!", data: newSaleBill });
  } catch (err) {
    res.status(err.status_code || 500).json({ msg: err.message });
  }
};
router.post("/", CreateSaleBill);
export { router as CreateSaleBillRouter };
