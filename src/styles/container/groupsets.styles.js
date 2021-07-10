export const styles = (theme) => ({
  paper: {
    padding: 15,
    textAlign: "center",

    borderRadius: 0,
    wordBreak: "break-word",
    boxShadow: "none",
    //padding: 20
  },
  grid: {
    border: "1px solid #CBC4C1",
    //textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    marginBottom: "10px",
    textTransform: "capitalize",
  },
  subtitle: {
    background: `${theme.palette.primary.main}`,
    padding: "10px",
    textTransform: "capitalize",
  },
  fontStyle: {
    textTransform: "capitalize",
  },
  filterWrapper: {
    width: 200,
  },
  selectStyle: {
    marginBottom: 30,
  },
});
