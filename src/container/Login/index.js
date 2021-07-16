import React, { useState } from "react";
import LoginForm from "./LoginForm";
import Notification from "./../../components/Notification";
import ConfirmationDialogBox from "./../../components/DialogBox";
import Button from "./../../components/Button";
import InputBase from "./../../components/Inputbase";
import { login } from "./../../utils/http";
import { validateEmail } from "./../../utils/helpers";

const Login = ({ history }) => {
  const [errorObject, setErrorObject] = useState({ open: false, message: "" });
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [email, setEmail] = useState("");

  const [mountForgotPasswordDialog, setMountForgotPasswordDialog] =
    useState(false);

  const resetError = () => {
    setErrorObject({ open: false, message: "" });
  };

  const mountForgotPassword = () => {
    setMountForgotPasswordDialog(true);
  };

  const unmountForgotPassword = () => {
    setMountForgotPasswordDialog(false);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleForgotPasswordClick = () => {
    console.log("email");
  };

  const renderForgotPasswordDialog = () => {
    return (
      <ConfirmationDialogBox
        title="Forgot Password?"
        actions={[
          <Button
            id="cancelButton"
            onClick={unmountForgotPassword}
            key={1}
            useRealText={true}
            color="secondary"
            text="Cancel"
          />,
          <Button
            id="confirmButton"
            onClick={() => handleForgotPasswordClick()}
            key={2}
            useRealText={true}
            color="primary"
            text="Okay"
            disabled={!validateEmail(email)}
          />,
        ]}
        handleCloseDialog={unmountForgotPassword}
      >
        <div className="subtitle">
          <InputBase
            type="email"
            id="reason"
            classname="inputStyle"
            key="reason"
            placeholder="Enter email id"
            defaultValue={email}
            handleTextChange={handleEmailChange}
            style={{ width: "100%" }}
          />
        </div>
      </ConfirmationDialogBox>
    );
  };
  const handleLogin = (value) => {
    // let userData = userInfo;
    // userData.isLoggedIn = true;
    // localStorage.setItem("userInfo", JSON.stringify(userData));
    // history.push("/innovation-capacity");
    setIsLoggingIn(true);
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
        setIsLoggingIn(false);
      })
      .catch((error) => {
        console.log("Error in logging in", error.json());
        setIsLoggingIn(false);
        // setErrorObject({
        //   open: true,
        //   message: error.errorMessage,
        // });
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
      <LoginForm
        onSubmit={handleLogin}
        isLoggingIn={isLoggingIn}
        handleForgotPassword={mountForgotPassword}
      />
      {mountForgotPasswordDialog && renderForgotPasswordDialog()}
    </React.Fragment>
  );
};

export default Login;
