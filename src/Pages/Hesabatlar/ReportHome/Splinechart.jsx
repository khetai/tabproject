import React from "react";
import Chart from "react-apexcharts";
import "./test.css";
function Splinechart({ color, data, setPrecinct }) {
  const series = data?.income.map(x => x.amount);
  const series2 = data?.outcome.map(x => x.amount);
  const ser = [
    {
      name: "Mədaxil",
      data: series,
    },
    {
      name: "Məxaric",
      data: series2,
    },
  ];

  const options = {
    series: [ser],
    chart: {
      responsive: true,

      height: 350,
      type: "area",
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    colors: ["#1bcd3b", "#ff0000"],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      labels: {
        rotate: 0,
        show: false,
      },
      show: false,
      labels: {
        show: false, // Set to true to display x-axis labels
      },
    },
    yaxis: {
      labels: {
        formatter: value => {
          return value.toFixed(2) + " ₼";
        },
      },
      show: true,
    },
    tooltip: {
      x: {
        show: true,
        labels: {
          show: true, // Set to true to display x-axis labels
        },
      },
      y: {
        show: false,
      },
    },
    legend: {
      show: false, // Set this to false to disable the legend
    },
  };

  return (
    <Chart
      options={options}
      series={ser}
      type="line"
      width={"100%"}
      height={"100%"}
    />
  );
}

export default Splinechart;
