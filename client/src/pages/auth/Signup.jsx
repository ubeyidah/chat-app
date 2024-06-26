import React, { useContext, useState } from "react";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import { Typography, Input, Button, Radio } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import useSignup from "../../hooks/useSignup";
import { AuthContext } from "../../context/Auth.context";

const Signup = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [data, setData] = useState({
    userName: "",
    email: "",
    password: "",
    gender: "",
  });
  const { loading, signup } = useSignup();
  const submitForm = async (e) => {
    e.preventDefault();
    await signup(data);
  };
  const { authUser } = useContext(AuthContext);
  console.log(authUser);

  const handleChage = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };
  const togglePasswordVisiblity = () => setPasswordShown((cur) => !cur);
  return (
    <section className="grid text-center h-screen items-center p-8 ">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]"></div>
      </div>
      <div>
        <Typography variant="h3" color="blue-gray" className="mb-2">
          Sign Up
        </Typography>
        <Typography className="mb-16 text-gray-600 font-normal text-[18px]">
          Enter your email and password to sign up
        </Typography>
        <form className="mx-auto max-w-[24rem] text-left" onSubmit={submitForm}>
          <div className="mb-6">
            <Input
              size="lg"
              type="text"
              name="userName"
              className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
              label="User Name"
              color="blue"
              value={data.userName}
              onChange={handleChage}
            />
          </div>
          <div className="mb-6">
            <Input
              size="lg"
              type="email"
              name="email"
              className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
              label="Your Email Address"
              color="blue"
              value={data.email}
              onChange={handleChage}
            />
          </div>
          <div className="mb-6">
            <Input
              color="blue"
              size="lg"
              label="Password"
              name="password"
              className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
              type={passwordShown ? "text" : "password"}
              icon={
                <i onClick={togglePasswordVisiblity}>
                  {passwordShown ? (
                    <EyeIcon className="h-5 w-5" />
                  ) : (
                    <EyeSlashIcon className="h-5 w-5" />
                  )}
                </i>
              }
              value={data.password}
              onChange={handleChage}
            />
          </div>
          <div>
            <Radio
              name="gender"
              value="male"
              label="Male"
              onChange={handleChage}
              checked={data.gender === "male"}
            />
            <Radio
              name="gender"
              value="female"
              label="Female"
              onChange={handleChage}
              checked={data.gender === "female"}
            />
          </div>
          <Button
            color="gray"
            size="lg"
            className="mt-6 flex items-center justify-center"
            fullWidth
            type="submit"
            loading={loading}
            disabled={loading}
          >
            sign up
          </Button>

          <Typography
            variant="small"
            color="gray"
            className="!mt-4 text-center font-normal"
          >
            alrady have an account?{" "}
            <Link to="/login" className="font-medium text-gray-900">
              sign in
            </Link>
          </Typography>
        </form>
      </div>
    </section>
  );
};

export default Signup;
