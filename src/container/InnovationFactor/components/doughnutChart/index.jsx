import React from "react";
import { Doughnut } from "react-chartjs-2";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  doughnutStyle: {
    width: 200,
    height: 200,
    // [theme.breakpoints.down("sm")]: {
    //   width: 50,
    //   height: 50,
    // },
  },
}));

const DoughnutChart = (props) => {
  const classes = useStyles();
  const data = {
    datasets: [
      {
        data: props.data,
        backgroundColor: ["#08B1E2", "#BC1D30", "#EEE2E1"],
        borderWidth: 0,
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
            display: false,
            drawBorder: false,
          },
        },
      ],
      yAxes: [
        {
          ticks: { display: false },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        },
      ],
    },
  };

  return (
    <div className={classes.doughnutStyle}>
      <Doughnut data={data} options={options} height={0} />
    </div>
  );
};

export default DoughnutChart;
