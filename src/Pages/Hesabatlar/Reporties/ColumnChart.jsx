import React from "react";
import Chart from "react-apexcharts";

function ColumnChart({
  data,
  color,
  height,
  resheight = 300,
  labelx = false,
  labely = false,
  res,
}) {
  const series = [
    {
      name: "Satış",
      data: data,
    },
  ];

  console.log(series);
  console.log(data);
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
    },
    yaxis: {
      labels: {
        formatter: value => {
          return value.toFixed(2) + " ₼";
        },
      },
      show: labely,
    },
    legend: {
      show: false, // Set this to false to disable the legend
    },
    // tooltip: {
    //   custom: ({ series, seriesIndex, dataPointIndex, w }) => {
    //     return (
    //       '<div class="apexcharts-tooltip">' +
    //       "<span>" +
    //       series[seriesIndex][dataPointIndex] +
    //       "</span>" + // Display amount
    //       "<br>" +
    //       "<span>" +
    //       w.config.series[seriesIndex].data[dataPointIndex].departmentName +
    //       res[seriesIndex].departmentName +
    //       "</span>" + // Display departmentName
    //       "</div>"
    //     );
    //   },
    // },
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
