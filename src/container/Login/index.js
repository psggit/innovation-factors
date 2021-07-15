import React, { useState } from "react";
import LoginForm from "./LoginForm";
import Notification from "./../../components/Notification";
import { login } from "./../../utils/http";

const Login = ({ history }) => {
  const [errorObject, setErrorObject] = useState({ open: false, message: "" });

  const resetError = () => {
    setErrorObject({ open: false, message: "" });
  };

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
        setErrorObject({
          open: true,
          message: error.errorMessage,
        });
        console.log("Error in logging in", error);
      });
  };
  return (
    <React.Fragment>
      {errorObject.open && (
        <Notification
          handleClose={resetError}
          open={errorObject.open}
          message={errorObject.message}
          messageType="error"
        />
      )}
      <LoginForm onSubmit={handleLogin} />
    </React.Fragment>
  );
};

export default Login;
