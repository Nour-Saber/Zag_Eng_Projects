import { Router } from "express";
import { Cart } from "../../models/carts/cart.model.js";
const router = Router();
const DeleteFromCart = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    const userCart = await Cart.findOne({ user_id: userId, is_deleted: false });
    const product = userCart.items.find(
      (item) => item.product.toString() === id
    );
    if (product.quantity > 1) product.quantity--;
    else userCart.items.remove(product);

    userCart.total_price -= product.price;
    await userCart.save();
    res.status(200).json({ message: "Product deleted successfully!" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
router.use("/:id", DeleteFromCart);
export { router as DeleteFromCartRouter };
