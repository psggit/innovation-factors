export const styles = (theme) => ({
  loginWrapper: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  loginForm: {
    width: "400px",
    border: `3px solid ${theme.palette.primary.main}`,
    padding: "40px",
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      width: "calc(100vw - 40px)",
      margin: "20px",
      maxWidth: "500px",
    },
  },
  inputField: {
    width: "100%",
  },
  errorMessage: {
    color: "#c81922",
    fontSize: "12px",
    paddingTop: "4px",
    textAlign: "left",
  },
  loginButtonWrapper: {
    display: "flex",
    justifyContent: "center",
  },
  loginButton: {
    background: theme.palette.primary.main,
    color: "#fff",
    "&:disabled": {
      color: "#fff",
    },
  },
  rootInput: {
    color: "#000",
    "& .MuiOutlinedInput-root": {
      color: "#000",
      "& fieldset": {
        borderColor: theme.palette.primary.main,
      },
      "&:hover fieldset": {
        borderColor: theme.palette.primary.main,
      },
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.primary.main,
      },
    },
  },
  logoImg: {
    width: 300,
    height: 100,
    marginBottom: 20,
    objectFit: "contain",
    [theme.breakpoints.down("sm")]: {
      width: 200,
    },
  },
  forgotPasswordStyle: {
    color: theme.palette.primary.main,
    cursor: "pointer",
    margin: "20px 0",
  },
});
