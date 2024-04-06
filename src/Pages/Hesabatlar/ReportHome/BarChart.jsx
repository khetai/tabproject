import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import style from "./index.module.css";
import { display } from "@mui/system";

const BarChart = ({
  data,
  width = "400",
  height = "400",
  lebel = true,
  color,
}) => {
  const chartRef = useRef();
  const chartInstance = useRef(null); // Ref to store the Chart instance
  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");
    const labels = data.map(x => x.name);
    const amounts = data.map(x => x.amount);

    // Destroy the existing Chart instance
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Create a new Chart instance
    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "lebel",
            data: amounts,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          x: {
            display: false, // Set display to false to hide the x-axis labels
          },
          y: {
            ticks: {
              display: false, // Set display to false to hide the y-axis values
            },
            // grid: {
            //   display: true, // Optionally, show the grid lines
            // },
          },
        },
        yaxis: {
          show: false,
        },
        plugins: {
          legend: {
            labels: {
              // Set display to false for the specific legend item
              filter: (legendItem, chartData) =>
                !legendItem.text.includes("lebel"),
            },
          },
        },
      },
    });
  }, [data]);

  return (
    <canvas
      className={style.BarChart}
      ref={chartRef}
      // width={width}
      width="100%"
      height={height}
    ></canvas>
  );
};

export default BarChart;
