import User from "../models/user.model.js";
import { genTokenAndSetCookie, hashPassword } from "../utils/user.utils.js";

const signup = async (req, res) => {
  try {
    const { userName, email, password, gender } = req.body;
    if (!userName || !email || !password || !gender) {
      return res.status(400).json({ error: "All fields are required." });
    }
    const userInDb = await User.find({ email });
    if (userInDb.length > 0) {
      return res.status(400).json({ error: "Email already exists." });
    }
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${userName}`;
    const profilePic = gender === "male" ? boyProfilePic : girlProfilePic;
    const newUser = new User({
      userName,
      email,
      gender,
      profilePic,
      password: await hashPassword(password),
    });
    await newUser.save();
    genTokenAndSetCookie(newUser._id, res);
    res.status(201).json({
      _id: newUser._id,
      userName: newUser.userName,
      email: newUser.email,
      gender: newUser.gender,
      profilePic: newUser.profilePic,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong." });
  }
};
const login = (req, res) => {
  console.log("login");
};
const logout = (req, res) => {
  console.log("logout");
};

export { signup, login, logout };
