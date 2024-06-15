import { useContext, useState } from "react";
import { AuthContext } from "../context/Auth.context";
import toast from "react-hot-toast";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useContext(AuthContext);

  const login = async ({ email, password }) => {
    try {
      setLoading(true);
      const succes = validateEmailAndPassword(email, password);
      if (!succes) return;
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.setItem("user-info", JSON.stringify(data));
      setAuthUser(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
};

export default useLogin;
function validateEmailAndPassword(email, password) {
  // Email validation
  const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  if (!emailRegex.test(email)) {
    toast.error("Invalid email format.");
    return false;
  }

  // Password validation
  if (password.length < 8) {
    toast.error("Password must be at least 8 characters long.");
    return false;
  }

  return true;
}
