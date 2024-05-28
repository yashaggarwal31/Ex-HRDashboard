import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
import { getRandomColor } from "../../ToExcel/toColorCode";
ChartJS.register(...registerables);

const DonutChartComponent: React.FC<{ ticketData: any[] }> = ({
  ticketData,
}) => {
  const labels = ticketData.map((item) => item["subcategory_name"]);
  const totalTickets = ticketData.map(
    (item) => parseInt(item["open_tickets"]) + parseInt(item["closed_tickets"])
  );
  const backgroundColors = Array.from({ length: labels.length }, () =>
    getRandomColor()
  );

  console.log(backgroundColors);

  const data = {
    labels: labels,
    datasets: [
      {
        data: totalTickets,
        backgroundColor: backgroundColors,
        borderColor: backgroundColors.map((color) => `${color}99`),
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ height: "400px", width: "100% " }}>
      <Doughnut data={data} />
    </div>
  );
};

export default DonutChartComponent;
