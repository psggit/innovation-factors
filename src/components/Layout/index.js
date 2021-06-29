import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import PropTypes from "prop-types";

const Layout = React.memo(({ children }) => {
  const classes = useStyles();

  return <div className={classes.layout}>{children}</div>;
});

Layout.propTypes = {
  children: PropTypes.node,
};

const useStyles = makeStyles((theme) => ({
  layout: {
    padding: "30px 104px 64px 104px",
    marginTop: 75,
    width: "inherit",
    overflow: "scroll",
    [theme.breakpoints.down("sm")]: {
      padding: "30px 30px 30px 30px",
      marginTop: 107,
    },
    [theme.breakpoints.up("sm")]: {
      padding: "30px 30px 30px 100px",
    },
  },
}));

export default Layout;
