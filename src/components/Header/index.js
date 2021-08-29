import React from "react";
import { withStyles } from "@material-ui/core/styles";
import IF_LOGO from "./../../assets/IF-Logo-2020.png";
import { styles } from "./../../styles/components/header.styles";
import IconButton from "@material-ui/core/IconButton";
import menuIcon from "Images/menu_icon.svg";
import Drawer from "Components/Drawer";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import HelpOutlineOutlinedIcon from "@material-ui/icons/HelpOutlineOutlined";

const Header = ({ classes, currentRoute, history }) => {
  const links = require("./routes").links;
  const [drawerState, setDrawerState] = React.useState(false);

  const COMPANY_NAME = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo")).companyName
    : "";

  const USER_NAME = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo")).firstName +
      " " +
      JSON.parse(localStorage.getItem("userInfo")).lastName
    : "";

  const handleRouteChange = (selectedRoute) => {
    if (currentRoute !== selectedRoute) window.location.assign(selectedRoute);
    setDrawerState(false);
  };

  const toggleMenu = (drawerOpen) => {
    setDrawerState(drawerOpen);
  };

  const handleLogout = () => {
    window.location.reload("/login");
    localStorage.clear();
  };

  return (
    <>
      <div id="Header" className={classes.header}>
        <div className={classes.iconWrapper}>
          <IconButton
            onClick={() => {
              setDrawerState((prev) => !drawerState);
            }}
            className="menuIcon"
          >
            <img alt="Menu" src={menuIcon} className={classes.menuIconStyle} />
          </IconButton>

          <img
            src={IF_LOGO}
            alt="if_logo"
            className={classes.logoImg}
            onClick={() => history.push("/innovation-capacity")}
          />
        </div>
        <div className={classes.titleWrapper}>
          <div className={classes.helpIconWrapper}>
            <a
              href="www.innovationfactors.co.uk/help"
              target="_blank"
              rel="noreferrer"
              className={classes.helpIconStyle}
            >
              <HelpOutlineOutlinedIcon />
            </a>
          </div>
          <div className={classes.title}>
            <p className={classes.companyNameStyle}>{COMPANY_NAME}</p>
            <p className={classes.userNameStyle}>{USER_NAME}</p>
          </div>
          <div className={classes.logout} onClick={handleLogout}>
            <ExitToAppIcon />
          </div>
        </div>
      </div>
      <Drawer
        links={links}
        onRouteChange={handleRouteChange}
        currentRoute={currentRoute}
        drawerState={drawerState}
        toggleMenu={toggleMenu}
      />
    </>
  );
};

export default withStyles(styles, { withTheme: true })(Header);
