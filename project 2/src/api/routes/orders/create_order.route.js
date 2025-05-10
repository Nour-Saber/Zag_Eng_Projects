import { Router } from "express";
import { Order } from "../../models/orders/order.model.js";
import { Cart } from "../../models/carts/cart.model.js";

import { Product } from "../../models/products/products.model.js";
import { BadRequestError, NotFoundError } from "../../../core/errors/Errors.js";

const router = Router();
const CreateOrder = async (req, res) => {
  try {
    const user = req.user;
    const { address } = req.body;
    const userCart = await Cart.findOne({
      user_id: user._id,
      is_deleted: false,
    });
    if (!userCart) throw new NotFoundError("Cart not found!");

    if (userCart.items.length === 0) throw new NotFoundError("Cart is empty!");
    const products = await Product.find({
      is_deleted: false,
      _id: { $in: userCart.items.map((item) => item.product) },
    });
    // products.forEach(async (prod) =>
    for (const prod of products) {
      const cartItem = userCart.items.find(
        (item) => item.product.toString() === prod._id.toString()
      );

      if (prod.stock < cartItem.quantity)
        throw new BadRequestError(`Product ${prod.name} is out of stock!`);
      prod.stock -= cartItem.quantity;
      await prod.save();
    }
    const newOrder = await Order({
      user: user._id,
      items: userCart.items,
      address: address,
    });
    await newOrder.save();
    res.status(200).json({
      message: "Order created successfully !",
      data: newOrder,
    });
  } catch (err) {
    res
      .status(err.status_code || 500)
      .json({ msg: err.message || "something went wrong!" });
  }
};
router.post("/create_order", CreateOrder);
export { router as CreateOrderRouter };
