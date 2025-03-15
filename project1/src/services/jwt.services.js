import jwt from "jsonwebtoken";

export const generateToken = (name, email) => {
  const secretKey = process.env.SECRET_KEY;
  const expiresIn = "10d";
  const token = jwt.sign({ name, email }, secretKey, { expiresIn });
  return token;
};
