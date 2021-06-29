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
import Loader from "Components/Loader";
import Notification from "Components/Notification";
import BarChart from "./components/barchart";
import DoughnutChart from "./components/doughnutChart";
import HalfDoughnutChart from "./components/HalfDonutChart";
// import LineChart from "./components/linechart";
import Button from "./../../components/Button";
import { fetchDashboard } from "./../../utils/http";

const InnovationFactor = ({ classes, title, history }) => {
  const [isLoadingInnovationFactor, setIsLoadingInnovationFactor] =
    useState(false);
  const [innovationCapacityData, setInnovationCapacityData] = useState({});
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
  }, []);

  const fetchInnovationData = () => {
    setIsLoadingInnovationFactor(true);
    fetchDashboard({})
      .then((response) => {
        setIsLoadingInnovationFactor(false);
        processResponse(response.data);
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
      data.dashboard.promoter,
      data.dashboard.passive,
    ];
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
            <div className={classes.textStyle}>{props.data.score}</div>
            <Button
              text="Improvement Resources"
              color="primary"
              onClick={() => handleimprovementRes(props.data.id)}
            />
          </div>
          <div className={classes.part2}>
            <div className={clsx(classes.titleWrapper)}>
              <ArrowDropDownIcon />
              <p
                className={classes.textBorder}
                onClick={() => handleShowFactorDetails(props.data)}
              >
                Innovation Factors
              </p>
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
                          <div>{item.name}</div>
                          <div>{item.score}</div>
                          <Button text="Factor Fix" color="primary" />
                        </div>
                        <p className={classes.factorDataDesc}>
                          {item.factorFixText}
                        </p>
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
                        {innovationCapacityData.dashboard.promotor}%
                      </p>
                      <p className={classes.label}>Promoter</p>
                    </div>
                    <div className={classes.dataNote}>
                      <p className={classes.value}>
                        {innovationCapacityData.dashboard.passive}%
                      </p>
                      <p className={classes.label}>Passive</p>
                    </div>
                    <div className={classes.dataNote}>
                      <p className={classes.value}>
                        {innovationCapacityData.dashboard.detractor}%
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
            <div className={classes.contentWrapper}>
              <div className={classes.headerWrapper}>
                <span className={classes.header}>Spotlight </span>
                <span className={classes.subnote}>
                  on the highest and lowest scores
                </span>
              </div>
              <div className={classes.subheader}>
                <p>Here are your strongest areas:</p>
              </div>
              {Object.keys(innovationCapacityData.strengths).map(
                (keyName, index) => {
                  return (
                    <div style={{ marginBottom: 20 }} key={`strengths${index}`}>
                      <p className={classes.subtitle}>{keyName}</p>
                      <DataBox
                        data={innovationCapacityData.strengths[keyName]}
                      />
                    </div>
                  );
                }
              )}
            </div>
            <div className={classes.contentWrapper}>
              <div className={classes.subheader}>
                <p>To improve your innovation capacity focus on these:</p>
              </div>
              {Object.keys(innovationCapacityData.weakness).map(
                (keyName, index) => {
                  return (
                    <div style={{ marginBottom: 20 }} key={`weakness${index}`}>
                      <p className={classes.subtitle}>{keyName}</p>
                      <DataBox
                        data={innovationCapacityData.weakness[keyName]}
                      />
                    </div>
                  );
                }
              )}
            </div>
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
