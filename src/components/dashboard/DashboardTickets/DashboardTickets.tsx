import React from "react";
import { formatDateString } from "@/../public/Components/function";

interface DashboardTicketsProps {
  item: {
    id: number;
    title: string;
    description: string;
    categoryname: string;
    priority: string;
    status: string;
    createdat: string;
  };
}

const DashboardTickets: React.FC<DashboardTicketsProps> = ({ item }) => {
  const { id, title, description, categoryname, priority, status, createdat } =
    item;
  const Styles = id % 2 === 0 ? "bg-gray-50" : "";

  return (
    <tr className={Styles}>
      <td className="border  px-2  py-2">{title}</td>
      <td className="border  px-2  py-2">
        {description.length > 10
          ? description.slice(0, 10) + "...."
          : description}
      </td>
      <td className="border  px-2  py-2">{categoryname}</td>
      <td className="border  px-2  py-2">{priority}</td>
      <td className="border  px-2  py-2">{status}</td>
      <td className="border  px-2  py-2">{formatDateString(createdat)}</td>
    </tr>
  );
};

export default DashboardTickets;
