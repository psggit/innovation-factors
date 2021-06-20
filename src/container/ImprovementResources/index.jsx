import React, { useState, useEffect, useMemo } from "react";
import { styles } from "./../../styles/container/improvementCapacity.styles";
import { withStyles } from "@material-ui/core/styles";
import Layout from "./../../components/Layout";
import PageTitle from "./../../components/PageTitle";
import Select from "./../../components/Select";
import { improvementCapacity } from "./../../mockData";
import { getQueryParamByName } from "./../../utils/helpers";
import { fetchImprovementResource } from "./../../utils/http/index";

const ImprovementResource = ({ classes, title }) => {
  const [improvementResourceData, setImprovementResourceData] = useState({});
  const [stageOptions, setStageOptions] = useState([]);
  const [stage, setStage] = useState(
    getQueryParamByName("stageId") ? getQueryParamByName("stageId") : "0"
  );
  const [resourceData, setResourceData] = useState([]);

  useEffect(() => {
    //setImprovementResourceData(improvementCapacity);

    getImprovementResource();

    //const data = improvementCapacity;
    // let stageOptionsData = data.stages.map((item) => {
    //   return {
    //     id: item.stageId,
    //     name: item.stageName,
    //   };
    // });

    // stageOptionsData.unshift({ id: "0", name: "All" });
    // setStageOptions(stageOptionsData);
    // setResourceData(data.resource);
  }, []);

  const getImprovementResource = () => {
    fetchImprovementResource({ stage: "", type: "" })
      .then((response) => {
        const data = response.data;
        let stageOptionsData = data.stages.map((item) => {
          return {
            id: item.stageId,
            name: item.stageName,
          };
        });
        stageOptionsData.unshift({ id: "0", name: "All" });
        setStageOptions(stageOptionsData);
        setResourceData(data.resource);
      })
      .catch((error) => {
        console.log("Error in fetching improvement resources", error);
      });
  };

  const handleStageChange = (e) => {
    setStage(e.target.value);
  };

  const handleBoxClick = (link) => {
    window.open(link);
  };

  const filteredResourceData = useMemo(() => {
    if (stage === "0") {
      return resourceData;
    } else if (stage !== "none") {
      return resourceData.filter((item) => {
        return item.stageId === stage.toString();
      });
    } else {
      return [];
    }
  }, [stage, resourceData]);

  return (
    <Layout>
      <PageTitle title={title} />
      <div className={classes.improvementResWrapper}>
        <div className={classes.filterWrapper}>
          <div className={classes.selectStyle}>
            <Select
              options={stageOptions}
              labelKey="name"
              placeholder="Stage"
              defaultValue={stage}
              handleSelectChange={handleStageChange}
            />
          </div>
        </div>
        <div
          className={
            filteredResourceData.length !== 0
              ? classes.videoWrapper
              : classes.emptyStyle
          }
        >
          {filteredResourceData.length === 0 && <div>No records found</div>}
          {filteredResourceData.length > 0 &&
            filteredResourceData.map((item) => {
              return (
                <div
                  className={classes.videoStyle}
                  onClick={() => handleBoxClick(item.link)}
                >
                  <div className={classes.row1}>
                    <div className={classes.buttonStyle}>{item.stage}</div>
                    {item.type === "video" && (
                      <div className={classes.buttonStyle}>Video</div>
                    )}
                    {item.type === "article" && (
                      <div className={classes.buttonStyle}>Article</div>
                    )}
                  </div>
                  <div className={classes.row2}>
                    <img
                      className={classes.imageStyle}
                      src={`data:image/png;base64,${item.image}`}
                      alt=""
                    />
                  </div>
                  <div className={classes.row3}>
                    <p className={classes.note}>Title: {item.title}</p>
                    <p className={classes.note}>Soure: {item.source}</p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* <div className={classes.selectStyle}>
          <Select
            options={stageOptions}
            labelKey="name"
            placeholder="Main event type"
            defaultValue={stage}
            handleSelectChange={handleStageChange}
          />
        </div>
        <div className={classes.selectStyle}>
          <Select
            options={stageOptions}
            labelKey="name"
            placeholder="Main event type"
            defaultValue={stage}
            handleSelectChange={handleStageChange}
          />
        </div> */}
    </Layout>
  );
};

export default withStyles(styles, { withTheme: true })(ImprovementResource);
