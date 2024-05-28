/* eslint-disable @next/next/no-img-element */
import React from "react";
import { formatDateString } from "@/../public/Components/function";
import DownloadComponent from "../../ToExcel/Excel";

const TicketSystem = ({ Ticketsdata }) => {
  return (
    <div className="mb-8 mt-12 flex flex-col gap-12 ">
      <div className="relative flex flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
        <div className="relative mx-4 -mt-6 mb-8 overflow-hidden rounded-xl bg-gradient-to-tr from-sky-900 to-sky-800 bg-clip-border p-6 text-white shadow-lg shadow-gray-900/20 flex flex-row justify-between">
          <h6 className="block font-sans text-base font-semibold leading-relaxed tracking-normal text-white antialiased">
            Tickets Table
          </h6>
          <div>
            <DownloadComponent jsonData={Ticketsdata} typeValue="TicketData" />
          </div>
        </div>
        <div className="max-h-96 overflow-auto p-6 px-0 pb-2 pt-0">
          <table className="w-full min-w-[640px] table-auto">
            <thead className=" text-base text-sky-900">
              <tr>
                <th className="border-blue-gray-50 border-b px-5 py-3 text-left">
                  <p className="text-blue-gray-400 block font-sans  font-bold uppercase antialiased">
                    Title
                  </p>
                </th>
                <th className="border-blue-gray-50 border-b px-5 py-3 text-center">
                  <p className="text-blue-gray-400 block font-sans  font-bold uppercase antialiased">
                    Description
                  </p>
                </th>
                <th className="border-blue-gray-50 border-b px-5 py-3 text-center">
                  <p className="text-blue-gray-400 block font-sans  font-bold uppercase antialiased">
                    Priority
                  </p>
                </th>
                <th className="border-blue-gray-50 border-b px-5 py-3 text-center">
                  <p className="text-blue-gray-400 block font-sans  font-bold uppercase antialiased">
                    Status
                  </p>
                </th>
                <th className="border-blue-gray-50 border-b px-5 py-3 text-center">
                  <p className="text-blue-gray-400 block font-sans  font-bold uppercase antialiased">
                    Created Date
                  </p>
                </th>
                <th className="border-blue-gray-50 border-b px-5 py-3 text-center">
                  <p className="text-blue-gray-400 block font-sans  font-bold uppercase antialiased">
                    Category
                  </p>
                </th>
              </tr>
            </thead>
            <tbody>
              {Ticketsdata.length > 0 &&
                Ticketsdata.map((ticket) => (
                  <tr key={ticket.id}>
                    <td className="border-blue-gray-50 border-b px-5 py-3 text-left">
                      <p className="text-blue-gray-900 block font-sans text-sm font-semibold leading-normal antialiased">
                        {ticket.title}
                      </p>
                    </td>
                    <td className="border-blue-gray-50 border-b px-5 py-3 text-center">
                      <p className="text-blue-gray-900 block font-sans text-sm font-semibold leading-normal antialiased">
                        {ticket.description.length > 10
                          ? ticket.description.slice(0, 10) + "...."
                          : ticket.description}
                      </p>
                    </td>
                    <td className="border-blue-gray-50 border-b px-5 py-3 text-center">
                      <p className="text-blue-gray-900 block font-sans text-sm font-semibold leading-normal antialiased">
                        {ticket.priority}
                      </p>
                    </td>
                    <td className="border-blue-gray-50 border-b px-5 py-3 text-center">
                      <p className="text-blue-gray-900 block font-sans text-sm font-semibold leading-normal antialiased">
                        {ticket.status}
                      </p>
                    </td>
                    <td className="border-blue-gray-50 border-b px-5 py-3 text-center">
                      <p className="text-blue-gray-900 block font-sans text-sm font-semibold leading-normal antialiased">
                        {formatDateString(ticket.createdat)}
                      </p>
                    </td>
                    <td className="border-blue-gray-50 border-b px-5 py-3 text-center">
                      <p className="text-blue-gray-900 block font-sans text-sm font-semibold leading-normal antialiased">
                        {ticket.categoryname}
                      </p>
                    </td>
                  </tr>
                ))}
              {Ticketsdata.length === 0 && (
                <tr className="w-1/1">
                  <td colSpan={6} className=" pt-5 text-center">
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
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TicketSystem;
