import React from "react";
import { Line } from "react-chartjs-2";
// import makeStyles from "@material-ui/core/styles/makeStyles";

// const useStyles = makeStyles((theme) => ({
//   doughnutStyle: {
//     width: 200,
//     height: 200,
//     [theme.breakpoints.down("sm")]: {
//       width: 50,
//       height: 50,
//     },
//   },
// }));

const LineChartGraph = (props) => {
  const data = {
    labels: props.labels,
    datasets: [
      {
        fill: false,
        data: props.values,
        borderColor: "#D9E6B5",
        pointRadius: 7,
        borderDash: [10, 5],
        pointBorderColor: "#65B6D5",
      },
    ],
  };

  const options = {
    hover: {
      mode: "index",
      intersect: false,
    },
    legend: {
      display: false,
    },
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      xAxes: [
        {
          ticks: { display: true },
          gridLines: {
            display: true,
            drawBorder: true,
          },
        },
      ],
      yAxes: [
        {
          ticks: { display: true, stepSize: 1, min: 0,
            max: 10 },
          gridLines: {
            display: true,
            drawBorder: true,
          },
        },
      ],
    },
  };

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Line data={data} options={options} height={0} />
    </div>
  );
};

export default LineChartGraph;
