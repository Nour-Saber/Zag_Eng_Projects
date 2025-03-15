import bcrypt from "bcrypt";
import { User } from "../models/user.model.js";

export const hashingPassword = async (password) => {
  const salt = 10;
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

export const comparePassword = async (password, hashedPassword) => {
  const match = await bcrypt.compare(password, hashedPassword);
  return match;
};
export default hashingPassword;
