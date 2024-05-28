/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import TicketGeneratorButton from "@/components/tickets/TicketGeneratorButton";
import Pagination from "@/components/tickets/Pagination";
import { formatDateString } from "@/lib/FormatDateString";

const paginate = (items: any, pageNumber: any, pageSize: any) => {
  const startIndex = (pageNumber - 1) * pageSize;
  return items.slice(startIndex, startIndex + pageSize);
  // return items;
};

export default function UserTicketList({ ticketData }) {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 11;
  const [allFilteredData, setAllFilteredData] = useState([{}]);
  const [filterApplied, setFilterApplied] = useState("");
  const [myTickets, setMyTickets] = useState(ticketData);
  const [currentData, setCurrentData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [detailsModal, setDetailsModal] = useState<any>(null);

  useEffect(() => {
    setMyTickets(ticketData);
    setCurrentPage(1);
    setFilterApplied("");
  }, [ticketData]);

  // let data = paginate(myTickets, currentPage, pageSize);
  // useEffect(() => {
  //   data = paginate(myTickets, currentPage, pageSize);
  //   setCurrentData(data);
  // }, []);

  // useEffect(() => {
  //   if (filterApplied == "") {
  //     data = paginate(myTickets, currentPage, pageSize);
  //   } else {
  //     data = paginate(allFilteredData, currentPage, pageSize);
  //   }
  //   setCurrentData(data);
  // }, [currentPage, filterApplied]);
  useEffect(() => {
    let data = paginate(ticketData, currentPage, pageSize);
    setCurrentData(data);
  }, [ticketData]);

  useEffect(() => {
    let data = [];
    if (filterApplied == "") {
      data = paginate(ticketData, currentPage, pageSize);
    } else {
      data = paginate(allFilteredData, currentPage, pageSize);
    }
    console.log("next page", data);
    setCurrentData(data);
  }, [currentPage, filterApplied]);

  const onPageChange = (page: any) => {
    setCurrentPage(page);
  };

  const statusFilter = (str: string) => {
    if (str == filterApplied) {
      setAllFilteredData([{}]);
      setFilterApplied("");
      return;
    }

    setFilterApplied(str);
    const filteredData = myTickets.filter((single: any) => {
      return single.status == str;
    });

    setAllFilteredData(filteredData);
    setCurrentPage(1);
    const actualData = paginate(filteredData, currentPage, pageSize);
    setCurrentData(actualData);
  };

  const clickHandler = () => {
    return (event: React.MouseEvent) => {
      //console.log("CLCLC");
      setDetailsModal(null);

      event.preventDefault();
    };
  };

  return (
    <div className="">
      {loading ? (
        <div className="fixed top-0 left-0 w-screen h-screen z-[99999999999999] flex flex-col items-center justify-center bg-black/40">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>{" "}
          <h3>Fetching Tickets ...</h3>{" "}
        </div>
      ) : (
        <div>
          {detailsModal && (
            <div className="absolute bottom-0 left-0 right-0 top-0 flex flex-col items-center justify-center bg-slate-500 bg-opacity-70 ">
              <div className="relative rounded-md bg-white ">
                <div className="absolute -right-3 -top-3  rounded-full bg-slate-600 px-3 py-1  text-white">
                  <button onClick={clickHandler()}>X</button>
                </div>

                <div className="flex w-fit max-w-sm flex-col items-center justify-center ">
                  <div className="flex flex-col gap-4 ">
                    <div className="flex items-center gap-4  rounded-t-md bg-indigo-500 px-7 py-5 text-white">
                      <div>#{detailsModal.id}</div>
                      <div className="text-2xl">{detailsModal.title}</div>
                      <div
                        className={`${
                          detailsModal.status == "Open"
                            ? "bg-red-500"
                            : detailsModal.status == "Resolved"
                            ? "bg-green-500 "
                            : "bg-yellow-500 "
                        }  rounded-full px-2 py-1 text-sm text-white`}
                      >
                        {detailsModal.status}
                      </div>
                    </div>
                    <div className="px-7  text-lg">
                      {detailsModal.description}
                    </div>

                    <div className=" px-7 py-5">
                      <div className="bg-gray text-sm text-zinc-400">
                        {"Opened at : "}
                        {formatDateString(detailsModal.createdat)}
                      </div>

                      {detailsModal.status == "Open" ? (
                        <div className="flex justify-center">
                          {/* <button
                           id="markAsClosed"
                           className="mt-2 rounded-md bg-black px-4 py-2 text-center text-white"
                           // onClick={() => updateStatusById(detailsModal.id)}
                         >
                           Mark as closed
                         </button> */}
                        </div>
                      ) : (
                        <div className="bg-gray text-sm text-zinc-400">
                          {"Closed at : "}
                          {formatDateString(detailsModal.closedat)}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex items-stretch">
            <div className="w-[18%] items-stretch bg-slate-100">
              <div className="mx-2 my-1 mt-2 text-xl">Filters</div>
              <div
                className={`${
                  filterApplied == "Resolved"
                    ? "border-sky-500 text-sky-500"
                    : "border-gray-300 text-gray-400"
                } m-2  inline-block cursor-pointer rounded-lg border-2 px-4 py-2`}
                onClick={() => statusFilter("Resolved")}
              >
                Resolved
              </div>
              <div
                className={`${
                  filterApplied == "Open"
                    ? "border-sky-500 text-sky-500"
                    : "border-gray-300 text-gray-400"
                } inline-block  cursor-pointer rounded-lg border-2 px-4 py-2 `}
                onClick={() => statusFilter("Open")}
              >
                Open
              </div>
            </div>

            <div className="w-[82%]">
              <div className="flex items-center  justify-between px-7 py-6">
                <TicketGeneratorButton />

                <div>
                  <Link
                    href={{ pathname: "./ticket/me" }}
                    className="inline-block cursor-pointer rounded-md bg-[#4b62f8]  p-2 text-white"
                  >
                    Assigned To Me
                  </Link>
                </div>
              </div>

              <table className="w-[100%]">
                <thead>
                  <tr className=" m-10 bg-gray-200/50">
                    <th className="px-10 py-3 text-left">Assigned To</th>
                    <th className="px-10 py-3 text-left">Title</th>
                    <th className="px-10 py-3 text-left">Status</th>
                    <th className="px-10 py-3 text-left">Created on</th>
                    <th className="px-10 py-3 text-left">Details</th>
                  </tr>
                </thead>

                {/* <tbody className="center bg-white"> */}
                <tbody>
                  {currentData.map((ticket: any) => (
                    <tr key={ticket.ticket_id}>
                      <td className="border-b border-sky-500 px-10 py-3">
                        {ticket.assignedto || (
                          <div className="text-zinc-400">Yet to assigned</div>
                        )}
                      </td>
                      <td className="border-b border-sky-500 px-10 py-3">
                        {ticket.title}
                      </td>
                      <td className="border-b border-sky-500 px-10 py-3">
                        <span
                          className={`${
                            ticket.status == "Open"
                              ? "text-[#f03e3e] bg-[#f03e3e1a]"
                              : ticket.status == "Resolved"
                              ? "text-[#14ae6d] bg-[#e7f5f0]"
                              : "text-[#D68D00] bg-[#D68D001A] "
                          }  rounded-full px-2 py-1 text-sm `}
                        >
                          {ticket.status}
                        </span>
                      </td>
                      <td className="border-b border-sky-500 px-10 py-3">
                        {formatDateString(ticket.createdat)}
                      </td>
                      <td
                        className="border-b border-sky-500"
                        onClick={() => setDetailsModal(ticket)}
                      >
                        <span className=" cursor-pointer rounded-full bg-blue-200   px-3 py-1 text-sm text-blue-500 hover:bg-blue-100">
                          View Details
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
                {/* </tbody> */}
              </table>

              <Pagination
                items={
                  filterApplied == ""
                    ? myTickets.length
                    : allFilteredData.length
                }
                currentPage={currentPage}
                pageSize={pageSize}
                onPageChange={onPageChange}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
