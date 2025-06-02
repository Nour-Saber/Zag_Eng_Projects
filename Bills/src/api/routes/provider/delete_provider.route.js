import { Router } from "express";
import { Provider } from "../../models/provider/providers.model.js";
import { NotFoundError } from "../../../core/errors/errors.js";
const router = Router();
const DeleteProvider = async (req, res) => {
  try {
    const id = req.params.id;
    const provider = await Provider.findOneAndUpdate(
      { _id: id, is_deleted: false },
      { is_deleted: true }
    );
    if (!provider) throw new NotFoundError("Provider not Found!");
    res.status(200).json({ msg: "Provider deleted successfully!" });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};
router.delete("/:id", DeleteProvider);
export { router as DeleteProviderRouter };
