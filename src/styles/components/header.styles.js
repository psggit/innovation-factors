export const styles = (theme) => ({
  header: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px",
    width: "100%",
    zIndex: "1201",
    position: "fixed",
    left: 0,
    right: 0,
    top: 0,
    borderBottom: `3px solid ${theme.palette.primary.main}`,
    backgroundColor: "#fff",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  iconWrapper: {
    display: "flex",
    alignItems: "center",
  },
  logoImg: {
    width: 150,
    height: 50,
    marginLeft: 12,
    cursor: "pointer",
    objectFit: "contain",
  },
  menuIconStyle: {
    width: 24,
    height: 24,
    color: "#000",
  },
  titleWrapper: {
    display: "flex",
    alignItems: "center",
    color: theme.palette.primary.main,
    [theme.breakpoints.down("sm")]: {
      justifyContent: "space-between",
      marginTop: 10,
    },
  },
  title: {
    fontFamily: `"Proxima_Nova_Bold", "Fallback", "sans-serif"`,
    marginRight: 10,
    textTransform: "uppercase",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    borderLeft: "1px solid #E4E4E4",
    borderRight: "1px solid #E4E4E4",
    padding: "3px 10px 3px 10px",
  },
  companyNameStyle: {
    marginLeft: 4,
    marginBottom: 4,
  },
  userNameStyle: {
    marginLeft: 4,
    marginBottom: 4,
    textTransform: 'capitalize',
  },
  helpIconWrapper: {
    borderLeft: "1px solid #E4E4E4",
    padding: "10px 0 10px 0",
  },
  helpIconStyle: {
    color: theme.palette.primary.main,
    padding: "0 10px 0 10px",
  },
  logout: {
    marginLeft: 10,
    cursor: "pointer",
  },
});

// #Header {
//   display: flex;
//   justify-content: space-between;
//   padding: 10px;
//   width: 100%;
//   z-index: 1201;
//   position: relative;
//   border-bottom: 5px solid #3d7ebc;
//   background-color: #fff;
//   .iconWrapper {
//     display: flex;
//     align-items: center;
//     img.logo {
//       width: 150px;
//       height: 50px;
//       margin-left: 12px;
//     }
//     .menuIconStyle {
//       width: 24px;
//       height: 24px;
//       color: #000;
//     }
//   }

//   .titleWrapper {
//     display: flex;
//     align-items: center;
//     color: #3d7ebc;
//     .title {
//       font-family: "Proxima_Nova_Bold", Fallback, sans-serif;
//       margin-right: 10px;
//     }
//     .subtitle {
//     }
//     .logout {
//       margin-left: 10px;
//       cursor: pointer;
//     }
//   }
// }

// @media only screen and (max-width: 767px) {
//   #Header {
//     flex-direction: column;
//     .titleWrapper {
//       margin-top: 10px;
//       align-items: flex-start;
//       justify-content: space-between;
//       display: flex;
//     }
//   }
// }
