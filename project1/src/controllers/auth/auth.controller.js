import { User } from "../../models/user.model.js";
import { BadRequestError } from "../../errors/Errors.js";
import {
  comparePassword,
  hashingPassword,
} from "../../services/password.service.js";
import { generateToken } from "../../services/jwt.services.js";
export const signupController = async (req, res) => {
  try {
    const data = req.body;
    const email = data.email;

    const user = await User.findOne({ email: email });

    if (user) {
      throw new BadRequestError("user already exists");
    }
    const hashedPassword = await hashingPassword(data.password);
    const newUser = await User({ ...data, password: hashedPassword });
    const token = await generateToken(newUser.name, newUser.email);
    await newUser.save();
    res.status(200).json({
      message: "successfully",
      token,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

export const signInController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new BadRequestError("Invalid email or password !");
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      throw new BadRequestError("Invalid email or password !");
    }
    const token = generateToken(user.name,user.email);
    res.status(200).json({
      message: " logged in successfully !",
      token
    });
  } catch (err) {
    res.status(err.statusCode).json({ msg: err.message });
  }
};
