/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Collapse from "@material-ui/core/Collapse";
import { styles } from "./../../styles/container/innovationCapacity.styles";
import { withStyles } from "@material-ui/core/styles";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import Layout from "Components/Layout";
import PageTitle from "Components/PageTitle";
import Select from "Components/Select";
import Loader from "Components/Loader";
import InputLabel from "Components/InputLabel";
import Notification from "Components/Notification";
import BarChart from "./components/barchart";
import DoughnutChart from "./components/doughnutChart";
import HalfDoughnutChart from "./components/HalfDonutChart";
// import LineChart from "./components/linechart";
import Button from "./../../components/Button";
import { fetchDashboard } from "./../../utils/http";
import { getQueryParamByName } from "./../../utils/helpers";

const InnovationFactor = ({ classes, title, history }) => {
  const [isLoadingInnovationFactor, setIsLoadingInnovationFactor] =
    useState(false);
  const [innovationCapacityData, setInnovationCapacityData] = useState({});

  const [stages, setStages] = useState([]);
  const [stageIdx, setStageIdx] = useState("0");

  const [groups, setGroups] = useState([]);
  const [groupIdx, setGroupIdx] = useState(
    getQueryParamByName("groupIdx") ? getQueryParamByName("groupIdx") : "0"
  );

  const [defaultFactors, setDefaultFactors] = useState([]);
  const [factors, setFactors] = useState([]);
  const [factorIdx, setFactorIdx] = useState("0");
  const [selectedFactorId, setSelectedFactorId] = useState("");

  const [barChartData, setBarChartData] = useState({});
  //const [lineChartData, setLineChartData] = useState({});
  const [doughnutData, setDoughnutData] = useState([]);
  const [halfDoughnutData, setHalfDoughnutData] = useState([]);

  const [showDetails, setShowDetails] = useState("");
  const [errorObject, setErrorObject] = useState({
    open: false,
    message: "",
  });

  const resetError = () => {
    setErrorObject({ open: false, message: "" });
  };

  useEffect(() => {
    fetchInnovationData();
  }, [stageIdx, groupIdx, factorIdx]);

  useEffect(() => {
    if (stages && stages.length > 0 && stageIdx !== "0") getFactors();
  }, [stageIdx]);

  const getFactors = () => {
    const factors =
      stages[stages.findIndex((stage) => stage.id === stageIdx)].factors;

    const modifiedFactors = factors.map((factor) => {
      return {
        id: factor.factorId,
        name: factor.factorName,
      };
    });
    modifiedFactors.unshift({ id: "0", name: "All" });

    setFactors(modifiedFactors);
  };

  const fetchInnovationData = () => {
    setIsLoadingInnovationFactor(true);
    fetchDashboard({
      stageId: stageIdx !== "0" ? stageIdx : "",
      factorId: factorIdx !== "0" ? factorIdx : "",
      groupsetId: groupIdx !== "0" ? groupIdx : "",
    })
      .then((response) => {
        setIsLoadingInnovationFactor(false);
        processResponse(response.data.displayData);

        const groupsetsData = response.data.groupsets;
        groupsetsData.unshift({ id: "0", name: "All" });

        setGroups(groupsetsData);

        const stagesData = response.data.stages.map((stage) => {
          return {
            id: stage.stageId,
            name: stage.stageName,
            factors: stage.factors,
          };
        });
        stagesData.unshift({ id: "0", name: "All" });
        setStages(stagesData);

        let factorsArray = [];
        const factorsData = response.data.stages.map((stage) => {
          return stage.factors.map((factor) => {
            const factorObj = {
              id: factor.factorId,
              name: factor.factorName,
            };
            factorsArray = [...factorsArray, factorObj];
            return "";
          });
        });
        factorsArray.unshift({ id: "0", name: "All" });
        setDefaultFactors(factorsArray);
      })
      .catch((error) => {
        setIsLoadingInnovationFactor(false);
        setErrorObject({
          open: true,
          message: error.message,
        });
        console.log("Error in fetching innovation data", error);
      });
  };

  const processResponse = (data) => {
    const barChartData = {},
      barChartLabels = [],
      barChartValues = [];
    for (let i = 10; i <= data.dashboard.participation; i = i + 10) {
      barChartLabels.push(i);
      barChartValues.push(i * 10);
    }
    barChartData.labels = barChartLabels;
    barChartData.values = barChartValues;
    setBarChartData(barChartData);

    // let lineChartData = {},
    //   lineChartLabels = [],
    //   lineChartValues = [];
    // lineChartValues = data.dashboard.capacityHistory.map((item, index) => item);
    // lineChartLabels = data.dashboard.capacityHistory.map(
    //   (item, index) => index
    // );
    // lineChartData.labels = lineChartLabels;
    // lineChartData.values = lineChartValues;
    // setLineChartData(lineChartData);

    const doughnutData = [
      data.dashboard.detractor,
      data.dashboard.promotor,
      data.dashboard.passive,
    ];
    console.log("doughnutData1313", doughnutData);
    setDoughnutData(doughnutData);

    const halfDoughnutData = [
      data.dashboard.innovationCapacity * 10,
      100 - data.dashboard.innovationCapacity * 10,
    ];
    setHalfDoughnutData(halfDoughnutData);

    setInnovationCapacityData(data);
  };

  const handleShowFactorDetails = (data) => {
    //console.log("data", data, data.id);
    if (!showDetails) setShowDetails(data.id);
    else if (showDetails)
      setShowDetails(showDetails === data.id ? "" : data.id);
  };

  const handleimprovementRes = (stageId) => {
    console.log("id", stageId);
    history.push(`/improvement-resources?stageId=${stageId}`);
  };

  const DataBox = (props) => {
    return (
      <Card>
        <div className={classes.databox}>
          <div className={classes.part1}>
            <div className={classes.textStyle}>{props.data.name}</div>
            <div className={classes.textStyle}>
              {props.data.score ? parseFloat(props.data.score).toFixed(1) : ""}
            </div>
            <Button
              text="Improvement Resources"
              color="primary"
              onClick={() => handleimprovementRes(props.data.id)}
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
              in={showDetails === props.data.id}
              timeout="auto"
              unmountOnExit
            >
              <CardContent>
                {props.data.factors.map((item, index) => {
                  return (
                    <div key={`factor${index}`}>
                      <div className={classes.factorDataWrapper}>
                        <div className={classes.factorData}>
                          <div className={classes.factorStyle}>{item.name}</div>
                          <div>{item.score}</div>
                          <Button
                            text="Factor Fix"
                            color="primary"
                            onClick={() => handleFactorClick(item)}
                          />
                        </div>
                        {selectedFactorId === item.factorId && (
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

  const handleStageChange = (e) => {
    setStageIdx(e.target.value);
  };

  const handleGroupChange = (e) => {
    setGroupIdx(e.target.value);
  };

  const handleFactorChange = (e) => {
    setFactorIdx(e.target.value);
  };

  const handleFactorClick = (item) => {
    setSelectedFactorId(item.factorId);
  };

  return (
    <Layout>
      <PageTitle title={title} />
      <div className={classes.filterWrapper}>
        <div className={classes.selectStyle}>
          <InputLabel classname={classes.inputLabelStyle}>Groupset</InputLabel>
          <Select
            options={groups}
            labelKey="name"
            placeholder="Groups"
            defaultValue={groupIdx}
            handleSelectChange={handleGroupChange}
          />
        </div>
        <div className={classes.selectStyle}>
          <InputLabel classname={classes.inputLabelStyle}>Stage</InputLabel>
          <Select
            options={stages}
            labelKey="name"
            placeholder="Stages"
            defaultValue={stageIdx}
            handleSelectChange={handleStageChange}
          />
        </div>
        <div className={classes.selectStyle}>
          <InputLabel classname={classes.inputLabelStyle}>Factor</InputLabel>
          <Select
            options={stageIdx !== "0" ? factors : defaultFactors}
            labelKey="name"
            placeholder="Factors"
            defaultValue={factorIdx}
            handleSelectChange={handleFactorChange}
          />
        </div>
      </div>
      {isLoadingInnovationFactor && (
        <Loader
          classname={classes.loaderStyle}
          isOpen={true}
          hasLoadingText={true}
          loadingText="Loading..."
        />
      )}
      {!isLoadingInnovationFactor &&
        Object.keys(innovationCapacityData).length > 0 && (
          <>
            <div className={classes.graphWrapper}>
              <div className={classes.overviewWrapper}>
                <div className={classes.section1}>
                  <div>
                    <p className={classes.title}>Innovation Capacity</p>
                    <HalfDoughnutChart data={halfDoughnutData} />
                  </div>

                  <div>
                    <p className={classes.title}>Participation</p>
                    <div className={classes.barWrapper}>
                      <BarChart
                        labels={barChartData.labels}
                        values={barChartData.values}
                      />
                      <span className={classes.note}>
                        {innovationCapacityData.dashboard.participation}%
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <p className={classes.title}>NPS</p>
                  <div className={classes.section2}>
                    <div>
                      <DoughnutChart data={doughnutData} />
                    </div>
                    <div className={classes.dataNote}>
                      <p className={classes.value}>
                        {innovationCapacityData.dashboard.promotor?.toFixed(1)}%
                      </p>
                      <p className={classes.label}>Promoter</p>
                    </div>
                    <div className={classes.dataNote}>
                      <p className={classes.value}>
                        {innovationCapacityData.dashboard.passive?.toFixed(1)}%
                      </p>
                      <p className={classes.label}>Passive</p>
                    </div>
                    <div className={classes.dataNote}>
                      <p className={classes.value}>
                        {innovationCapacityData.dashboard.detractor?.toFixed(1)}
                        %
                      </p>
                      <p className={classes.label}>Detractor</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className={classes.overviewWrapper}>
                <p className={classes.title}>Innovation Capacity Over Time</p>
                <LineChart
                  labels={lineChartData.labels}
                  values={lineChartData.values}
                />
              </div> */}
            </div>
            {(Object.keys(innovationCapacityData.strengths).length > 0 ||
              Object.keys(innovationCapacityData.weakness).length > 0) && (
              <>
                <div className={classes.headerWrapper}>
                  <span className={classes.header}>Spotlight </span>
                  <span className={classes.subnote}>
                    on the highest and lowest scores
                  </span>
                </div>
                <div className={classes.subheader}>
                  <p>Here are your strongest areas:</p>
                </div>
              </>
            )}
            {Object.keys(innovationCapacityData.strengths).length > 0 && (
              <div className={classes.contentWrapper}>
                {Object.keys(innovationCapacityData.strengths).map(
                  (keyName, index) => {
                    return (
                      <div
                        style={{ marginBottom: 20 }}
                        key={`strengths${index}`}
                      >
                        <p className={classes.subtitle}>{keyName}</p>
                        <DataBox
                          data={innovationCapacityData.strengths[keyName]}
                        />
                      </div>
                    );
                  }
                )}
              </div>
            )}
            {Object.keys(innovationCapacityData.weakness).length > 0 && (
              <div className={classes.contentWrapper}>
                <div className={classes.subheader}>
                  <p>To improve your innovation capacity focus on these:</p>
                </div>
                {Object.keys(innovationCapacityData.weakness).map(
                  (keyName, index) => {
                    return (
                      <div
                        style={{ marginBottom: 20 }}
                        key={`weakness${index}`}
                      >
                        <p className={classes.subtitle}>{keyName}</p>
                        <DataBox
                          data={innovationCapacityData.weakness[keyName]}
                        />
                      </div>
                    );
                  }
                )}
              </div>
            )}
          </>
        )}
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

export default withStyles(styles, { withTheme: true })(InnovationFactor);
