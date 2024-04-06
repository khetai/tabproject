import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import style from "./index.module.css";
import { flexbox } from "@mui/system";
const PieChart = ({ data, setPrecinct }) => {
  const chartRef = useRef();
  const chartInstance = useRef(null);
  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");
    const labels = data.map(x => x.precinctName);
    const amounts = data.map(x => x.amount);
    const backgroundColors = [
      "rgba(255, 99, 132, 0.5)",
      "rgba(54, 162, 235, 0.5)",
      "rgba(255, 206, 86, 0.5)",
      "rgba(255, 99, 132, 0.2)",
      "rgba(54, 162, 235, 0.2)",
      "rgba(255, 206, 86, 0.2)",
      "rgba(75, 192, 192, 0.2)",
      "rgba(153, 102, 255, 0.2)",
      "rgba(255, 159, 64, 0.3)",
      "rgba(255, 99, 132, 0.4)",
      "rgba(54, 162, 235, 0.8)",
      "rgba(255, 206, 86, 0.7)",
      "rgba(255, 99, 132, 0.9)",
      "rgba(54, 162, 235, 0.1)",
      "rgba(54, 162, 225, 0.1)",
      "rgba(54, 162, 258, 0.5)",
      "rgba(54, 185, 240, 0.9)",
      // Add more colors as needed
    ];
    const myChart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: labels,
        datasets: [
          {
            label: "# of Votes",
            data: amounts,
            backgroundColor: backgroundColors,
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
          y: {
            beginAtZero: true,
          },
        },
        plugins: {
          legend: {
            display: false,
            position: "bottom",
            labels: {
              generateLabels: function (chart) {
                const data = chart.data;
                if (data.labels.length && data.datasets.length) {
                  return data.labels.map(function (label, i) {
                    const ds = data.datasets[0];
                    const arcOpts = chart.options.elements.arc;
                    const fill = ds.backgroundColor[i];
                    const stroke = ds.borderColor[i];
                    const borderWidth = ds.borderWidth[i];
                    return {
                      text: label,
                      fillStyle: fill,
                      display: "flex",

                      strokeStyle: stroke,
                      lineWidth: borderWidth,
                      hidden: false,
                      // Extra data used for toggling the correct item
                      index: i,
                    };
                  });
                } else {
                  return [];
                }
              },
            },
          },
        },
        onClick: (event, chartElements) => {
          // Handle click event here
          if (chartElements.length > 0) {
            const clickedLabel = chartElements[0].label;
            console.log(data[chartElements[0].index].precinctId);
            setPrecinct({
              id: data[chartElements[0].index].precinctId,
              name: data[chartElements[0].index].precinctName,
            });
            // Perform actions based on the clicked label
          }
        },
      },
    });

    return () => {
      myChart.destroy();
      // chartContainer.removeChild(colorLegendContainerRef.current); // Tabloyu kaldır
    };
  }, []);

  return (
    <canvas
      className={style.PieChart}
      ref={chartRef}
      width="400"
      height="400"
    ></canvas>
  );
};

export default PieChart;
