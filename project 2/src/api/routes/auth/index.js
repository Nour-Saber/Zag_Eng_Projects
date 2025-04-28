import {Router} from  'express'
import { loginRouter } from './login.route.js';
import { SignupRouter } from './signup.route.js';
const router = Router();
router.use(loginRouter);
router.use(SignupRouter);
export {router as usersRouter};