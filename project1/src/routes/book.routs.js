import {Router} from 'express';
import {addNewBookController , getOneBooksController} from '../controllers/book.controller.js'

const router = Router();

router.post("/",addNewBookController);
router.post("/:id",getOneBooksController);

export {router as bookRouters};