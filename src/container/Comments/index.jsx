/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useMemo } from "react";
import ReactWordcloud from "react-wordcloud";
import Layout from "Components/Layout";
import Notification from "Components/Notification";
import Loader from "Components/Loader";
import Select from "Components/Select";
import Inputbase from "Components/Inputbase";
import InputLabel from "Components/InputLabel";
import PageTitle from "Components/PageTitle";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import { styles } from "./../../styles/container/innovationCapacity.styles";
import { withStyles } from "@material-ui/core/styles";
import { fetchComments } from "./../../utils/http";
import { getRandomInt } from "./../../utils/helpers";
import ThumbsDownIcon from "./../../assets/ThumbsDownIcon.jpg";
import ThumbsUpIcon from "./../../assets/ThumbsUpIcon.jpg";
import { sortBy } from "lodash";

const reactCloudOptions = {
  enableTooltip: false,
  deterministic: false,
  //fontSizes: [15, 60],
  //scale: "sqrt",
};

const Comments = ({ classes, title }) => {
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [comments, setComments] = useState([]);

  const [stages, setStages] = useState([]);
  const [stageIdx, setStageIdx] = useState("0");

  const [groups, setGroups] = useState([]);
  const [groupIdx, setGroupIdx] = useState("0");

  const [wordCloudArray, setWordCloudArray] = useState([]);
  const [errorObject, setErrorObject] = useState({
    open: false,
    message: "",
  });
  const [sortDirection, setSortDirection] = useState("asc");
  const [searchText, setSearchText] = useState("");

  const resetError = () => {
    setErrorObject({ open: false, message: "" });
  };

  useEffect(() => {
    getCommentsData();
  }, [stageIdx, groupIdx]);

  const filteredCommentsData = useMemo(() => {
    let filteredComments = comments;

    if (searchText && searchText.trim().length > 0) {
      filteredComments = comments.filter((item) => {
        return item.commentText
          .toLowerCase()
          .includes(searchText.toLowerCase());
      });
    }

    if (sortDirection === "desc") {
      filteredComments = sortBy(filteredComments, "score").reverse();
    } else {
      filteredComments = sortBy(filteredComments, "score");
    }

    return filteredComments;
  }, [searchText, sortDirection, comments]);

  const handleTextChange = (e) => {
    setSearchText(e.target.value);
  };

  const getCommentsData = () => {
    setIsLoadingComments(true);
    fetchComments({
      stageId: stageIdx === "0" ? "" : stageIdx,
      groupsetId: groupIdx === "0" ? "" : groupIdx,
    })
      .then((response) => {
        setComments(
          response.data.displayData.map((comment) => {
            return {
              ...comment,
              score: parseInt(comment.score),
            };
          })
        );
        const wordCloudData = response.data.displayData.map((item) => {
          return {
            text: item.commentText,
            value: getRandomInt(100),
          };
        });
        setIsLoadingComments(false);
        setWordCloudArray(wordCloudData);

        const groupsetsData = response.data.groupsets;
        groupsetsData.unshift({ id: "0", name: "All" });

        setGroups(groupsetsData);

        const stagesData = response.data.stages.map((stage) => {
          return {
            id: stage.stageId,
            name: stage.stageName,
          };
        });
        stagesData.unshift({ id: "0", name: "All" });
        setStages(stagesData);
      })
      .catch((error) => {
        setIsLoadingComments(false);
        setErrorObject({
          open: true,
          message: error.message,
        });
        console.log("Error in fetching comments", error);
      });
  };

  const handleSort = () => {
    if (sortDirection === "asc") setSortDirection("desc");
    else if (sortDirection === "desc") setSortDirection("asc");
  };

  const DataBox = (props) => {
    return (
      <div className={classes.databox} style={{ marginBottom: 20 }}>
        <div className={classes.part1} style={{ alignItems: "center" }}>
          <div>
            <img
              src={
                parseInt(props.data.score) > 5 ? ThumbsUpIcon : ThumbsDownIcon
              }
              alt=""
              style={{ width: 60, height: 60, marginRight: 10 }}
            />
          </div>
          <div className={classes.textStyle} style={{ width: 200 }}>
            {props.data.stageText}
          </div>
          <div className={classes.textStyle}>{props.data.score}</div>
          <div className={classes.textStyle}>{props.data.commentdate}</div>
          <div
            style={{
              width: 300,
              wordBreak: "break-word",
              textOverflow: "ellipsis",
              flex: 1,
              overflow: "hidden",
              flexWrap: "wrap",
            }}
          >
            {props.data.commentText}
          </div>
        </div>
      </div>
    );
  };

  const handleStageChange = (e) => {
    setStageIdx(e.target.value);
  };

  const handleGroupChange = (e) => {
    setGroupIdx(e.target.value);
  };

  return (
    <Layout>
      <PageTitle title={title} />
      <div>
        <div style={{ display: "flex", alignItems: "flex-end" }}>
          <div className={classes.selectStyle} style={{ marginBottom: 0 }}>
            <InputLabel classname={classes.inputLabelStyle}>
              Groupset
            </InputLabel>
            <Select
              options={groups}
              labelKey="name"
              placeholder="Groups"
              defaultValue={groupIdx}
              handleSelectChange={handleGroupChange}
            />
          </div>
          <div className={classes.selectStyle} style={{ marginBottom: 0 }}>
            <InputLabel classname={classes.inputLabelStyle}>Stage</InputLabel>
            <Select
              options={stages}
              labelKey="name"
              placeholder="Stages"
              defaultValue={stageIdx}
              handleSelectChange={handleStageChange}
            />
          </div>
          <div className={classes.selectStyle} style={{ marginBottom: 0 }}>
            <Inputbase
              id="inputbase-text"
              classname="input-base-class"
              style={{ width: "100%" }}
              defaultValue={searchText}
              placeholder="Search by comment text"
              handleTextChange={handleTextChange}
            />
          </div>
          <div
            className={classes.buttonStyle}
            style={{ height: 36 }}
            onClick={handleSort}
          >
            <span>Sort</span>
            <span>
              {sortDirection === "asc" ? (
                <ArrowUpwardIcon />
              ) : (
                <ArrowDownwardIcon />
              )}
            </span>
          </div>
        </div>

        {isLoadingComments && (
          <Loader
            classname={classes.loaderStyle}
            isOpen={true}
            hasLoadingText={true}
            loadingText="Loading..."
          />
        )}
        {!isLoadingComments && comments.length > 0 && (
          <div className={classes.wordCloudStyle}>
            <ReactWordcloud
              words={wordCloudArray}
              options={reactCloudOptions}
            />
          </div>
        )}
        {!isLoadingComments &&
          filteredCommentsData.length > 0 &&
          filteredCommentsData.map((item, index) => (
            <DataBox key={`comment-${index}`} data={item} />
          ))}
        {!isLoadingComments && filteredCommentsData.length === 0 && (
          <div className={classes.emptyStyle}>No comments found</div>
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

export default withStyles(styles, { withTheme: true })(Comments);
