import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../context/Auth.context";

const useSignup = () => {
  const [loading, setLoding] = useState(false);
  const { setAuthUser } = useContext(AuthContext);

  const signup = async ({ userName, password, email, gender }) => {
    const success = handleInputErrors({ userName, password, email, gender });
    if (!success) return;
    setLoding(true);
    try {
      const url = "/api/auth/signup";
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName, password, email, gender }),
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
      setLoding(false);
    }
  };

  return { loading, signup };
};

export default useSignup;
const validateEmail = (email) => {
  const regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  return regex.test(email);
};

const handleInputErrors = ({ userName, password, email, gender }) => {
  console.log(userName, password, email, gender);
  if (!userName || !password || !email || !gender) {
    toast.error("All fields are required.");
    return false;
  }

  if (password.length < 8) {
    toast.error("Password must be at least 8 characters long.");
    return false;
  }

  if (!validateEmail(email)) {
    toast.error("Invalid email format.");
    return false;
  }

  return true;
};
