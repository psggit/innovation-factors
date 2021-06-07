export const styles = (theme) => ({
  header: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px",
    width: "100%",
    zIndex: "1201",
    position: "relative",
    borderBottom: `5px solid ${theme.palette.primary.main}`,
    backgroundColor: "#fff",
  },
  iconWrapper: {
    display: "flex",
    alignItems: "center",
  },
  logoImg: {
    width: 150,
    height: 50,
    marginLeft: 12,
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
  },
  title: {
    fontFamily: `"Proxima_Nova_Bold", "Fallback", "sans-serif"`,
    marginRight: 10,
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
