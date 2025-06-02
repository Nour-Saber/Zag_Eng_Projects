import { Router } from "express";
import { Client } from "../../models/client/clients.model.js";
import { NotFoundError } from "../../../core/errors/errors.js";
const router = Router();

const GetOneClient = async (req, res) => {
  try {
    const { id } = req.params;
    const client = await Client.findOne({ _id: id, is_deleted: false });
    if (!client) throw new NotFoundError("Client not found!");
    res.status(200).json({ msg: "Client found successfully!", data: client });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};
router.get("/:id", GetOneClient);
export { router as GetOneClientRouter };
