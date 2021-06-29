export const styles = (theme) => ({
  graphWrapper: {
    display: "flex",
    justifyContent: "space-between",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  overviewWrapper: {
    display: "flex",
    flexDirection: "column",
    border: "1px solid #ccbcbc",
    width: "49%",
    padding: 30,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  section1: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    paddingBottom: 30,
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  section2: {
    display: "flex",
    justifyContent: "space-evenly",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  title: {
    fontSize: 12,
    textTransform: "uppercase",
    marginBottom: 20,
    textAlign: "left",
    color: `${theme.palette.primary.main}`,
  },
  barWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  note: {
    marginLeft: 20,
  },
  dataNote: {
    borderRight: `1px solid ${theme.palette.primary.main}`,
    padding: 10,
    display: "flex",
    justifyContent: "flex-end",
    flexDirection: "column",
    [theme.breakpoints.down("sm")]: {
      borderBottom: `1px solid ${theme.palette.primary.main}`,
    },
  },
  value: {
    marginBottom: 20,
  },
  label: {
    fontSize: 12,
  },
  headerWrapper: {
    padding: "30px 0",
  },
  header: {
    textTransform: "captialize",
    fontSize: 18,
    fontWeight: 600,
    color: `${theme.palette.primary.main}`,
  },
  subnote: {
    textTransform: "uppercase",
    fontSize: 12,
    color: `${theme.palette.primary.main}`,
  },
  subheader: {
    marginBottom: 8,
  },
  databox: {
    border: "1px solid #ccbcbc",
    padding: 20,
  },
  part1: {
    display: "flex",
    justifyContent: "space-between",
  },
  textStyle: {
    textTransform: "capitalize",
    width: 200,
  },
  subtitle: {
    padding: "10px 0",
    textTransform: "uppercase",
    color: theme.palette.primary.main,
  },
  textBorder: {
    padding: 10,
  },
  factorData: {
    display: "flex",
    justifyContent: "space-between",
    padding: "20px 0px 0 0px",
    alignItems: "center",
  },
  titleWrapper: {
    display: "flex",
    alignItems: "center",
    borderBottom: `2px solid ${theme.palette.primary.main}`,
    cursor: "pointer",
    // webkitTransition: "1s",
    // transition: "1s",
  },
  titleWrapperTransition: {},
  factorDataDesc: {
    background: "#ccbcbc",
    color: "#FFFFFF",
    marginBottom: 10,
    padding: "10px 5px",
  },
  contentWrapper: {
    marginBottom: 50,
  },
  wordCloudStyle: {
    width: 400,
    height: 400,
    position: "relative",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, 0%)",
    [theme.breakpoints.down("sm")]: {
      width: 200,
      height: 200,
    },
  },
  // expand: {
  //   transform: "rotate(0deg)",
  //   marginLeft: "auto",
  //   transition: theme.transitions.create("transform", {
  //     duration: theme.transitions.duration.shortest,
  //   }),
  // },
  // expandOpen: {
  //   transform: "rotate(180deg)",
  // },
});
