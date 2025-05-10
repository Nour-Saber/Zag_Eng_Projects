import { NotFoundError } from "../../../core/errors/Errors.js";
import { Router } from "express";
import { Order } from "../../models/orders/order.model.js";

const router = Router();
const GetMyOrders = async (req, res) => {
  try {
    const userId = req.user._id;
    const myOrders = await Order.find({ is_deleted: false, user: userId });
    if (!myOrders) throw new NotFoundError("Orders not Found!");
    res
      .status(200)
      .json({ message: "orders found successfully!", data: myOrders });
  } catch (err) {
    res.status(err.status_code || 500).json({ message: err.message });
  }
};
router.get("/get_my_orders", GetMyOrders);
export { router as GetMyOrdersRouter };
