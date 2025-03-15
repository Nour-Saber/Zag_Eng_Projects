import { Router } from "express";
import {
  signInController,
  signupController,
} from "../controllers/auth/auth.controller.js";

const router = Router();

router.post("/signup", signupController);
router.post("/signin", signInController);

export { router as authRouter };
