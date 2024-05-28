import React, { Suspense } from "react";
import DashBoard from "./Dashboard";

import {
  cardFeedbackData,
  cardSurveysData,
  cardTicketsData,
  dataTickets,
  getFeedbackCount,
  getRecentFeedbacks,
  getRecentSurveys,
  getRecentTickets,
} from "@/lib/dashboard";


async function DashboardPage() {
  const data = {
    cardFeedbackData: await cardFeedbackData(),
    cardSurveysData: await cardSurveysData(),
    cardTicketsData: await cardTicketsData(),
    dataTickets: await dataTickets(),
    getFeedbackCount: await getFeedbackCount(),
    getRecentFeedbacks: await getRecentFeedbacks(),
    getRecentSurveys: await getRecentSurveys(),
    getRecentTickets: await getRecentTickets(),
  };

  return <DashBoard data={data} />;
}

export default function Dashboard() {
  return (
    <div>
      <Suspense fallback={<div className="fixed top-0 left-0 w-screen h-screen z-[99999999999999] flex flex-col items-center justify-center bg-black/40">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div> <h3>Fetching dashboard ...</h3> </div>}>
        <DashboardPage />
      </Suspense>
    </div>
  );
}
