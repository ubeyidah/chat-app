import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import {
  genTokenAndSetCookie,
  hashPassword,
  comparePassword,
} from "../utils/user.utils.js";

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
    console.log(error.message);
    res.status(500).json({ error: "Something went wrong." });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required." });
    }
    const userInDb = await User.findOne({ email });
    if (!userInDb) {
      return res.status(400).json({ error: "Incorrect email adress." });
    }
    const isMatch = await comparePassword(password, userInDb.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Incorrect password." });
    }
    genTokenAndSetCookie(userInDb._id, res);
    res.json({
      _id: userInDb._id,
      userName: userInDb.userName,
      email: userInDb.email,
      gender: userInDb.gender,
      profilePic: userInDb.profilePic,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Something went wrong." });
  }
};
const logout = (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully." });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Something went wrong." });
  }
};

export { signup, login, logout };
