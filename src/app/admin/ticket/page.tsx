import React, { Suspense } from "react";
// import AdminTicketList from "./AdminTicket";
import AdminTicketSearch from "./AdminTicketSearch";
import { getAllTickets } from "@/lib/tickets";

async function AdminTickets() {
  const ticketData = await getAllTickets();

  return <AdminTicketSearch surveyData={ticketData} />;
}

export default function AdminSurveyPage() {
  return (
    <div>
      <Suspense
        fallback={
          <div className="fixed top-0 left-0 w-screen h-screen z-[99999999999999] flex flex-col items-center justify-center bg-black/40">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>{" "}
            <h3>Fetching Tickets ...</h3>{" "}
          </div>
        }
      >
        <AdminTickets />
      </Suspense>
    </div>
  );
}
