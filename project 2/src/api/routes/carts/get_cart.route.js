import { Router } from "express";
import { Cart } from "../../models/carts/cart.model.js";

const router = Router();
const getCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const userCart = await Cart.findOne({ user_id: userId, is_deleted: false });
    if (!userCart) {
      const newCart = await Cart({
        user_id: userId,
        items: [],
        total_price: 0,
      });
      await newCart.save();
      return res
        .status(200)
        .json({ message: "Cart found successfully!", newCart });
    } else
      res.status(200).json({ message: "Cart found successfully!", userCart });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
router.get("/get_cart", getCart);
export { router as getCartRouter };
