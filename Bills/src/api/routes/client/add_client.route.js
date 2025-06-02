import { Router } from "express";
import { Client } from "../../models/client/clients.model.js";
import { BadRequestError } from "../../../core/errors/errors.js";

const router = Router();
const AddClient = async (req, res) => {
  try {
    const data = req.body;
    const newClient = await Client(data);
    if (!newClient) throw new BadRequestError("Client not created!");
    await newClient.save();
    res
      .status(200)
      .json({ msg: "Client created successfully!", data: newClient });
  } catch (err) {
    res.status(500).json({ mse: err.message });
  }
};
router.post("/", AddClient);
export { router as AddClientRouter };
