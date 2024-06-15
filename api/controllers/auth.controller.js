import User from "../models/user.model.js";

const signup = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    const userInDb = User.find({ email });
    if (user) {
      return res.status(400).json({ error: "Email already exists." });
    }
  } catch (error) {}
};
const login = (req, res) => {
  console.log("login");
};
const logout = (req, res) => {
  console.log("logout");
};

export { signup, login, logout };
