/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useState } from "react";
// import Navbar from "@/components/UserNavbar";
// import TicketGeneratorButton from "@/components/TicketGeneratorButton";
// import Pagination from "@/components/Pagination";
import Link from "next/link";
import TicketGeneratorButton from "@/components/tickets/TicketGeneratorButton";
import Pagination from "@/components/tickets/Pagination";
import { formatDateString } from "@/lib/FormatDateString";
import { updateStatus, deligateTicket } from "@/lib/tickets";

const paginate = (items: any, pageNumber: any, pageSize: any) => {
  const startIndex = (pageNumber - 1) * pageSize;
  return items.slice(startIndex, startIndex + pageSize);
  // return items;
};

function Tickets({ ticketData }) {
  console.log("date ? ", ticketData);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;
  const [allFilteredData, setAllFilteredData] = useState([{}]);
  const [filterApplied, setFilterApplied] = useState("");
  const [myTickets, setMyTickets] = useState([]);
  const [currentData, setCurrentData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [detailsModal, setDetailsModal] = useState<any>(null);

  let data = paginate(myTickets, currentPage, pageSize);

  useEffect(() => {
    if (filterApplied == "") {
      data = paginate(myTickets, currentPage, pageSize);
    } else {
      data = paginate(allFilteredData, currentPage, pageSize);
    }
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
      console.log("CLCLC");
      setDetailsModal(null);

      event.preventDefault();
    };
  };

  async function updateStatusById(mark, id, state) {
    const markAsClosed = document.getElementById(mark);
    if (markAsClosed) markAsClosed.innerHTML = "Marking...";

    // console.log(id);
    try {
      const res = await updateStatus(id, state);
      // console.log("update", res);
      setDetailsModal(null);
      location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  async function deligateTicketUtil(id) {
    try {
      const res = deligateTicket(id);
      console.log(res);
      setDetailsModal(null);
      location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      {loading ? (
        <div className="fixed top-0 left-0 w-screen h-screen z-[99999999999999] flex flex-col items-center justify-center bg-black/40">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>{" "}
          <h3>Fetching Tickets ...</h3>{" "}
        </div>
      ) : (
        <div>
          {detailsModal ? (
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
                        }  rounded-full px-2 py-1 text-sm`}
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
                        <div className="flex justify-center gap-4">
                          <button
                            id="markAsClosed"
                            className="mt-2 rounded-md bg-black px-4 py-2 text-center text-white"
                            onClick={() =>
                              updateStatusById(
                                "markAsClosed",
                                detailsModal.ticket_id,
                                4
                              )
                            }
                          >
                            Mark Resolved
                          </button>

                          <button
                            id="markAsAddressed"
                            className="mt-2 rounded-md bg-black px-4 py-2 text-center text-white"
                            onClick={() =>
                              updateStatusById(
                                "markAsAddressed",
                                detailsModal.ticket_id,
                                5
                              )
                            }
                          >
                            Mark being addressed
                          </button>

                          <button
                            id="deligate"
                            className="mt-2 rounded-md bg-black px-4 py-2 text-center text-white"
                            onClick={() =>
                              deligateTicketUtil(detailsModal.ticket_id)
                            }
                          >
                            deligate
                          </button>
                        </div>
                      ) : detailsModal.status == "Resolved" ? (
                        <div className="bg-gray text-sm text-zinc-400">
                          {"Closed at : "}
                          {formatDateString(detailsModal.closedat)}
                        </div>
                      ) : (
                        <div className="flex justify-center gap-4">
                          <button
                            id="markAsClosed"
                            className="mt-2 rounded-md bg-black px-4 py-2 text-center text-white"
                            onClick={() =>
                              updateStatusById(
                                "markAsClosed",
                                detailsModal.ticket_id,
                                4
                              )
                            }
                          >
                            Mark Resolved
                          </button>

                          <button
                            id="deligate"
                            className="mt-2 rounded-md bg-black px-4 py-2 text-center text-white"
                            onClick={() =>
                              deligateTicketUtil(detailsModal.ticket_id)
                            }
                          >
                            deligate
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-stretch">
              <div className="h-screen w-[18%] items-stretch bg-slate-100">
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
                {/* <div className="px-2 py-6">
            <TicketGeneratorButton />
          </div> */}

                <table className="w-[100%]">
                  <thead>
                    <tr className=" m-10 bg-gray-200/50">
                      <th className="px-10 py-3 text-left">Assigned To</th>
                      <th className="px-10 py-3 text-left">Title</th>
                      <th className="px-10 py-3 text-left">Status</th>
                      <th className="px-10 py-3 text-left">Created at</th>
                      <th className="px-10 py-3 text-left">Details</th>
                    </tr>
                  </thead>

                  <tbody>
                    {ticketData.map((ticket: any) => (
                      <tr key={ticket.ticket_id}>
                        <td className="border-b border-sky-500 px-10 py-3">
                          {ticket.assignedto}
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
          )}
        </div>
      )}
    </div>
  );
}

export default Tickets;
