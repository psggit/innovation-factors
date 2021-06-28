import React, { useEffect } from "react";
import LoginForm from "./LoginForm";
import { userInfo } from "./../../mockData";
import { login } from "./../../utils/http";

const Login = ({ history }) => {
  const handleLogin = (value) => {
    // let userData = userInfo;
    // userData.isLoggedIn = true;
    // localStorage.setItem("userInfo", JSON.stringify(userData));
    // history.push("/innovation-capacity");

    login({
      email: value.email,
      password: value.password,
    })
      // fetch(
      //   `https://innovationfactors.000webhostapp.com/api/user/userLogin.php`,
      //   {
      //     method: "POST",
      //     body: JSON.stringify({ email: value.email, password: value.password }),
      //   }
      // )
      .then((response) => {
        let userData = response.data;
        //console.log("resp", response);
        userData.isLoggedIn = true;
        localStorage.setItem("userInfo", JSON.stringify(userData));
        history.push("/innovation-capacity");
      })
      .catch((error) => {
        console.log("Error in logging in", error);
      });
  };
  return <LoginForm onSubmit={handleLogin} />;
};

export default Login;
