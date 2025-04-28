import { Router } from "express";
import { User } from "../../models/users/user.model.js";
import { BadRequestError } from "../../../core/errors/Errors.js";
import { hashingPassword } from "../../../core/services/password.services.js";
import { generateToken } from "../../../core/services/jwt.services.js";

const router = Router();

console.log("mm");

const signup = async (req, res) => {
  try {
    const data = req.body;
    const email = data.email;
    const user = await User.findOne({ email: email });
    if (user) throw new BadRequestError("user already exists!");
    const hashedPassword = await hashingPassword(data.password);

    const newUser = await User({ ...data, password: hashedPassword });
  
    const token = generateToken(newUser.name, newUser.email, newUser._id);
    res.status(200).json({
      data: newUser,
      token: token,
    });
    await newUser.save();
  } catch (err) {
    res.status(err.status_code || 500).json({ message: err.message });
  }
};
router.post("/signup", signup);

export { router as SignupRouter };
