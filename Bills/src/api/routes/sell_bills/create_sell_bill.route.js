import { Router } from "express";
import { SellBill } from "../../models/bills/sell_bill.model.js";
import { BadRequestError, NotFoundError } from "../../../core/errors/errors.js";
import { CacheDrawerTransaction } from "../../models/transactions/cache drawer_transaction.model.js";
import { CacheDrawer } from "../../models/cache drawer/cache drawer.model.js";
import { Product } from "../../models/product/product.model.js";
import { Client } from "../../models/client/clients.model.js";
import { Safe } from "../../models/safe/safe.model.js";

const router = Router();

const CreateSellBill = async (req, res) => {
  try {
    const data = req.body;
    const {
      products,
      date,
      clientId,
      clientName,
      clientAddress,
      clientPhone,
      total_cost,
    } = data;

    let totalPrice = 0;
    products.map((product) => (totalPrice += product.price * product.quantity));
    if (totalPrice != total_cost) throw Error("Incorrect calculations!");
    let newClient = await Client.findOne({
      _id: clientId,
      is_deleted: false,
    });
    if (clientId) {
      const existingClient = await Client.findOne({
        _id: clientId,
        is_deleted: false,
      });

      if (!existingClient) throw new NotFoundError("Client Not Found!");
    } else {
      newClient = await Client.create({
        name: clientName,
        address: clientAddress,
        phone: clientPhone,
      });
    }

    const newClientId = newClient._id;

    await Promise.all(
      products.map(async (product) => {
        const existing = await Product.findOne({
          _id: product.productId,
          is_deleted: false,
        });
        if (existing) {
          if (existing.stock > product.quantity) {
            existing.stock -= product.quantity;
            await existing.save();
          } else {
            throw new NotFoundError("Quantity is not available!");
          }
        } else throw new NotFoundError("Product not found");
      })
    );

    const newSellBill = await SellBill({ ...data } || { ...data, newClientId });
    const newCacheDrawerTransaction = await CacheDrawerTransaction({
      client: clientId || newClientId,
      date,
      cost: total_cost,
      bill: newSellBill._id,
    });
    const cache = await CacheDrawer.findOne();
    cache.balance += total_cost;
    cache.last_transaction_date = date;
    await cache.save();
    const safe = await Safe.findOne();
    safe.balance += total_cost;
    await safe.save();

    if (!newSellBill) throw new BadRequestError("Bill not created!");
    await newSellBill.save();
    await newCacheDrawerTransaction.save();
    res
      .status(200)
      .json({ msg: "bill created successfully!", data: newSellBill });
  } catch (err) {
    res.status(err.status_code || 500).json({ msg: err.message });
  }
};
router.post("/", CreateSellBill);
export { router as CreateSellBillRouter };
