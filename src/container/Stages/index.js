/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useCallback } from "react";
import Layout from "Components/Layout";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import InputLabel from "Components/InputLabel";
import Notification from "Components/Notification";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Collapse from "@material-ui/core/Collapse";
import PageTitle from "Components/PageTitle";
import Button from "Components/Button";
import Loader from "Components/Loader";
import Select from "Components/Select";
import clsx from "clsx";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { fetchStages } from "./../../utils/http";
import { styles } from "./../../styles/container/innovationCapacity.styles";
import { withStyles } from "@material-ui/core/styles";

const Stages = ({ classes, history, title }) => {
  const [stages, setStages] = useState([]);
  const [isLoadingStages, setIsLoadingStages] = useState(false);
  const [showDetails, setShowDetails] = useState("");

  const [groupsetIdx, setGroupsetIdx] = useState("0");
  const [groupsetData, setGroupsetData] = useState([]);

  const [selectedFactorId, setSelectedFactorId] = useState("");

  const [errorObject, setErrorObject] = useState({
    open: false,
    message: "",
  });

  const resetError = () => {
    setErrorObject({ open: false, message: "" });
  };

  useEffect(() => {
    getStagesData();
  }, [groupsetIdx]);

  const handleShowFactorDetails = (data) => {

    if (showDetails.includes(',' + data.stageId)) {
      let facId = showDetails
      setShowDetails(facId.replace( (',' + data.stageId), ''));
    } else {
      let facId = showDetails
      setShowDetails(facId + ',' + data.stageId);
    }
  };

  const handleimprovementRes = (stageId) => {
    //console.log("id", stageId);
    history.push(`/improvement-resources?stageId=${stageId}`);
  };

  const handleGroupChange = (e) => {
    setGroupsetIdx(e.target.value);
  };

  const getStagesData = useCallback(() => {
    setIsLoadingStages(true);
    fetchStages({ groupsetId: groupsetIdx === "0" ? "" : groupsetIdx })
      .then((response) => {
        setStages(response.data.stages);

        const groupsetsData = response.data.groupsets;
        groupsetsData.unshift({ id: "0", name: "All" });

        setGroupsetData(groupsetsData);
        setIsLoadingStages(false);
      })
      .catch((error) => {
        setIsLoadingStages(false);
        setErrorObject({
          open: true,
          message: error.message,
        });
        console.log("Error in fetching stages", error);
      });
  }, [groupsetIdx]);


  const handleFactorClick = (item) => {
    if (selectedFactorId.includes(',' + item.factorId)) {
      let facId = selectedFactorId
      setSelectedFactorId(facId.replace( (',' + item.factorId), ''));
    } else {
      let facId = selectedFactorId

      setSelectedFactorId(facId + ',' + item.factorId);
    }
  };

  const DataBox = (props) => {
    return (
      <Card style={{ marginBottom: 20 }}>
        <div className={classes.databox}>
          <div className={classes.part1}>
            <div className={clsx(classes.textStyle, classes.imageWrapperStyle)}>
              {props.data.icon && (
                <span>
                  <img
                    className={classes.imageStyle}
                    src={`data:image/png;base64, ${props.data.icon}`}
                    alt=""
                  />
                </span>
              )}
              <span>{props.data.stageName}</span>
            </div>
            <div className={classes.textStyle}>{parseFloat(props.data.score).toFixed(1)}</div>
            <Button
              text="Improvement Resources"
              color="primary"
              onClick={() => handleimprovementRes(props.data.stageId)}
            />
          </div>
          <div className={classes.part2}>
            <div
              className={clsx(classes.titleWrapper)}
              onClick={() => handleShowFactorDetails(props.data)}
            >
              <ArrowDropDownIcon />
              <p className={classes.textBorder}>Innovation Factors</p>
            </div>
            <Collapse
              in={showDetails.includes(',' + props.data.stageId)}
              timeout="auto"
              unmountOnExit
            >
              <CardContent>
                {props.data.factors.map((item, index) => {
                  return (
                    <div key={`factor${index}`}>
                      <div className={classes.factorDataWrapper}>
                        <div className={classes.factorData}>
                          <div className={classes.factorStyle}>
                            <FiberManualRecordIcon
                              fontSize="small"
                              style={{ width: 10, height: 10, marginRight: 4 }}
                            />
                            {item.name}
                          </div>
                          <div className={classes.factorStyle}>
                            {item.score
                              ? parseFloat(item.score).toFixed(1)
                              : ""}
                          </div>
                          <div className={classes.factorFixBtnStyle}>
                            <Button
                              text="Factor Fix"
                              color="primary"
                              onClick={() => handleFactorClick(item)}
                            />
                          </div>
                        </div>
                        {selectedFactorId.includes(',' + item.factorId) && (
                          <p className={classes.factorDataDesc}>
                            {item.factorFixText}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Collapse>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <Layout>
      <PageTitle title={title} />
      <div className={classes.selectStyle}>
        <InputLabel classname={classes.inputLabelStyle}>Groupset</InputLabel>
        <Select
          options={groupsetData}
          labelKey="name"
          placeholder="Groups"
          defaultValue={groupsetIdx}
          handleSelectChange={handleGroupChange}
        />
      </div>
      <div>
        {isLoadingStages && (
          <Loader
            classname={classes.loaderStyle}
            isOpen={true}
            hasLoadingText={true}
            loadingText="Loading..."
          />
        )}
        {!isLoadingStages && stages.length === 0 && (
          <div className={classes.emptyStyle}>No stages found</div>
        )}
        {!isLoadingStages &&
          stages.map((item, index) => {
            return <DataBox key={`stages-${index}`} data={item} />;
          })}
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

export default withStyles(styles, { withTheme: true })(Stages);
