import { Router } from "express";
import { Client } from "../../models/client/clients.model.js";
const router = Router();

const GetAllClients = async (req, res) => {
  try {
    const clients = await Client.find({ is_deleted: false });
    res.status(200).json({ data: clients });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};
router.get("/", GetAllClients);
export { router as GetAllClientsRouter };
