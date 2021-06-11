import React, { useEffect, useState } from "react";
import clsx from "clsx";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { styles } from "../../styles/container/groupsets.styles";
import { withStyles } from "@material-ui/core/styles";
import Layout from "Components/Layout";
import PageTitle from "Components/PageTitle";
import { groupsetsData } from "./../../mockData";

const getColor = (value) => {
  let color = "";
  if (value > 7 && value <= 7.5) color = "red";
  if (value > 7.5 && value <= 8) color = "blue";
  return color;
};

const Groupsets = ({ classes, history, title }) => {
  const [groupsetsDataObj, setGroupsetsDataObj] = useState({});

  useEffect(() => {
    setGroupsetsDataObj(groupsetsData);
  }, []);

  const FormRow = ({ data }) => {
    return (
      <React.Fragment>
        <Grid item xs={2} className={classes.grid}>
          <Paper className={classes.paper}>
            <div className={classes.title}>&#10095; {data}</div>
            <div className={classes.subtitle}>
              {groupsetsData.data[data]["description"]}
            </div>
          </Paper>
        </Grid>
        {Object.keys(groupsetsData.data[data]).map((keyName, keyIndex) => {
          if (keyName !== "description") {
            return (
              <Grid
                item
                xs={1}
                className={classes.grid}
                style={{
                  background: `${getColor(groupsetsData.data[data][keyName])}`,
                }}
              >
                <Paper
                  className={classes.paper}
                  style={{
                    background: `${getColor(
                      groupsetsData.data[data][keyName]
                    )}`,
                  }}
                >
                  {groupsetsData.data[data][keyName]}
                </Paper>
              </Grid>
            );
          }
        })}
      </React.Fragment>
    );
  };

  const FormColumn = () => {
    return (
      <React.Fragment>
        <Grid item xs={2} className={classes.grid}>
          <Paper className={classes.paper}>Select Highlighed groups</Paper>
        </Grid>

        {groupsetsData.data.stages.map((item) => {
          return (
            <Grid item xs={1} className={classes.grid}>
              <Paper className={clsx(classes.paper, classes.fontStyle)}>
                {item.name}
              </Paper>
            </Grid>
          );
        })}
      </React.Fragment>
    );
  };

  return (
    <Layout>
      <div className={classes.root}>
        <PageTitle title={title} />
        <Grid container>
          <Grid container item>
            <FormColumn />
          </Grid>
          {groupsetsData.data.groupSets.map((item) => {
            return (
              <Grid container item>
                <FormRow data={item} />
              </Grid>
            );
          })}
        </Grid>
      </div>
    </Layout>
  );
};

export default withStyles(styles, { withTheme: true })(Groupsets);
