const signup = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
  } catch (error) {}
};
const login = (req, res) => {
  console.log("login");
};
const logout = (req, res) => {
  console.log("logout");
};

export { signup, login, logout };
