import { Router } from "express";

import { NotFoundError } from "../../../core/errors/Errors.js";
import { Product } from "../../models/products/products.model.js";
import { Cart } from "../../models/carts/cart.model.js";

const router = Router();
const AddToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user._id;
    const cart = await Cart.findOne({ user_id: userId, is_deleted: false });
    const product = await Product.findOne({
      _id: productId,
      is_deleted: false,
    });

    if (!product) throw new NotFoundError("Product not found!");

    if (!cart) {
      const newCart = await Cart({
        user_id: userId,
        items: [
          {
            product: productId,
            quantity: quantity || 1,
            price: product.price,
          },
        ],
        total_price: product.price * (quantity || 1),
      });
      await newCart.save();
      res
        .status(200)
        .json({ message: "item added successfully !", data: newCart });
    }

    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId
    );
    if (existingItem) {
      existingItem.quantity += quantity || 1;
      cart.total_price += existingItem.price * (quantity || 1);
    } else {
      cart.items.push({
        product: productId,
        price: product.price,
        quantity: quantity || 1,
      });
      cart.total_price += product.price * (quantity || 1);
    }
    await cart.save();
    res.status(200).json({ message: "item added successfully !", data: cart });
  } catch (err) {
    res.status(err.status_code || 500).json({ message: err.message });
  }
};
router.post("/add_to_cart", AddToCart);
export { router as AddToCartRouter };
