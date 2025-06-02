import { Router } from "express";
import { Provider } from "../../models/provider/providers.model.js";
import { NotFoundError } from "../../../core/errors/errors.js";
const router = Router();
const UpdateProvider = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const provider = await Provider.findOneAndUpdate(
      { _id: id, is_deleted: false },
      { ...data },
      { new: true }
    );
    if (!provider) throw new NotFoundError("Provider not found!");
    res
      .status(200)
      .json({ msg: "Provider updated successfully!", data: provider });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};
router.put("/:id", UpdateProvider);
export { router as UpdateProviderRouter };
