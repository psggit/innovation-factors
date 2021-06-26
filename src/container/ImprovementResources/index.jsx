import React, { useState, useEffect, useMemo } from "react";
import { styles } from "./../../styles/container/improvementCapacity.styles";
import { withStyles } from "@material-ui/core/styles";
import Layout from "./../../components/Layout";
import Loader from "./../../components/Loader";
import Inputbase from "./../../components/Inputbase";
import PageTitle from "./../../components/PageTitle";
import Select from "./../../components/Select";
import { getQueryParamByName } from "./../../utils/helpers";
import { fetchImprovementResource } from "./../../utils/http/index";

const contentTypeOptions = [
  { id: 0, displayName: "All", name: "all" },
  { id: 1, displayName: "Article", name: "article" },
  { id: 2, displayName: "Video", name: "video" },
];

const ImprovementResource = ({ classes, title }) => {
  const [loadingResourceData, setLoadingResourceData] = useState(false);
  const [resourceData, setResourceData] = useState([]);

  const [stageOptions, setStageOptions] = useState([]);
  const [stage, setStage] = useState(
    getQueryParamByName("stageId") ? getQueryParamByName("stageId") : "0"
  );

  const [contentTypeIdx, setContentTypeIdx] = useState("0");
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    getImprovementResource();
  }, []);

  const getImprovementResource = () => {
    setLoadingResourceData(true);
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
        setLoadingResourceData(false);
      })
      .catch((error) => {
        console.log("Error in fetching improvement resources", error);
        setLoadingResourceData(false);
      });
  };

  const handleStageChange = (e) => {
    setStage(e.target.value);
  };

  const handleContentTypeChange = (e) => {
    setContentTypeIdx(e.target.value);
  };

  const handleTextChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleBoxClick = (link) => {
    window.open(link);
  };

  const filteredResourceData = useMemo(() => {
    let filteredResourceData = resourceData;
    if (stage === "0" && contentTypeIdx === "0") {
      filteredResourceData = resourceData;
    }

    if (stage !== "none" && stage !== "0") {
      filteredResourceData = filteredResourceData.filter((item) => {
        return item.stageId === stage.toString();
      });
    }

    if (contentTypeIdx !== "none" && contentTypeIdx !== "0") {
      filteredResourceData = filteredResourceData.filter((item) => {
        return (
          item.type ===
          contentTypeOptions[
            contentTypeOptions.findIndex((item) => item.id === contentTypeIdx)
          ].name
        );
      });
    }

    if (searchText && searchText.trim().length > 0) {
      filteredResourceData = filteredResourceData.filter((item) => {
        return item.title.toLowerCase().includes(searchText.toLowerCase());
      });
    }

    return filteredResourceData;
  }, [stage, resourceData, contentTypeIdx, searchText]);

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
          <div className={classes.selectStyle}>
            <Select
              options={contentTypeOptions}
              labelKey="displayName"
              placeholder="Content Type"
              defaultValue={contentTypeIdx}
              handleSelectChange={handleContentTypeChange}
            />
          </div>
          <div className={classes.selectStyle}>
            <Inputbase
              id="inputbase-text"
              classname="input-base-class"
              style={{ width: "100%" }}
              defaultValue={searchText}
              placeholder="Enter title"
              handleTextChange={handleTextChange}
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
          {!loadingResourceData && filteredResourceData.length === 0 && (
            <div>No records found</div>
          )}
          {loadingResourceData && (
            <Loader
              classname={classes.loaderStyle}
              isOpen={true}
              hasLoadingText={true}
              loadingText="Loading..."
            />
          )}
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
