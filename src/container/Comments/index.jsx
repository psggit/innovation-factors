import React, { useState, useEffect, useCallback } from "react";
import ReactWordcloud from "react-wordcloud";
import Layout from "Components/Layout";
import Notification from "Components/Notification";
import Loader from "Components/Loader";
import Button from "Components/Button";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import PageTitle from "./../../components/PageTitle";
import { styles } from "./../../styles/container/innovationCapacity.styles";
import { withStyles } from "@material-ui/core/styles";
import { fetchComments } from "./../../utils/http";
import { getRandomInt } from "./../../utils/helpers";
import ThumbsDownIcon from "./../../assets/ThumbsDownIcon.jpg";
import ThumbsUpIcon from "./../../assets/ThumbsUpIcon.jpg";

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

  const [isSorted, setIsSorted] = useState(true);
  const [sortDirection, setSortDirection] = useState("asc");

  const resetError = () => {
    setErrorObject({ open: false, message: "" });
  };

  useEffect(() => {
    getCommentsData();
  }, []);

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
    // if (isSorted && sortDirection === "asc") setSortDirection("desc");
    // else if (isSorted && sortDirection === "desc") setSortDirection("asc");
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

  // const renderWordCloud = useCallback(() => {
  //   console.log("render wrd cloud");
  //   return (
  //     <div className={classes.wordCloudStyle}>
  //       <div>hello</div>
  //     </div>
  //   );
  // }, []);

  // const RenderWordCloud = useCallback(() => {
  //   console.log("render wrd cloud");
  //   return (
  //     <div className={classes.wordCloudStyle}>
  //       <ReactWordcloud words={wordCloudArray} options={reactCloudOptions} />
  //     </div>
  //   );
  // }, []);

  return (
    <Layout>
      <PageTitle title={title} />
      <div>
        {/* <div>
          <Button
            text="Text"
            icon={
              isSorted && sortDirection === "asc" ? (
                <ArrowUpwardIcon />
              ) : (
                <ArrowDownwardIcon />
              )
            }
            style={{ display: "flex", alignItems: "center" }}
            buttonWithIcon={true}
            color="primary"
            onClick={handleSort}
          />
        </div> */}
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
          comments.length > 0 &&
          comments.map((item, index) => (
            <DataBox key={`comment-${index}`} data={item} />
          ))}
        {!isLoadingComments && comments.length === 0 && (
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
