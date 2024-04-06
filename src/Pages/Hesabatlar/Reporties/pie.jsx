import React from "react";
import Chart from "react-apexcharts";
import "./test.css";
function Pie({ data, setPrecinct }) {
  const labels = data.map(x => x.departmentName);
  const series = data.map(x => x.amount);
  const options = {
    labels: labels,
    legend: {
      show: true,
      position: "bottom",
      height: 50,
      formatter: function (seriesName, opts) {
        return (
          seriesName +
          ": " +
          `<span>${opts.w.globals.series[opts.seriesIndex]} AZN</span>`
        );
      },
    },
    responsive: [
      {
        breakpoint: 526,
        options: {
          legend: {
            show: false,
          },
          chart: {
            height: 300,
          },
        },
      },
    ],
    chart: {
      type: "pie",
      events: {
        dataPointSelection: (event, chart, options) => {
          setPrecinct({
            id: data[options.dataPointIndex].departmentId,
            name: data[options.dataPointIndex].departmentName,
          });
        },
      },
    },
    theme: {
      mode: "light",
      palette: "palette1",
    },
  };

  return (
    <Chart
      options={options}
      series={series}
      type="pie"
      width={"100%"}
      height={"100%"}
    />
  );
}

export default Pie;
