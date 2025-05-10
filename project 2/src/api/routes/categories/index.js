import { Router } from "express";
import { CreateCategoryRouter } from "./create_category.route.js";
import { GetOneCategoryRouter } from "./get_category.route.js";
import { DeleteCategoryRouter } from "./delete_category.route.js";
import { UpdateCategoryRouter } from "./update_category.route.js";
import { GetAllCategoriesRouter } from "./get_all_categories.route.js";

const router = Router();
router.use(CreateCategoryRouter);
router.use(GetAllCategoriesRouter);
router.use(GetOneCategoryRouter);
router.use(DeleteCategoryRouter);
router.use(UpdateCategoryRouter);
export { router as categoryRouter };
