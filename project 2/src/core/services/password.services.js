import bcrypt from "bcrypt";

export const hashingPassword = async (passWord) => {
  const salt = 10;
  const hashedPassword = await bcrypt.hash(passWord, salt);
  return hashedPassword;
};
export const comparePassword = async (passWord, hashedPassword) => {
  const match = await bcrypt.compare(passWord, hashedPassword);
  return match;
};
