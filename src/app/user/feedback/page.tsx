import React, { Suspense, use, useState } from "react";
// import { url_add_feedback } from "@/app/lib/apiEndPoints";
import { addFeedback } from "@/lib/feedbacks";
import Feedbacks from "./feedbackForm";
import { getServerSession } from "next-auth";
import { config } from "@/auth.config";

async function getGoogleUserId(){
  const session = await getServerSession(config);
  if(!session) return null;
  const user_id = session.user.token.sub
  console.log(user_id)

  return user_id;
}

// export const handleSubmit = async (feedbackDto) => {
//   console.log("hello dheeraj");
//   const res = await ;
//   console.log(res);
//   // console.log("run");
//   // if (title.trim() === "") {
//   //   setAck("Title is empty");
//   //   setConformation(false);
//   //   return;
//   // }
//   // if (feedback.trim() === "") {
//   //   setAck("Feedback is empty");
//   //   setConformation(false);
//   //   return;
//   // }
//   // if (!conformation && !isAnonymous) {
//   //   setShowDialog(true);
//   //   return;
//   // }
//   // const feedbackDTO = {
//   //   title: title,
//   //   feedback: feedback,
//   //   anonymous: isAnonymous,
//   // };
//   // setSending(true);
//   // const url = "/api/feedbacks/addfeedback";
//   // try {
//   //   // const feedbackResponse = await addFeedback(feedbackDTO);

//   //   setAck("Feedback submitted successfully");
//   //   setAckClass("text-green-700 font-semibold pt-1");
//   //   setTitle("");
//   //   setFeedback("");
//   //   setIsAnonymous(false);
//   //   setConformation(false);
//   //   setSending(false);
//   // } catch (error) {
//   //   setAck("Error while submitting feedback");
//   //   setConformation(false);
//   //   setAck("");
//   //   setSending(false);
//   // }
// };

export default async function page() {
  const userId = await getGoogleUserId();
  return (
    <Suspense
      fallback={
        <div className="fixed top-0 left-0 w-screen h-screen z-[99999999999999] flex flex-col items-center justify-center bg-black/40">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>{" "}
        </div>
      }
    >
      <Feedbacks userId={userId}/>
    </Suspense>
  );
}
