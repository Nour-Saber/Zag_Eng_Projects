import { Router } from "express";
import { Client } from "../../models/client/clients.model.js";
import { NotFoundError } from "../../../core/errors/errors.js";

const router = Router();

const DeleteClient = async (req, res) => {
  try {
    const id = req.params.id;
    const client = await Client.findOneAndUpdate(
      { _id: id, is_deleted: false },
      { is_deleted: true }
    );
    if (!client) throw new NotFoundError("Client not found!");
    await client.save();
    res.status(200).json({ msg: "Client deleted successfully!" });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};
router.delete("/:id", DeleteClient);
export { router as DeleteClientRouter };
