import User from "../models/user.model.js";

const getUsers = async (req, res) => {
  try {
    const { _id: currentUserId } = req.user;
    const filterdUser = await User.find({ _id: { $ne: currentUserId } }).select(
      "-password"
    );
    res.status(200).json({ users: filterdUser });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Something went wrong." });
  }
};

export { getUsers };
