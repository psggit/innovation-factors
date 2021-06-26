export const styles = (theme) => ({
  improvementResWrapper: {
    //height: "100vh",
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
  videoWrapper: {
    display: "grid",
    gridTemplateColumns: "500px 500px",
    gap: 16,
    [theme.breakpoints.down("sm")]: {
      gridTemplateColumns: "100%",
      justifyContent: "center",
    },
  },
  videoStyle: {
    width: 500,
    border: `1px solid ${theme.palette.primary.main}`,
    cursor: "pointer",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  row1: {
    display: "flex",
    justifyContent: "space-between",
    padding: 20,
  },
  row3: {
    padding: 20,
  },
  imageStyle: {
    width: "100%",
    height: "200px",
    borderTop: `1px solid ${theme.palette.primary.main}`,
    borderBottom: `1px solid ${theme.palette.primary.main}`,
  },
  note: {
    marginBottom: 8,
  },
  buttonStyle: {
    background: `${theme.palette.primary.main}`,
    color: "#FFFFFF",
    padding: 10,
  },
  emptyStyle: {
    gridTemplateColumns: "1fr",
    // background: "#F3F3F7",
    padding: 20,
    color: `${theme.palette.primary.main}`,
    width: "100%",
  },
  loaderStyle: {
    zIndex: 1024,
  },
});
