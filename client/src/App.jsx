import React, { useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Signup from "./pages/auth/Signup.jsx";
import Login from "./pages/auth/Login.jsx";
import Home from "./pages/main/Home.jsx";
import { Toaster } from "react-hot-toast";
import { AuthContext } from "./context/Auth.context.jsx";

const App = () => {
  const { authUser } = useContext(AuthContext);
  return (
    <>
      <BrowserRouter>
        <Toaster />
        <Routes>
          <Route
            path="/"
            element={authUser ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/signup"
            element={authUser ? <Navigate to="/" /> : <Signup />}
          />
          <Route
            path="/login"
            element={authUser ? <Navigate to="/" /> : <Login />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
