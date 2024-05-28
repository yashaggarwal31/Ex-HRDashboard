"use client";
import React, { use, useState } from "react";
// import { url_add_feedback } from "@/app/lib/apiEndPoints";
import { addFeedback } from "@/lib/feedbacks";
import Link from "next/link";
import SideNavbar from "./sideNavbar";
// import { useUser } from "@clerk/nextjs";
// import { handleSubmit } from "./page";

function Feedbacks({userId}) {

  console.log('userId in feedback', userId)
  const [title, setTitle] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [conformation, setConformation] = useState(false);
  const [ack, setAck] = useState("");
  const [ackClass, setAckClass] = useState("text-red-700 font-semibold pt-1");
  const [sending, setSending] = useState(false);
  // const { user } = useUser();
  

  const handleSubmitUtil = async () => {
    console.log("hello dheeraj");
    console.log("run");
    if (title.trim() === "") {
      setAck("Title is empty");
      setConformation(false);
      return;
    }
    if (feedback.trim() === "") {
      setAck("Feedback is empty");
      setConformation(false);
      return;
    }
    if (!conformation && !isAnonymous) {
      setShowDialog(true);
      return;
    }
    const feedbackDTO = {
      title: title,
      description: feedback,
      anonymous: isAnonymous,
      userId: userId,
    };
    setSending(true);
    // const url = "/api/feedbacks/addfeedback";
    try {
      const feedbackResponse = await addFeedback(
        JSON.parse(JSON.stringify(feedbackDTO))
      );

      setAck("Feedback submitted successfully");
      setAckClass("text-green-700 font-semibold pt-1");
      setTitle("");
      setFeedback("");
      setIsAnonymous(false);
      setConformation(false);
      setSending(false);
    } catch (error) {
      setAck("Error while submitting feedback");
      setConformation(false);
      setSending(false);
    }
  };

  return (
    <section className="w-full pb-6">
      {showDialog && !isAnonymous && !conformation && (
        <div className="absolute bottom-0 left-0 right-0 top-0 flex flex-col items-center justify-center bg-slate-500 bg-opacity-70">
          <div className="flex w-fit max-w-sm flex-col items-center justify-center bg-white p-2 px-6 py-4">
            <p className="px-2 py-4 text-center text-lg font-bold">
              Your feedback will not be anonymous. Are you sure you want to
              proceed?
            </p>
            <div className="flex flex-row gap-2">
              <button
                onClick={() => {
                  setShowDialog(false);
                  setConformation(true);
                }}
                className="max-w-48 bg-red-600 px-4 py-2 text-white"
              >
                yes, proceed
              </button>
              <button
                onClick={() => {
                  setShowDialog(false);
                  setIsAnonymous(true);
                  setConformation(true);
                }}
                className="max-w-40 bg-green-600 px-4 py-2 text-white"
              >
                Mark as Anonymous
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col items-center flex-1">
        <SideNavbar page={1} />
        <h2 className="my-2 text-3xl font-bold text-black">Feedback Form</h2>
        <p className="text-sm">We value your feedback!</p>
        <form className="mt-2 text-start">
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setConformation(false);
              setAck("");
            }}
            placeholder="Enter the title"
            className="w-full rounded-md border-2 p-2"
            required
          />
          <textarea
            name="feedback"
            id="feedback"
            value={feedback}
            onChange={(e) => {
              setFeedback(e.target.value);
              setConformation(false);
              setAck("");
            }}
            cols={30}
            rows={10}
            className="mt-4 w-full rounded-md border-2 p-2"
            placeholder="Feedback"
            required
          ></textarea>
        </form>
        <div className="mt-4 flex items-center">
          <input
            type="checkbox"
            id="anonymous"
            checked={isAnonymous}
            onChange={() => {
              setIsAnonymous(!isAnonymous);
              setConformation(false);
              setAck("");
            }}
            className="mr-2 size-4 cursor-pointer"
          />
          <label htmlFor="anonymous" className="text-lg">
            Anonymous
          </label>
        </div>
        <p className={ackClass}>{ack}</p>
        <button
          type="button"
          className="mt-2 bg-green-500 px-6 py-2 font-bold text-white hover:bg-green-600"
          onClick={async () => {
            await handleSubmitUtil();
          }}
        >
          {sending ? "Submitting" : "Submit"}
        </button>
      </div>
    </section>
  );
}

export default Feedbacks;
