import React from "react";
import { formatDateString } from "@/../public/Components/function";

interface DashboardSurveyProps {
  item: {
    id: number;
    survey_title: string;
    creator_name: string;
    created_at: string;
    total_responses: number;
  };
}

const DashboardSurvey: React.FC<DashboardSurveyProps> = ({ item }) => {
  const { id, survey_title, creator_name, created_at, total_responses } = item;
  const Styles = id % 2 === 1 ? "bg-gray-50" : "";

  return (
    <tr className={Styles}>
      <td className="border px-2 py-2">
        {survey_title.split("%!@").slice(0, 1)}
      </td>
      <td className="border px-2 py-2 truncate max-w-8">
        {survey_title.split("%!@").slice(1)}
      </td>

      <td className="border px-2 py-2">{creator_name}</td>
      <td className="border px-2 py-2">{formatDateString(created_at)}</td>
      <td className="border px-2 py-2">{total_responses}</td>
    </tr>
  );
};

export default DashboardSurvey;
