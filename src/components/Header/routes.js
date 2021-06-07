import React from "react";
import menuIcon from "Images/menu_icon.svg";

const userType = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo")).userType
  : null;
export const links = [
  {
    name: "Innovation Capacity",
    icon: <img alt="Menu" src={menuIcon} />,
    path: "innovation-capacity",
    hide: false,
  },
  {
    name: "Stages",
    icon: <img alt="Menu" src={menuIcon} />,
    path: "stages",
    hide: false,
  },
  {
    name: "Groupsets",
    icon: <img alt="Menu" src={menuIcon} />,
    path: "groupsets",
    hide: false,
  },
  {
    name: "Comments",
    icon: <img alt="Menu" src={menuIcon} />,
    path: "comments",
    hide: false,
  },
  {
    name: "Improvement Resources",
    icon: <img alt="Menu" src={menuIcon} />,
    path: "improvement-resources",
    hide: false,
  },
  {
    name: "Admin",
    icon: (
      <img alt="Menu" src={menuIcon} style={{ padding: "0px 0px 0px 2px" }} />
    ),
    path: "admin",
    hide: userType === "admin",
  },
];
