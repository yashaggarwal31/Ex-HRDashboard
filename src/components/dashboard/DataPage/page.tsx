import React from "react";
import TicketSystem from "@/components/dashboard/DashboardDataComponent/TicketData/Data";
import TicketCategoryTable from "@/components/dashboard/DashboardDataComponent/TicketData/CategoryData";

const TicketComponent = ({ ticketData, Ticketsdata }) => {
  return (
    <>
      <TicketSystem Ticketsdata={Ticketsdata} />
      <TicketCategoryTable ticketData={ticketData} />
    </>
  );
};

export default TicketComponent;
