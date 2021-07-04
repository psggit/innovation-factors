import React from "react";
import Inputbase from "Components/Inputbase";
import InputLabel from "Components/InputLabel";
import { styles } from "../../../../styles/container/admin.styles";
import { withStyles } from "@material-ui/core/styles";

const Company = ({ classes }) => {
  const userInfo = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

  return (
    <div className={classes.adminWrapper}>
      <div className={classes.inputWrapper}>
        <InputLabel style={{ width: 170 }}>Company Name</InputLabel>
        <Inputbase
          id="inputbase-text"
          className={classes.inputbase}
          style={{ width: "100%" }}
          defaultValue={userInfo.companyName}
          disabled={true}
        />
      </div>
      <div className={classes.inputWrapper}>
        <InputLabel style={{ width: 170 }}>Company Email</InputLabel>
        <Inputbase
          id="inputbase-text"
          classname="input-base-class"
          className={classes.inputbase}
          style={{ width: "100%" }}
          defaultValue={userInfo.companyEmail}
          disabled={true}
        />
      </div>
      <div className={classes.inputWrapper}>
        <InputLabel style={{ width: 170 }}>Company Logo</InputLabel>
        <img
          src={`data:image/png;base64,${userInfo.companyLogo}`}
          alt="company_logo"
          className={classes.imgStyle}
        />
      </div>
    </div>
  );
};

export default withStyles(styles, { withTheme: true })(Company);
