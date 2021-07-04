import React, { useState } from "react";
import Inputbase from "Components/Inputbase";
import InputLabel from "Components/InputLabel";
import Button from "Components/Button";
import Notification from "Components/Notification";
import { resetUserPassword } from "./../../../../utils/http";
import { styles } from "../../../../styles/container/admin.styles";
import { withStyles } from "@material-ui/core/styles";

const Profile = ({ classes }) => {
  const [password, setPassword] = useState("");
  const [resetPassword, setResetPassword] = useState("");
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [errorObject, setErrorObject] = useState({
    open: false,
    message: "",
    messageType: "",
  });

  const userInfo = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

  const handleResetPassword = () => {
    setIsUpdatingPassword(true);
    resetUserPassword({ password })
      .then((response) => {
        setIsUpdatingPassword(false);
        setResetPassword(false);
        setErrorObject({
          open: true,
          message: "Updated Successfully",
          messageType: "success",
        });
      })
      .catch((error) => {
        setIsUpdatingPassword(false);
        setErrorObject({
          open: true,
          message: error.message,
          messageType: "error",
        });
        console.log("Error in updating password", error);
      });
  };

  const resetErrorObject = () => {
    setErrorObject({ open: false, message: "", messageType: "" });
  };

  const updatePassword = () => {
    setResetPassword(true);
  };

  const handleTextChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className={classes.adminWrapper}>
      <div className={classes.inputWrapper}>
        <InputLabel>Name</InputLabel>
        <Inputbase
          id="inputbase-text"
          classname="input-base-class"
          className={classes.inputbase}
          style={{ width: "100%", marginLeft: 20 }}
          defaultValue={userInfo.firstName}
          disabled={true}
        />
      </div>
      <div className={classes.inputWrapper}>
        <InputLabel>Email</InputLabel>
        <Inputbase
          id="inputbase-text"
          classname="input-base-class"
          className={classes.inputbase}
          style={{ width: "100%", marginLeft: 20 }}
          defaultValue={userInfo.email}
          disabled={true}
        />
      </div>
      <div className={classes.inputWrapper} style={{ width: 500 }}>
        <Button
          text="Reset Password"
          buttonWithIcon={true}
          color="primary"
          style={{ display: "flex", alignItems: "center" }}
          onClick={updatePassword}
        />
        {resetPassword && (
          <>
            <Inputbase
              id="inputbase-text"
              classname="input-base-class"
              style={{ width: "100%", margin: "0 20px 0 20px" }}
              defaultValue={password}
              placeholder="Enter password"
              disabled={false}
              handleTextChange={handleTextChange}
            />
            <Button
              text="Update"
              style={{ display: "flex", alignItems: "center" }}
              buttonWithIcon={true}
              color="primary"
              disabled={isUpdatingPassword}
              onClick={handleResetPassword}
            />
          </>
        )}
        {errorObject.open && (
          <Notification
            handleClose={resetErrorObject}
            open={errorObject.open}
            message={errorObject.message}
            messageType={errorObject.messageType}
          />
        )}
      </div>
    </div>
  );
};

export default withStyles(styles, { withTheme: true })(Profile);
