import React from "react";
import InnovationIcon from "Images/innovation.png";
import ResourceIcon from "Images/resources.png";
import StageIcon from "Images/stages.png";
import CommentsIcon from "Images/comments.png";
import GroupsetsIcon from "Images/groupsets.png";
import AdminIcon from "Images/admin.png";

const userType = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo")).userType
  : null;

const imageStyle = {
  width: 30,
  height: 30,
};

export const links = [
  {
    name: "Innovation Capacity",
    icon: <img alt="Menu" src={InnovationIcon} style={imageStyle} />,
    path: "innovation-capacity",
    hide: false,
  },
  {
    name: "Stages",
    icon: <img alt="Menu" src={StageIcon} style={imageStyle} />,
    path: "stages",
    hide: false,
  },
  {
    name: "Groupsets",
    icon: <img alt="Menu" src={GroupsetsIcon} style={imageStyle} />,
    path: "groupsets",
    hide: false,
  },
  {
    name: "Comments",
    icon: <img alt="Menu" src={CommentsIcon} style={imageStyle} />,
    path: "comments",
    hide: false,
  },
  {
    name: "Improvement Resources",
    icon: <img alt="Menu" src={ResourceIcon} style={imageStyle} />,
    path: "improvement-resources",
    hide: false,
  },
  {
    name: "Admin",
    icon: (
      <img
        alt="Menu"
        src={AdminIcon}
        style={{ padding: "0px 0px 0px 2px", ...imageStyle }}
      />
    ),
    path: "admin",
    hide: userType === "admin",
  },
];
