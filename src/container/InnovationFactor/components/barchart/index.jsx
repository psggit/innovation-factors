import React from "react";
//import { HorizontalBar } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  barStyle: {
    width: 200,
    height: 90,

    // marginTop: -60,
    // marginLeft: 30
    // [theme.breakpoints.down("sm")]: {
    //   width: 50,
    //   height: 50,
    // },
  },
}));

const BarChart = (props) => {
  const classes = useStyles();
  const data = {
    labels: props.labels,
    datasets: [
      {
        fill: false,
        data: props.values,
        borderColor: "#19A0F8",
        backgroundColor: props.backgroundColor,
        pointRadius: 0,
        lineTension: 0,
      },
    ],
  };

  const options = {
    tooltips: {
      enabled: false,
    },
    legend: {
      display: false,
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [
        {
          ticks: { display: false },
          gridLines: {
            display: true,
            drawBorder: true,
          },
        },
      ],
      yAxes: [
        {
          ticks: { display: false },
          gridLines: {
            display: true,
            drawBorder: true,
          },
        },
      ],
    },
  };
  return (
    <div className={classes.barStyle}>
      <Bar data={data} options={options} height={0} />
    </div>
  );
};

export default BarChart;
