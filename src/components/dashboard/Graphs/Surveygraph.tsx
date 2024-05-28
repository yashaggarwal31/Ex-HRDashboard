import React from "react";
import { Chart as ChartJS, registerables } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(...registerables);

interface LineChart2Props {
  surveys: { survey_title: string; total_responses: number }[];
}

const LineChart2: React.FC<LineChart2Props> = ({ surveys }) => {
  const surveyTitles = surveys.map((survey) => survey.survey_title);
  const responseCounts = surveys.map((survey) => survey.total_responses);

  const getTooltipLabel = (tooltipItem: any, data: any) => {
    const label = data.labels[tooltipItem.index];
    return `Month: ${label}`;
  };

  const data = {
    labels: surveyTitles,
    datasets: [
      {
        label: "Total Surveys",
        backgroundColor: "rgba(235, 87, 52,0.4)",
        borderColor: "rgba(235, 87, 52,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75,192,192,0.6)",
        hoverBorderColor: "rgba(75,192,192,1)",
        data: responseCounts,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: "Surveys",
        },
        ticks: {
          callback: (value: any) => value + 1,
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
    tooltips: {
      callbacks: {
        label: getTooltipLabel,
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default LineChart2;
