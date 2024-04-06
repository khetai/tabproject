import React from "react";
import Chart from "react-apexcharts";
// import "./test.css";
function Splinechart({ data }) {
  const series = data?.income.map(x => x.amount);
  const series2 = data?.outcome.map(x => x.amount);
  const dates = data?.days;
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
      type: "datetime",
      categories: dates,
    },
    // tooltip: {
    //   x: {
    //     show: true,
    //     format: "dd.MM.yyyy",
    //   },
    // },
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
