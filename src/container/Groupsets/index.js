import React, { useEffect, useState, useMemo } from "react";
import clsx from "clsx";
import { startCase, camelCase } from "lodash";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { styles } from "../../styles/container/groupsets.styles";
import { withStyles } from "@material-ui/core/styles";
import Layout from "Components/Layout";
import InputLabel from "Components/InputLabel";
import Loader from "Components/Loader";
import AutoCompleteMultiSelect from "Components/Autocomplete/multiSelect";
import Notification from "Components/Notification";
import PageTitle from "Components/PageTitle";
import { fetchGroupsets } from "./../../utils/http";

const getColor = (value) => {
  let color = "";
  if (value >= 0 && value < 1) color = "#FF0000";
  else if (value >= 1 && value < 2) color = "#FF0000";
  else if (value >= 2 && value < 3) color = "#F88608";
  else if (value >= 3 && value < 4) color = "#FFC000";
  else if (value >= 4 && value < 5) color = "#FFE285";
  else if (value >= 5 && value < 6) color = "#FFFFFF";
  else if (value >= 6 && value < 7) color = "#DDEBF7";
  else if (value >= 7 && value < 8) color = "#BDD7EE";
  else if (value >= 8 && value < 9) color = "#8EA9DB";
  else if (value >= 9 && value < 10) color = "#2F75B5";
  else color = "#2F75B5";
  return color;
};

const Groupsets = ({ classes, history, title }) => {
  const [isLoadingGroupsets, setIsLoadingGroupsets] = useState(false);
  const [groupsetsDataObj, setGroupsetsDataObj] = useState({});

  const [groupsets, setGroupsets] = useState([]);
  const [selectedGroups, setSelectedGroups] = React.useState([]);

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

  const filteredGroupsetsData = useMemo(() => {
    let filteredGroupsets = groupsetsDataObj;

    if (
      Object.keys(filteredGroupsets).length > 0 &&
      selectedGroups?.length > 0
    ) {
      const filteredObj = {};
      Object.keys(filteredGroupsets).filter((key) => {
        if (
          (selectedGroups.findIndex((item) => item.value === key) !== -1 &&
            key ===
              selectedGroups[
                selectedGroups.findIndex((item) => item.value === key)
              ].value) ||
          key === "stages" ||
          key === "groups"
        ) {
          filteredObj[key] = filteredGroupsets[key];
        }
      });

      filteredGroupsets = filteredObj;
    }

    return filteredGroupsets;
  }, [selectedGroups, groupsetsDataObj]);

  const fetchGroupSetsData = () => {
    setIsLoadingGroupsets(true);
    fetchGroupsets({})
      .then((response) => {
        setIsLoadingGroupsets(false);
        setGroupsetsDataObj(response.data);

        let groupsetsData = response.data.groups.map((item) => {
          return {
            id: item.id,
            value: item.name,
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

  // const handleGroupChange = (e) => {
  //   setGroupIdx(e.target.value);
  // };

  const handleBoxClick = (groupsetId) => {
    history.push(`/innovation-capacity?groupIdx=${groupsetId}`);
  };

  const FormRow = ({ dataItem }) => {
    const groupData = dataItem.name;
    return (
      <React.Fragment>
        <Grid item xs={2} className={classes.grid}>
          <Paper
            className={classes.paper}
            onClick={() => handleBoxClick(dataItem.id)}
            style={{ cursor: "pointer" }}
          >
            <div className={classes.title}>&#10095; {groupData}</div>
            <div className={classes.subtitle}>
              {filteredGroupsetsData[groupData]["description"]}
            </div>
          </Paper>
        </Grid>
        {filteredGroupsetsData.stages.map((item, keyIndex) => {
          const keyName = item.stageName;
          if (keyName !== "description") {
            return (
              <Grid
                item
                xs={1.5}
                className={classes.grid}
                style={{
                  background: `${getColor(
                    filteredGroupsetsData[groupData][keyName]
                  )}`,
                  flexGrow: 1,
                }}
                key={`group-row-column-${keyIndex}`}
              >
                <Paper
                  className={classes.paper}
                  style={{
                    background: `${getColor(
                      filteredGroupsetsData[groupData][keyName]
                    )}`,
                  }}
                >
                  {parseFloat(
                    filteredGroupsetsData[groupData][keyName]
                  ).toFixed(1)}
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
          {/* <Paper className={classes.paper}>Select Highlighed groups</Paper> */}
        </Grid>

        {filteredGroupsetsData.stages.map((item, index) => {
          return (
            <Grid
              item
              xs={1.5}
              className={classes.grid}
              key={`group-column-${index}`}
            >
              <Paper className={clsx(classes.paper, classes.fontStyle)}>
                <div className={classes.columnStyle}>
                  <div>
                    {item.icon && (
                      <img
                        src={`data:image/png;base64, ${item.icon}`}
                        alt={`${item.stageName}_icon`}
                        className={classes.iconStyle}
                      />
                    )}
                  </div>
                  <div> {item.stageName}</div>
                </div>
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
            <InputLabel classname={classes.inputLabelStyle}>
              Groupset
            </InputLabel>
            {/* <Select
              options={groupsets}
              labelKey="name"
              placeholder="Groupsets"
              defaultValue={groupIdx}
              handleSelectChange={handleGroupChange}
            /> */}
            <AutoCompleteMultiSelect
              id="autocomplete-value-controlled-box"
              optionList={groupsets}
              value={selectedGroups}
              handleSearchChange={(e, v) => {
                setSelectedGroups(v);
              }}
              style={{ width: 300, marginTop: 16, marginBottom: 8 }}
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
          Object.keys(filteredGroupsetsData).length === 0 && (
            <div className={classes.emptyStyle}>No groupsets found</div>
          )}
        {!isLoadingGroupsets && Object.keys(filteredGroupsetsData).length > 0 && (
          <Grid container xs={12}>
            <Grid container item>
              <FormColumn />
            </Grid>
            {filteredGroupsetsData.groups.map((groupData, index) => {
              if (
                selectedGroups.length === 0 ||
                (selectedGroups &&
                  selectedGroups.findIndex(
                    (group) => group.value === groupData.name
                  ) !== -1)
              ) {
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
