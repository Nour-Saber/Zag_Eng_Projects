import { Router } from "express";
const router = Router();
import { PurchaseBill } from "../../models/bills/purchase_bill.model.js";
import { BadRequestError } from "../../../core/errors/errors.js";
import { SafeTransaction } from "../../models/transactions/safe_transactions.model.js";
import { Safe } from "../../models/safe/safe.model.js";
import { Product } from "../../models/product/product.model.js";
const CreatePurchaseBill = async (req, res) => {
  try {
    const data = req.body;
    const { products, provider, date, total_cost } = data;
    const newPurchaseBill = await PurchaseBill({ ...data });
    await Promise.all(
      products.map(async (product) => {
        const existing = await Product.findOne({
          _id: product.productId,
          is_deleted: false,
        });
        if (existing) {
          existing.stock += product.quantity;
          await existing.save();
        } else {
           await Product.create({
            name: product.name,
            description: product.description,
            stock: product.quantity,
            provider,
          });
        }
      })
    );
    const newSafeTransaction = await SafeTransaction({
      provider,
      date,
      cost: total_cost,
      bill: newPurchaseBill._id,
    });
    if (!newPurchaseBill) throw BadRequestError("Bill not Created !");
    const safe = await Safe.findOne();
    if (safe.balance >= total_cost) {
      safe.balance -= total_cost;
      await safe.save();
    } else res.status(200).json({ msg: "No enough credit!" });

    await newPurchaseBill.save();
    await newSafeTransaction.save();
    res.status(200).json({ data: newPurchaseBill });
  } catch (err) {
    res.status(err.status_code || 500).json({ msg: err.message });
  }
};
router.post("/", CreatePurchaseBill);
export { router as CreatePurchaseBillRouter };
