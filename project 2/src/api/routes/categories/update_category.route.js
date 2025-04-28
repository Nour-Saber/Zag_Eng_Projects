import { Router } from "express";
import { Category } from "../../models/categories/category.model.js";
import { NotFoundError } from "../../../core/errors/Errors.js";

const router = Router();

const UpdateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const category = await Category.findOneAndUpdate(
      { _id: id, is_deleted: false },
      { ...data }
    );
    if (!category) throw new NotFoundError();
    await category.save();
    res.status(200).json(" category updated successfully!");
  } catch (err) {
    res.status(err.status_code).json({ message: err.message });
  }
};
router.put("/:id", UpdateCategory);
export { router as UpdateCategoryRouter };
