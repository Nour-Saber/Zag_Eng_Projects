import { Router } from "express";
import {
  addNewBookController,
  getOneBooksController,
  DeleteONeBookController,
  updateBookController,
  getAllBooksController,
} from "../controllers/book.controller.js";
import { validationMiddleware } from "../middlewares/custome.middleware.js";

const router = Router();

router.get("/:id", getOneBooksController);
router.delete("/:id", DeleteONeBookController);
router.get("/", getAllBooksController);

router.use(validationMiddleware);
router.put("/:id", updateBookController);
router.post("/", addNewBookController);

export { router as bookRouters };



