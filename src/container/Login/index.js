import React from "react";
import LoginForm from "./LoginForm";
import { userInfo } from "./../../mockData";

const Login = ({ history }) => {
  const handleLogin = (value) => {
    let userData = userInfo;
    userData.isLoggedIn = true;
    localStorage.setItem("userInfo", JSON.stringify(userData));
    history.push("/innovation-capacity");
  };
  return <LoginForm onSubmit={handleLogin} />;
};

export default Login;
