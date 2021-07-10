import React, { useEffect, useState, useMemo } from "react";
import clsx from "clsx";
import { startCase, camelCase } from "lodash";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { styles } from "../../styles/container/groupsets.styles";
import { withStyles } from "@material-ui/core/styles";
import Layout from "Components/Layout";
import Loader from "Components/Loader";
import Select from "Components/Select";
import Notification from "Components/Notification";
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

  const [groupsets, setGroupsets] = useState([]);
  const [groupIdx, setGroupIdx] = useState("0");

  const [errorObject, setErrorObject] = useState({
    open: false,
    message: "",
  });

  const resetError = () => {
    setErrorObject({ open: false, message: "" });
  };

  useEffect(() => {
    fetchGroupSetsData();
  }, []);

  const filteredResourceData = useMemo(() => {
    let filteredResourceList = groupsetsDataObj;

    if (
      Object.keys(filteredResourceList).length > 0 &&
      groupIdx.toString() !== "0"
    ) {
      const filteredObj = {};
      Object.keys(filteredResourceList).filter((key) => {
        if (
          key ===
            groupsets[groupsets.findIndex((item) => item.id === groupIdx)]
              .name ||
          key === "stages" ||
          key === "groups"
        ) {
          filteredObj[key] = filteredResourceList[key];
        }
      });

      filteredResourceList = filteredObj;
    }

    return filteredResourceList;
  }, [groupIdx, groupsetsDataObj]);

  const fetchGroupSetsData = () => {
    setIsLoadingGroupsets(true);
    fetchGroupsets({})
      .then((response) => {
        setIsLoadingGroupsets(false);
        setGroupsetsDataObj(response.data);

        let groupsetsData = response.data.groups.map((item) => {
          return {
            id: item.id,
            name: item.name,
            displayName: startCase(camelCase(item.name)),
          };
        });
        groupsetsData.unshift({ id: "0", name: "All", displayName: "All" });
        setGroupsets(groupsetsData);
      })
      .catch((error) => {
        setIsLoadingGroupsets(false);
        setErrorObject({
          open: true,
          message: error.message,
        });
        console.log("Error in fetching groupsets", error);
      });
  };

  const handleGroupChange = (e) => {
    setGroupIdx(e.target.value);
  };

  const FormRow = ({ dataItem }) => {
    const groupData = dataItem.name;
    return (
      <React.Fragment>
        <Grid item xs={2} className={classes.grid}>
          <Paper className={classes.paper}>
            <div className={classes.title}>&#10095; {groupData}</div>
            <div className={classes.subtitle}>
              {filteredResourceData[groupData]["description"]}
            </div>
          </Paper>
        </Grid>
        {filteredResourceData.stages.map((item, keyIndex) => {
          const keyName = item.stageName;
          if (keyName !== "description") {
            return (
              <Grid
                item
                xs={1}
                className={classes.grid}
                style={{
                  background: `${getColor(
                    filteredResourceData[groupData][keyName]
                  )}`,
                }}
                key={`group-row-column-${keyIndex}`}
              >
                <Paper
                  className={classes.paper}
                  style={{
                    background: `${getColor(
                      filteredResourceData[groupData][keyName]
                    )}`,
                  }}
                >
                  {filteredResourceData[groupData][keyName]}
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

        {filteredResourceData.stages.map((item, index) => {
          return (
            <Grid
              item
              xs={1}
              className={classes.grid}
              key={`group-column-${index}`}
            >
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

        <div className={classes.filterWrapper}>
          <div className={classes.selectStyle}>
            <Select
              options={groupsets}
              labelKey="name"
              placeholder="Groupsets"
              defaultValue={groupIdx}
              handleSelectChange={handleGroupChange}
            />
          </div>
        </div>

        {isLoadingGroupsets && (
          <Loader
            classname={classes.loaderStyle}
            isOpen={true}
            hasLoadingText={true}
            loadingText="Loading..."
          />
        )}
        {!isLoadingGroupsets &&
          Object.keys(filteredResourceData).length === 0 && (
            <div className={classes.emptyStyle}>No groupsets found</div>
          )}
        {!isLoadingGroupsets && Object.keys(filteredResourceData).length > 0 && (
          <Grid container>
            <Grid container item>
              <FormColumn />
            </Grid>
            {filteredResourceData.groups.map((groupData, index) => {
              if (groupIdx === "0" || groupData.id === groupIdx) {
                return (
                  <Grid container item key={`group-row-${index}`}>
                    <FormRow dataItem={groupData} />
                  </Grid>
                );
              }
            })}
          </Grid>
        )}
      </div>
      {errorObject.open && (
        <Notification
          handleClose={resetError}
          open={errorObject.open}
          message={errorObject.message}
          messageType="error"
        />
      )}
    </Layout>
  );
};

export default withStyles(styles, { withTheme: true })(Groupsets);
