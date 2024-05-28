"use client";
/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import Cards from "@/components/dashboard/Cards/Cards";
import DashboardTickets from "@/components/dashboard/DashboardTickets/DashboardTickets";
import LineChart from "@/components/dashboard/Graphs/Ticketgraph";
import DashboardSurvey from "@/components/dashboard/DashboardSurvey/DashboardSurvey";
import LineChart2 from "@/components/dashboard/Graphs/Surveygraph";
import DashboardFeedback from "@/components/dashboard/DashboardFeedbacks/DashboardFeedback";
import FeedbackBarGraph from "@/components/dashboard/Graphs/Feedbackgraph";
import TicketComponent from "@/components/dashboard/DataPage/page";
import SurveySystemTable from "@/components/dashboard/DashboardDataComponent/SurveyData/SurveyData";
import MonthlySurveyTable from "@/components/dashboard/DashboardDataComponent/SurveyData/SurveyData2";
import FeedbackSystemTable from "@/components/dashboard/DashboardDataComponent/FeedbackData/FeedbackData";
import MonthlyFeedbackTable from "@/components/dashboard/DashboardDataComponent/FeedbackData/FeedbackData2";
// import DonutChartComponent from "@/components/dashboard/GraphComponents/TicketGraphs/TicketsGraphComponet";
import LoaderComponent from "../../../../public/Loader/load";
import cards from "../../../../public/cards.json";
import "../../../../public/css/style.css";
// import { useSession } from "next-auth/react";

