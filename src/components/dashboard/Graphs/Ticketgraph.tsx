import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";

ChartJS.register(...registerables);

interface LineChartProps {
  ticketData: {
    status: string;
  }[];
}

const LineChart: React.FC<LineChartProps> = ({ ticketData }) => {
  const statuses = ticketData.map((ticket) => ticket.status);
  const statusCounts: { [key: string]: number } = {};

  // Counting occurrences of each status
  statuses.forEach((status) => {
    statusCounts[status] = (statusCounts[status] || 0) + 1;
  });

  // Data for the chart
  const data = {
    labels: Object.keys(statusCounts),
    datasets: [
      {
        label: "Ticket Status",
        data: Object.values(statusCounts),
        fill: false,
        backgroundColor: [
          "rgba(214, 64, 54,0.6)",
          "rgba(18, 224, 28,0.6)",
          "rgba(212, 158, 32,0.6)",
        ],
        borderColor: "rgba(100, 220, 222,1)",
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: "category", // Use category scale for x-axis
        title: {
          display: true,
          backgroundColor: "rgba(255, 255, 255,0.6)",
          text: "Ticket Status",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Count",
        },
      },
    },
  } as const;

  return <Bar data={data} options={options} />;
};

export default LineChart;
