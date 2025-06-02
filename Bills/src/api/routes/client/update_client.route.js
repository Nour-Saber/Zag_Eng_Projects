import { Router } from "express";
import { Client } from "../../models/client/clients.model.js";
import { NotFoundError } from "../../../core/errors/errors.js";

const router = Router();

const UpdateClient = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const client = await Client.findOneAndUpdate(
      { _id: id, is_deleted: false },
      { ...data },
      { new: true }
    );
    if (!client) throw new NotFoundError("Client not Found!");
    await client.save();
    res.status(200).json({ msg: "Client Updated successfully!", data: client });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
router.put("/:id", UpdateClient);
export { router as UpdateClientRouter };
