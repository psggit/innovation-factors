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
    fontSize: 14,
    textTransform: "uppercase",
    marginBottom: 20,
    fontWeight: 600,
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
    fontSize: 24,
    fontWeight: 600,
    color: `${theme.palette.primary.main}`,
  },
  subnote: {
    textTransform: "uppercase",
    fontSize: 18,
    color: `${theme.palette.primary.main}`,
  },
  subheader: {
    marginBottom: 8,
  },
  databox: {
    border: "1px solid #ccbcbc",
    padding: 20,
  },
  inputLabelStyle: {
    marginBottom: 10,
  },
  part1: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  textStyle: {
    textTransform: "capitalize",
    width: 200,
  },
  subtitleWrapper: {
    display: "flex",
    alignItems: "center",
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
  factorStyle: {
    width: 200,
  },
  factorFixBtnStyle: {
    width: 205,
    display: "flex",
    justifyContent: "flex-end",
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
    background: "#efefef",
    color: "#000",
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
  emptyStyle: {
    padding: 30,
    color: `${theme.palette.primary.main}`,
    width: "100%",
  },
  buttonStyle: {
    background: `${theme.palette.primary.main}`,
    width: 100,
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    marginRight: 30,
  },
  filterWrapper: {
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  selectStyle: {
    width: 300,
    marginRight: 30,
    marginBottom: 30,
  },
  imageStyle: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  imageWrapperStyle: {
    display: "flex",
    alignItems: "center",
  },
  factorWrapper: {
    "& .display-appear-done": {
      width: "100%",
      background: "#efefef",
      color: "#000",
    },
    "& .display-appear-active": {
      width: "100%",
      transition: "all 300ms",
      background: "#ccbcbc",
      color: "#000",
    },
  },
});
