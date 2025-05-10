import { Router } from "express";
import { Order } from "../../models/orders/order.model.js";

const router = Router();
const GetAllorders = async (req, res) => {
  try {
    const allOrders = await Order.find({ is_deleted: false });
    res
      .status(200)
      .json({ message: "orders found successfully !", data: allOrders });
  } catch (err) {
    res.status(500).json(err.message);
  }
};
router.get("/get_all", GetAllorders);
export { router as GetAllordersRouter };
