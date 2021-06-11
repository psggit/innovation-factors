import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  fontStyle: {
    fontSize: 30,
    color: theme.palette.primary.main,
    textTransform: "capitalize",
    fontWeight: 600,
    marginBottom: 30,
  },
}));

const PageTitle = ({ title }) => {
  const classes = useStyles();
  return <div className={classes.fontStyle}>{title}</div>;
};

export default PageTitle;
