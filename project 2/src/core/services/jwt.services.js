import jwt from "jsonwebtoken";
import { UnAuthorizedError } from "../errors/Errors.js";
import "dotenv/config";

export const generateToken = (name, email, _id) => {
  const SecretKey = process.env.SECRETKEY;
  const expiresIn = "30d";
  const token = jwt.sign({ name, email, _id }, SecretKey, { expiresIn });
 

  return token;
};
export const verifyToken = (token) => {
  try {
    const decodedToken = jwt.verify(token, process.env.SECRETKEY);
    return decodedToken;
  } catch (err) {
    throw new UnAuthorizedError();
  }
};
