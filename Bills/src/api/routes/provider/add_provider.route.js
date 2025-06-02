import { Router } from "express";
import { Provider } from "../../models/provider/providers.model.js";
import { BadRequestError } from "../../../core/errors/errors.js";
const router = Router();

const AddProvider = async (req, res) => {
  try {
    const data = req.body;
    const newProvider = await Provider({ ...data });
    if (!newProvider) throw new BadRequestError("Provider not created!");
    res
      .status(200)
      .json({ msg: "Provider Created successfully!", date: newProvider });
    await newProvider.save();
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};
router.post("/", AddProvider);
export { router as AddProviderRouter };
