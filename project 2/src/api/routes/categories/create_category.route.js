import Router from "express";
import { Category } from "../../models/categories/category.model.js";
import { BadRequestError } from "../../../core/errors/Errors.js";
import { authorize } from "../../../core/middlewares/authorizeUsers.middleware.js";
const router = Router();

const CreateCategory = async (req, res) => {
  try {
    const data = req.body;
    const category = await new Category({ ...data });
    if (!category) throw new BadRequestError();
    await category.save();
    res.status(200).json({
      message: "Category created Successfully!",
      data: category,
    });
  } catch (err) {
    res.status(err.status_code).json({ message: err.message });
  }
};
router.post("/",authorize(["admin"]) ,CreateCategory);
export { router as CreateCategoryRouter };
