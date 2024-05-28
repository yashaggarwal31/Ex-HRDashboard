import React from "react";
import { Bar } from "react-chartjs-2";
import type { ChartOptions } from "chart.js/auto";

interface FeedbackBarGraphProps {
  feedback: {
    createdat: string;
  }[];
}

const FeedbackBarGraph: React.FC<FeedbackBarGraphProps> = ({ feedback }) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  const data: { labels: number[]; datasets: any[] } = {
    labels: Array.from({ length: 12 }, (_, i) => i + 1),
    datasets: [
      {
        label: "Total Feedbacks",
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75,192,192,0.6)",
        hoverBorderColor: "rgba(75,192,192,1)",
        data: [],
      },
    ],
  };

  const totalResponsesByMonth = Array(12).fill(0);

  feedback.forEach((item) => {
    const feedbackDate = new Date(item.createdat);
    const monthIndex = feedbackDate.getMonth();
    if (!isNaN(monthIndex) && monthIndex >= 0 && monthIndex < 12) {
      totalResponsesByMonth[monthIndex]++;
    }
  });

  data.datasets[0].data = totalResponsesByMonth;

  const options: ChartOptions<"bar"> = {
    scales: {
      x: {
        title: {
          display: true,
          text: "Months",
        },
        ticks: {
          stepSize: 1,
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Total Feedbacks",
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const monthIndex = tooltipItem.dataIndex;
            const monthNames = [
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ];
            const monthName = monthNames[monthIndex];
            const totalResponses = totalResponsesByMonth[monthIndex];
            return `${monthName} ${currentYear}: ${totalResponses} Feedbacks`;
          },
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default FeedbackBarGraph;
