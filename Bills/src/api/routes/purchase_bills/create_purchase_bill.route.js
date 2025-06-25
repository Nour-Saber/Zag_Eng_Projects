import { Router } from "express";
import { PurchaseBill } from "../../models/bills/purchase_bill.model.js";
import { BadRequestError, NotFoundError } from "../../../core/errors/errors.js";
import { SafeTransaction } from "../../models/transactions/safe_transactions.model.js";
import { Safe } from "../../models/safe/safe.model.js";
import { Product } from "../../models/product/product.model.js";
import { Provider } from "../../models/provider/providers.model.js";

const router = Router();

const CreatePurchaseBill = async (req, res) => {
  try {
    const data = req.body;
    const {
      products,
      providerId,
      providerName,
      providerAddress,
      providerPhone,
      date,
      total_cost,
    } = data;

    

    let totalPrice=0;
    products.map((product) => (totalPrice += product.price*product.quantity));
    if (totalPrice != total_cost)
       throw Error ("Incorrect calculations!");



    await Promise.all(
      products.map(async (product) => {
        if (product.productId) {
          const existing = await Product.findOne({
            _id: product.productId,
            is_deleted: false,
          });
          if (existing) {
            existing.stock += product.quantity;
            await existing.save();
          } else {
            throw new NotFoundError("Product not found!");
          }
        } else {
          await Product.create({
            name: product.name,
            description: product.description,
            stock: product.quantity,
            providerId,
          });
        }
      })
    );



    const existingProvider = await Provider.findOne({
      _id: providerId,
      is_deleted: false,
    });
    if (!existingProvider) {
      await Provider.create({name: providerName,address: providerAddress, phone:providerPhone });
    }

    const safe = await Safe.findOne();
    if (safe.balance >= total_cost) {
      safe.balance -= total_cost;
      await safe.save();
    } else res.status(200).json({ msg: "No enough credit!" });


    const newPurchaseBill = await PurchaseBill({ ...data });
    const newSafeTransaction = await SafeTransaction({
      provider: providerId,
      bill: newPurchaseBill._id,
      cost: total_cost,
      date,
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
