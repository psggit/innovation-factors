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
  // cookieConsent: {
  //   maxWidth: 500,
  //   borderRadius: 5,
  //   padding: "20px 30px",
  //   backgroundColor: "white",
  //   position: "fixed",
  //   top: "50%",
  //   left: "50%",
  //   right: "auto",
  //   bottom: "auto",
  //   transform: "translate3d(-50%, -50%, 9999990px)",
  //   width: "95%",
  //   boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
  // },

  // overlayclass: {
  //   position: "fixed",
  //   backgroundColor: "rgba(0,0,0,0.5)",
  //   top: 0,
  //   left: 0,
  //   width: "100%",
  //   height: "100%",
  // },
  consentTextStyle: {
    fontSize: 16,
    marginBottom: 10,
  },
  // consentButtonStyle: {
  //   padding: 10,
  // },
});
