import React, { useState } from "react";
import CookieConsent from "react-cookie-consent";
import LoginForm from "./LoginForm";
import Notification from "./../../components/Notification";
import ConfirmationDialogBox from "./../../components/DialogBox";
import Button from "./../../components/Button";
import InputBase from "./../../components/Inputbase";
import { forgotPassword, login } from "./../../utils/http";
import { validateEmail } from "./../../utils/helpers";
import { styles } from "../../styles/container/login.styles";
import { withStyles } from "@material-ui/core/styles";

const Login = ({ classes, history }) => {
  const [errorObject, setErrorObject] = useState({
    open: false,
    message: "",
    messageType: "",
  });
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [email, setEmail] = useState("");
  const [isForgotPassword, setIsForgotPassword] = useState(false);

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
    setIsForgotPassword(true);
    forgotPassword({ userEmail: email })
      .then((response) => {
        setErrorObject({
          open: true,
          messageType: "success",
          message: response.message,
        });
        setIsForgotPassword(false);
        unmountForgotPassword();
      })
      .catch((error) => {
        setErrorObject({
          open: true,
          message: error.errorMessage,
          messageType: "error",
        });
        setIsForgotPassword(false);
      });
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
            disabled={!validateEmail(email) || isForgotPassword}
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
            placeholder="Enter email"
            defaultValue={email}
            handleTextChange={handleEmailChange}
            style={{ width: "100%" }}
          />
        </div>
      </ConfirmationDialogBox>
    );
  };

  const renderAcceptCookieDialog = () => {
    return (
      <div>
        <CookieConsent debug buttonText="Accept">
          <p className={classes.consentTextStyle}>
              We use cookies to help improve your experience of using Innovation Factors.
          </p>
        </CookieConsent>
      </div>
    );
  };

  const setCookie = () => {
    var now = new Date();

    var time = now.getTime();
    var expireTime = time + 48 * 60 * 60 * 1000;

    now.setTime(expireTime);
    document.cookie = "cookie=cookie;expires=" + now.toUTCString() + ";path=/";
  };

  const handleLogin = (value) => {
    setIsLoggingIn(true);
    login({
      email: value.email,
      password: value.password,
    })
      .then((response) => {
        let userData = response.data;
        userData.isLoggedIn = true;
        setCookie();
        localStorage.setItem("userInfo", JSON.stringify(userData));
        history.push("/innovation-capacity");
        setIsLoggingIn(false);
      })
      .catch((error) => {
        setIsLoggingIn(false);
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
          messageType={errorObject.messageType}
        />
      )}
      <LoginForm
        onSubmit={handleLogin}
        isLoggingIn={isLoggingIn}
        handleForgotPassword={mountForgotPassword}
      />
      {mountForgotPasswordDialog && renderForgotPasswordDialog()}
      {renderAcceptCookieDialog()}
    </React.Fragment>
  );
};

export default withStyles(styles, { withTheme: true })(Login);
