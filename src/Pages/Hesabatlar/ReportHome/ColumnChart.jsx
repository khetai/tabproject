import React from "react";
import Chart from "react-apexcharts";

function ColumnChart({
  data,
  color,
  height,
  resheight = 300,
  labelx = false,
  labely = false,
}) {
  const series = [
    {
      name: "Balans",
      data: data,
    },
  ];
  const options = {
    colors: color,
    responsive: [
      {
        breakpoint: 526,
        options: {
          chart: {
            height: resheight,
          },
          yaxis: {
            show: false,
          },
        },
      },
    ],
    chart: {
      toolbar: {
        show: false,
      },
    },

    dataLabels: {
      enabled: false,
    },
    fill: {
      // colors: ["red"],
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"],
        opacity: 0.5,
      },
    },
    xaxis: {
      labels: {
        rotate: 0,
        show: labelx,
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
    legend: {
      show: false, // Set this to false to disable the legend
    },
  };

  return (
    <Chart
      type="bar"
      options={options}
      series={series}
      width="100%"
      height={height}
    />
  );
}

export default ColumnChart;
