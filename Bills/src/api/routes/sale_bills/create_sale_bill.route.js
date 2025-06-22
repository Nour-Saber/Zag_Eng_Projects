import { Router } from "express";
import { SaleBill } from "../../models/bills/sale_bill.model.js";
import { BadRequestError, NotFoundError } from "../../../core/errors/errors.js";
import { CacheDrawerTransaction } from "../../models/transactions/cache drawer_transaction.model.js";
import { CacheDrawer } from "../../models/cache drawer/cache drawer.model.js";
import { Product } from "../../models/product/product.model.js";
import { Safe } from "../../models/safe/safe.model.js";
const router = Router();
const CreateSaleBill = async (req, res) => {
  try {
    const data = req.body;
    const newSaleBill = await SaleBill({ ...data });
    const { products, date, client, total_cost } = data;
    await Promise.all(
      products.map(async (product) => {
        const existing = await Product.findOne({
          _id: product.productId,
          is_deleted: false,
        });
        if (existing){ 
          if(existing.stock>product.quantity)
          {
          existing.stock -= product.quantity;
          await existing.save();
          }
          else
          {
            throw new NotFoundError("Quantity is not available!")
          }
        }

        else throw new NotFoundError("Product not found");
      })
    );
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
    const safe = await Safe.findOne();
    safe.balance+=total_cost;
    await safe.save();
    

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
