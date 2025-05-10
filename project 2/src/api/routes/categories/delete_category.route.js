import { Router } from "express";
import { Category } from "../../models/categories/category.model.js";
import { NotFoundError } from "../../../core/errors/Errors.js";
import { authorize } from "../../../core/middlewares/authorizeUsers.middleware.js";

const router = Router();
const DeleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findOneAndUpdate(
      { _id: id, is_deleted: false },
      { is_deleted: true }
    );
    if (!category) throw new NotFoundError();
    await category.save();
    res.status(200).json("Deleted Successfully!");
  } catch (err) {
    res.status(err.status_code).json({ message: err.message });
  }
};
router.delete("/:id",authorize(["admin"]),DeleteCategory);
export { router as DeleteCategoryRouter };
