import React, { useEffect, useState } from "react";
import clsx from "clsx";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { styles } from "../../styles/container/groupsets.styles";
import { withStyles } from "@material-ui/core/styles";
import Layout from "Components/Layout";
import Loader from "Components/Loader";
import PageTitle from "Components/PageTitle";
import { fetchGroupsets } from "./../../utils/http";

const getColor = (value) => {
  let color = "";
  if (value >= 0 && value < 1) color = "#E34040";
  else if (value >= 1 && value < 2) color = "#DD564D";
  else if (value >= 2 && value < 3) color = "#DD674D";
  else if (value >= 3 && value < 4) color = "#DD704D";
  else if (value >= 4 && value < 5) color = "#DD814D";
  else if (value >= 5 && value < 6) color = "#6CAAE2";
  else if (value >= 6 && value < 7) color = "#50A0E9";
  else if (value >= 7 && value < 8) color = "#3A9FE8";
  else if (value >= 8 && value < 9) color = "#3A7FE8";
  else if (value >= 9 && value < 10) color = "#176FF3";
  else color = "#023F9B";
  return color;
};

const Groupsets = ({ classes, history, title }) => {
  const [isLoadingGroupsets, setIsLoadingGroupsets] = useState(false);
  const [groupsetsDataObj, setGroupsetsDataObj] = useState({});

  useEffect(() => {
    fetchGroupSetsData();
  }, []);

  const fetchGroupSetsData = () => {
    setIsLoadingGroupsets(true);
    fetchGroupsets({})
      .then((response) => {
        setIsLoadingGroupsets(false);
        setGroupsetsDataObj(response.data);
      })
      .catch((error) => {
        setIsLoadingGroupsets(false);
        console.log("Error in fetching groupsets", error);
      });
  };

  const FormRow = ({ dataItem }) => {
    return (
      <React.Fragment>
        <Grid item xs={2} className={classes.grid}>
          <Paper className={classes.paper}>
            <div className={classes.title}>&#10095; {dataItem}</div>
            <div className={classes.subtitle}>
              {groupsetsDataObj[dataItem]["description"]}
            </div>
          </Paper>
        </Grid>
        {Object.keys(groupsetsDataObj[dataItem]).map((keyName, keyIndex) => {
          if (keyName !== "description") {
            return (
              <Grid
                item
                xs={1}
                className={classes.grid}
                style={{
                  background: `${getColor(
                    groupsetsDataObj[dataItem][keyName]
                  )}`,
                }}
              >
                <Paper
                  className={classes.paper}
                  style={{
                    background: `${getColor(
                      groupsetsDataObj[dataItem][keyName]
                    )}`,
                  }}
                >
                  {groupsetsDataObj[dataItem][keyName]}
                </Paper>
              </Grid>
            );
          }
        })}
      </React.Fragment>
    );
  };

  const FormColumn = () => {
    console.log("data", groupsetsDataObj);
    return (
      <React.Fragment>
        <Grid item xs={2} className={classes.grid}>
          <Paper className={classes.paper}>Select Highlighed groups</Paper>
        </Grid>

        {groupsetsDataObj.stages.map((item) => {
          return (
            <Grid item xs={1} className={classes.grid}>
              <Paper className={clsx(classes.paper, classes.fontStyle)}>
                {item.stageName}
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
        {isLoadingGroupsets && (
          <Loader
            classname={classes.loaderStyle}
            isOpen={true}
            hasLoadingText={true}
            loadingText="Loading..."
          />
        )}
        {!isLoadingGroupsets && Object.keys(groupsetsDataObj).length === 0 && (
          <div className={classes.emptyStyle}>No groupsets found</div>
        )}
        {!isLoadingGroupsets && Object.keys(groupsetsDataObj).length > 0 && (
          <Grid container>
            <Grid container item>
              <FormColumn />
            </Grid>
            {groupsetsDataObj.groups.map((groupData) => {
              console.log("group", groupData);
              return (
                <Grid container item>
                  <FormRow dataItem={groupData} />
                </Grid>
              );
            })}
          </Grid>
        )}
      </div>
    </Layout>
  );
};

export default withStyles(styles, { withTheme: true })(Groupsets);
