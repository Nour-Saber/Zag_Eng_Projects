<<<<<<< HEAD
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
=======
import {Router} from 'express';
import {addNewBookController } from '../controllers/book.controller.js'

const router = Router();

router.post("/",addNewBookController);


export {router as bookRouters};
>>>>>>> 9ace613b4512253d19d3995d7eda0ce019cb9151