export default function DashBoard({ data }: any) {
  // const session = useSession();

  const cardsdata = [
    data["cardTicketsData"][0],
    data["cardSurveysData"][0],
    data["cardFeedbackData"][0],
  ];

  const [id, setId] = useState<string>("Tickets");
  const [isTicket, setIsTicket] = useState<boolean>(true);
  const [isHome, setIsHome] = useState<boolean>(true);
  const [isData, setIsData] = useState<boolean>(false);
  const [isGraph, setIsGraph] = useState<boolean>(false);
  const [isSurvey, setIsSurvey] = useState<boolean>(false);
  const [isFeedback, setIsFeedback] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [ticketData, setTicketData] = useState(data["dataTickets"]);
  const [ticketdata, setticketData] = useState(data["getRecentTickets"]);
  const [feedbackdata, setfeedbackData] = useState(data["getRecentFeedbacks"]);
  const [surveydata, setsurveyData] = useState(data["getRecentSurveys"]);
  const [carddata, setscardaData] = useState(cardsdata);

  // setIsLoading(false);

  const onDataSelected = () => {
    setIsHome(false);
    setIsData(true);
    setIsGraph(false);
  };

  const onHomeSelected = () => {
    setIsHome(true);
    setIsData(false);
    setIsGraph(false);
  };

  const onGraphSelected = () => {
    setIsHome(false);
    setIsData(false);
    setIsGraph(true);
  };
  const onSelect = (Id: string) => {
    setId(Id);
    setIsTicket(Id === "Tickets");
    setIsSurvey(Id === "Surveys");
    setIsFeedback(Id === "Feedback");
  };

  const Ticketsdata = ticketdata;
  const Surveysdata = surveydata;
  const Feedbackdata = feedbackdata;

  // const ClassValues = isHovered ? "visible" : "hidden";

  return (
    <>
      <main className="mt-4 flex h-full w-screen gap-4 pl-2 pr-2">
        <aside
          className="grid w-40 grid-rows-4 rounded-md border bg-sky-800"
          style={{ maxHeight: "88vh", minHeight: "88vh" }}
        >
          <div className="row-start-1 row-end-2 flex flex-col items-start justify-center ">
            <div className="w-full pl-0.5">
              <h2
                className={`mb-2 flex gap-2 p-0.5 font-bold text-white ${
                  isHome && "bg-sky-600/40"
                }`}
                onClick={onHomeSelected}
              >
                <svg
                  className="text-white-800 h-6 w-6 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5"
                  />
                </svg>
                Home
              </h2>
              <h2
                className={`mb-2 flex gap-2 p-0.5 font-bold text-white ${
                  isData && "bg-sky-600/40"
                }`}
                onClick={onDataSelected}
              >
                <svg
                  className="text-white-800 h-6 w-6 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeWidth="2"
                    d="M3 11h18M3 15h18m-9-4v8m-8 0h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"
                  />
                </svg>
                Data
              </h2>
              {/* <h2
                className={`mb-2 flex gap-2 p-0.5 font-bold text-white ${
                  isGraph && "bg-sky-600/40"
                }`}
                onClick={onGraphSelected}
              >
                <svg
                  className="text-white-800 h-6 w-6 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 3v4a1 1 0 0 1-1 1H5m4 10v-2m3 2v-6m3 6v-3m4-11v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7.914a1 1 0 0 1 .293-.707l3.914-3.914A1 1 0 0 1 9.914 3H18a1 1 0 0 1 1 1Z"
                  />
                </svg>
                Graphs
              </h2> */}
            </div>
          </div>
          <div className="row-start-4 row-end-5 self-center justify-self-center">
            <img
              src="https://miro.medium.com/v2/resize:fit:1080/1*EkDkwOPE8zeAfDA3BjgCAw.png"
              alt="logo"
              width={100}
              height={100}
            />
          </div>
        </aside>
        <div className="w-full overflow-y-auto" style={{ maxHeight: "88vh" }}>
          <div className="mb-4 flex flex-row items-center justify-around">
            {carddata.length > 0
              ? cards.map((item) => (
                  <Cards
                    item={carddata[item.value]}
                    type={item.type}
                    id={item.id}
                    key={item.id}
                    onclick={onSelect}
                    isActive={item.id === id}
                  />
                ))
              : ""}
          </div>

          <div className=" flex-grow overflow-auto p-4">
            {isTicket && isHome && (
              <div className="mt-2 grid h-full grid-cols-5 gap-6 pt-4">
                <div className="col-start-1 col-end-4 overflow-x-auto rounded-lg border-2 border-gray-200 pt-2">
                  <table className="w-full table-auto border-collapse">
                    <caption className="caption-top p-2 font-bold text-sky-800">
                      Recent Tickets ad Status Report
                    </caption>
                    <thead>
                      <tr className=" bg-gray-200/50">
                        <th className="px-4 py-2">Title</th>
                        <th className="px-4 py-2">Description</th>
                        <th className="px-4 py-2">Category</th>
                        <th className="px-4 py-2">Priority</th>
                        <th className="px-4 py-2">Status</th>
                        <th className="px-4 py-2">Created On</th>
                      </tr>
                    </thead>
                    <tbody className="center bg-white">
                      {Ticketsdata.length > 0 ? (
                        Ticketsdata.slice(0, 10).map((item) => (
                          <DashboardTickets item={item} key={item.id} />
                        ))
                      ) : (
                        <tr className="w-1/1">
                          <td colSpan={6} className=" pt-5 text-center">
                            {isLoading ? (
                              <LoaderComponent />
                            ) : (
                              <>
                                <img
                                  src="https://icons.veryicon.com/png/o/business/financial-category/no-data-6.png"
                                  alt="no-data"
                                  className="mx-auto h-24 w-24"
                                />
                                <p className="-ml-1 font-semibold text-gray-400">
                                  No Data
                                </p>
                              </>
                            )}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <div
                  className="col-start-4 col-end-6 self-start rounded-lg border-2 border-gray-200 p-2 shadow-lg"
                  style={{ maxHeight: "40vh", minHeight: "28vh" }}
                >
                  <LineChart ticketData={Ticketsdata} />
                </div>
              </div>
            )}
            {isSurvey && isHome && (
              <div className="mt-2 grid h-full grid-cols-5 gap-6 pt-4">
                <div className="col-start-1 col-end-4 rounded-lg border-2 border-gray-200 pt-2">
                  <table className="w-full table-auto border-collapse">
                    <caption className="caption-top p-2 font-bold text-sky-800">
                      Survey and Responses
                    </caption>
                    <thead>
                      <tr className=" bg-gray-200/50">
                        <th className="px-4 py-2">Title</th>
                        <th className="px-4 py-2">Description</th>
                        <th className="px-4 py-2">Created By</th>
                        <th className="px-4 py-2">Created On</th>
                        <th className="px-4 py-2">Responses</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {Surveysdata.length > 0 ? (
                        Surveysdata.slice(0, 10).map((item) => (
                          <DashboardSurvey item={item} key={item.survey_id} />
                        ))
                      ) : (
                        <tr className="w-1/1">
                          <td colSpan={6} className=" pt-5 text-center">
                            {isLoading ? (
                              <LoaderComponent />
                            ) : (
                              <>
                                <img
                                  src="https://icons.veryicon.com/png/o/business/financial-category/no-data-6.png"
                                  alt="no-data"
                                  className="mx-auto h-24 w-24"
                                />
                                <p className="-ml-1 font-semibold text-gray-400">
                                  No Data
                                </p>
                              </>
                            )}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <div
                  className="col-start-4 col-end-6 self-start rounded-lg border-2 border-gray-200 p-2 shadow-lg"
                  style={{ maxHeight: "40vh", minHeight: "28vh" }}
                >
                  <LineChart2 surveys={Surveysdata.slice(0, 10)} />
                </div>
              </div>
            )}

            {isFeedback && isHome && (
              <div className="mt-2 grid h-full grid-cols-5 gap-6 pt-4">
                <div className="col-start-1 col-end-4 rounded-lg border-2 border-gray-200 pt-2">
                  <table className="w-full table-auto border-collapse">
                    <caption className="caption-top p-2 font-bold text-sky-800">
                      Recent Feedbacks
                    </caption>
                    <thead>
                      <tr className="bg-gray-200/50">
                        <th className="px-4 py-2">User</th>
                        <th className="px-4 py-2">Title</th>
                        <th className="px-4 py-2">Description</th>
                        <th className="px-4 py-2">Created On</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Feedbackdata.length > 0 ? (
                        Feedbackdata.slice(0, 10).map((item) => (
                          <DashboardFeedback data={item} key={item.id} />
                        ))
                      ) : (
                        <tr className="w-1/1">
                          <td colSpan={6} className=" pt-5 text-center">
                            {isLoading ? (
                              <LoaderComponent />
                            ) : (
                              <>
                                <img
                                  src="https://icons.veryicon.com/png/o/business/financial-category/no-data-6.png"
                                  alt="no-data"
                                  className="mx-auto h-24 w-24"
                                />
                                <p className="-ml-1 font-semibold text-gray-400">
                                  No Data
                                </p>
                              </>
                            )}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <div
                  className="col-start-4 col-end-6 self-start rounded-lg border-2 border-gray-200 p-2 shadow-lg"
                  style={{ maxHeight: "40vh", minHeight: "28vh" }}
                >
                  <FeedbackBarGraph feedback={Feedbackdata} />
                </div>
              </div>
            )}
            {isTicket && isData && (
              <TicketComponent
                ticketData={ticketData}
                Ticketsdata={Ticketsdata}
              />
            )}
            {isFeedback && isData && (
              <>
                <FeedbackSystemTable FeedbackData={Feedbackdata} />
                <MonthlyFeedbackTable feedbackData={Feedbackdata} />
              </>
            )}
            {isSurvey && isData && (
              <>
                <SurveySystemTable surveyData={Surveysdata.slice(0, 40)} />
                <MonthlySurveyTable surveyData={Surveysdata} />
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
