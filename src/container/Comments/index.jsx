/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useMemo } from "react";
import ReactWordcloud from "react-wordcloud";
import Layout from "Components/Layout";
import Notification from "Components/Notification";
import Loader from "Components/Loader";
import Inputbase from "./../../components/Inputbase";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import PageTitle from "./../../components/PageTitle";
import { styles } from "./../../styles/container/innovationCapacity.styles";
import { withStyles } from "@material-ui/core/styles";
import { fetchComments } from "./../../utils/http";
import { getRandomInt } from "./../../utils/helpers";
import ThumbsDownIcon from "./../../assets/ThumbsDownIcon.jpg";
import ThumbsUpIcon from "./../../assets/ThumbsUpIcon.jpg";
import { orderBy } from "lodash";

const reactCloudOptions = {
  enableTooltip: false,
  deterministic: false,
  //fontSizes: [15, 60],
  //scale: "sqrt",
};

const Comments = ({ classes, title }) => {
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [comments, setComments] = useState([]);
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
  }, []);

  const filteredCommentsData = useMemo(() => {
    let filteredComments = comments;

    if (searchText && searchText.trim().length > 0) {
      filteredComments = comments.filter((item) => {
        return item.commentText
          .toLowerCase()
          .includes(searchText.toLowerCase());
      });
    }

    filteredComments = orderBy(filteredComments, ["score"], [sortDirection]);

    return filteredComments;
  }, [searchText, sortDirection, comments]);

  const handleTextChange = (e) => {
    setSearchText(e.target.value);
  };

  const getCommentsData = () => {
    setIsLoadingComments(true);
    fetchComments({ stage: "", type: "" })
      .then((response) => {
        setComments(response.data);
        const wordCloudData = response.data.map((item) => {
          return {
            text: item.commentText,
            value: getRandomInt(100),
          };
        });
        setIsLoadingComments(false);
        setWordCloudArray(wordCloudData);
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

  return (
    <Layout>
      <PageTitle title={title} />
      <div>
        <div style={{ display: "flex" }}>
          <div className={classes.buttonStyle} onClick={handleSort}>
            <span>Sort</span>
            <span>
              {sortDirection === "asc" ? (
                <ArrowUpwardIcon />
              ) : (
                <ArrowDownwardIcon />
              )}
            </span>
          </div>
          <div style={{ width: 200, marginLeft: 20 }}>
            <Inputbase
              id="inputbase-text"
              classname="input-base-class"
              style={{ width: "100%" }}
              defaultValue={searchText}
              placeholder="Enter comment text"
              handleTextChange={handleTextChange}
            />
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
