import React from "react";
import Chart from "react-apexcharts";

function LineChart({
  data,
  resheight = 200,
  height,
  labelx = false,
  labely = false,
  color,
}) {
  const series = [
    {
      name: "Balans",
      data: data,
    },
  ];
  const options = {
    responsive: [
      {
        breakpoint: 526,
        options: {
          chart: {
            height: "auto",
          },
          yaxis: {
            show: false,
          },
        },
      },
    ],
    chart: {
      type: "line",
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    colors: [color],
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"],
        opacity: 0.5,
      },
    },
    xaxis: {
      labels: {
        show: labelx,
        rotate: 0,
      },
    },
    yaxis: {
      labels: {
        formatter: value => {
          return value.toFixed(2) + " ₼";
        },
        show: labely,
      },
    },
    legend: {
      show: false, // Set this to false to disable the legend
    },
  };

  return (
    <Chart
      options={options}
      series={series}
      type="line"
      width="100%"
      height={height}
    />
  );
}

export default LineChart;
