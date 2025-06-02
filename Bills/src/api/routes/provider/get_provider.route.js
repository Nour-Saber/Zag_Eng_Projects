import { Router } from "express";
import { Provider } from "../../models/provider/providers.model.js";
import { NotFoundError } from "../../../core/errors/errors.js";
const router = Router();
const GetOneProvider = async (req, res) => {
  try {
    const { id } = req.params;
    const provider = await Provider.findOne({ _id: id, is_deleted: false });
    if (!provider) throw new NotFoundError("Provider not found!");
    res
      .status(200)
      .json({ msg: "Provider found successfully!", data: provider });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
router.get("/:id", GetOneProvider);
export { router as GetOneProviderRouter };
