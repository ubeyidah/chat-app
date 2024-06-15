import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const hashPassword = async (password) => {
  const hashSalt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, hashSalt);
  return hash;
};

const comparePassword = async (password, hash) => {
  return await bcrypt.compare(password || "", hash);
};

const genTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });
  res.cookie("jwt", token, {
    httpOnly: true,
    maxAge: 15 * 24 * 60 * 60 * 1000,
    sameSite: "strict",
    secure: process.env.STATUS === "dev" ? false : true,
  });
};

export { hashPassword, genTokenAndSetCookie, comparePassword };
