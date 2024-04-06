import React from "react";
import Chart from "react-apexcharts";
import { display } from "@mui/system";

function AreaChart({
  color,
  datas,
  labely = false,
  labelx = false,
  resheight = 300,
}) {
  const series = [
    {
      name: "Balans",
      data: [
        { x: "Sumqayit", y: 100 },
        { x: "Salyan", y: 200 },
        { x: "Neftcala", y: 150 },
        { x: "Naxcivan", y: 175 },
        { x: "Sumqayit1", y: 300 },
        { x: "Sumqayit2", y: 350 },
      ],
    },
  ];
  const options = {
    chart: {
      type: "area",
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
    stroke: {
      curve: "smooth",
    },
    tooltip: {
      x: {
        format: "dd.MM.yyyy",
        display: false,
      },
    },
    xaxis: {
      show: false,
      labels: {
        show: false,
      },
    },
    yaxis: {
      show: true,
    },
    dataLabels: {
      enabled: false,
    },
    colors: [color],
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
    legend: {
      show: false, // Set this to false to disable the legend
    },
  };

  return (
    <Chart
      options={options}
      series={series}
      type="area"
      width="100%"
      height="100%"
    />
  );
}

export default AreaChart;
