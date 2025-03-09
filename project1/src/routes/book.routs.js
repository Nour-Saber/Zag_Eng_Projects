import {Router} from 'express';
import {addNewBookController , getOneBooksController} from '../controllers/book.controller.js'

const router = Router();

router.post("/",addNewBookController);


export {router as bookRouters};
