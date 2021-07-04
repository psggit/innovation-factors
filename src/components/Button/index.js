import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import classnames from "classnames";
import makeStyles from "@material-ui/core/styles/makeStyles";

const StandardButton = (props) => {
  const {
    disabled,
    text,
    color,
    className,
    style,
    onClick,
    variant,
    id,
    icon,
    useRealText,
    buttonWithIcon,
  } = props;

  const classes = useStyles();

  const getClassname = () => {
    let classname;
    if (color === "primary") classname = classes.buttonPrimary;
    else if (color === "secondary") classname = classes.buttonSecondary;
    else if (color === "tertiary") classname = classes.buttonTertiary;
    else if (color === "error") classname = classes.buttonError;
    return classname;
  };

  const buttonProps = {
    id,
    onClick: onClick,
    className: classnames(
      getClassname(),
      className,
      useRealText ? null : classes.buttonTextUpperCase
    ),
    style: { ...style },
    variant,
    color,
    text,
    disabled,
  };

  if (buttonWithIcon) {
    return (
      <Button {...buttonProps}>
        <span className="label">{text}</span>
        <span className="icon">{icon}</span>
      </Button>
    );
  } else {
    return <Button {...buttonProps}>{text}</Button>;
  }
};

const useStyles = makeStyles((theme) => ({
  buttonError: {
    color: theme.palette.error.main,
    backgroundColor: "#474655",
  },
  buttonPrimary: {
    color: "#FFFFFF",
    backgroundColor: theme.palette.primary.main,
  },
  button: {
    borderRadius: 0,
    verticalAlign: "none",
    textTransform: "none",
    padding: "8px 24px",
    "& span": {
      marginRight: 0,
    },
    "&:disabled": {
      opacity: 0.9,
    },
    "& span.icon": {
      marginLeft: 6,
      display: "flex",
    },
  },
  buttonTextUpperCase: {
    textTransform: "uppercase",
  },
}));

StandardButton.defaultProps = {
  useRealText: false,
};

StandardButton.propTypes = {
  id: PropTypes.string,
  icon: PropTypes.node,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  text: PropTypes.string,
  variant: PropTypes.string,
  color: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  useRealText: PropTypes.bool,
  buttonWithIcon: PropTypes.bool,
};

export default StandardButton;
