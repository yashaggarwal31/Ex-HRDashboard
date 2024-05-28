import React, { Suspense } from "react";
import FeedbackAdminList from "./FeedbackAdminList";
import { getAllTickets } from "@/lib/tickets";
import { GetFeedbacks } from "@/lib/feedbacks";

async function AdminFeedbacks() {
  const feedbackDate = await GetFeedbacks();

  return <FeedbackAdminList feedbackData={feedbackDate} />;
}

export default function AdminSurveyPage() {
  return (
    <div>
      <Suspense
        fallback={
          <div className="fixed top-0 left-0 w-screen h-screen z-[99999999999999] flex flex-col items-center justify-center bg-black/40">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>{" "}
            <h3>Fetching Feedbacks ...</h3>{" "}
          </div>
        }
      >
        <AdminFeedbacks />
      </Suspense>
    </div>
  );
}
