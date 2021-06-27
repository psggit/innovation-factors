import React, { useState, useEffect } from "react";
import ReactWordcloud from "react-wordcloud";
import Layout from "Components/Layout";
import Loader from "Components/Loader";
import { styles } from "./../../styles/container/innovationCapacity.styles";
import { withStyles } from "@material-ui/core/styles";
import { fetchComments } from "./../../utils/http";
import { getRandomInt } from "./../../utils/helpers";
import ThumbsDownIcon from "./../../assets/ThumbsDownIcon.jpg";
import ThumbsUpIcon from "./../../assets/ThumbsUpIcon.jpg";

const Comments = ({ classes }) => {
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [wordCloudArray, setWordCloudArray] = useState([]);

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
        console.log("Error in fetching comments", error);
      });
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
      <div>
        {isLoadingComments && (
          <Loader
            classname={classes.loaderStyle}
            isOpen={true}
            hasLoadingText={true}
            loadingText="Loading..."
          />
        )}
        {!isLoadingComments && comments.length > 0 && (
          <ReactWordcloud words={wordCloudArray} />
        )}
        {!isLoadingComments &&
          comments.length > 0 &&
          comments.map((item) => <DataBox data={item} />)}
        {!isLoadingComments && comments.length === 0 && (
          <div className={classes.emptyStyle}>No comments found</div>
        )}
      </div>
    </Layout>
  );
};

export default withStyles(styles, { withTheme: true })(Comments);
