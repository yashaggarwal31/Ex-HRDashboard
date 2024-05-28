/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import DownloadComponent from "../../ToExcel/Excel";

const TicketCategoryTable = ({ ticketData }) => {
  return (
    <div className="mb-8 mt-12 flex flex-col gap-12 ">
      <div className="relative flex flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
        <div className="relative mx-4 -mt-6 mb-8 overflow-hidden rounded-xl bg-gradient-to-tr from-sky-900 to-sky-800 bg-clip-border p-6 text-white shadow-lg shadow-gray-900/20 flex flex-row justify-between">
          <h6 className="block font-sans text-base font-semibold leading-relaxed tracking-normal text-white antialiased">
            Ticket Status by Subcategory
          </h6>
          <div>
            <DownloadComponent
              jsonData={ticketData}
              typeValue="CategoryWiseTickets"
            />
          </div>
        </div>
        <div className="max-h-96 overflow-auto p-6 px-0 pb-2 pt-0">
          <table className="w-full min-w-[640px] table-auto">
            <thead className=" text-base text-sky-900">
              <tr>
                <th className="border-blue-gray-50 border-b px-5 py-3 text-left">
                  <p className="text-blue-gray-400 block font-sans  font-bold uppercase antialiased">
                    Subcategory Name
                  </p>
                </th>
                <th className="border-blue-gray-50 border-b px-5 py-3 text-center">
                  <p className="text-blue-gray-400 block font-sans  font-bold uppercase antialiased">
                    Open Tickets
                  </p>
                </th>
                <th className="border-blue-gray-50 border-b px-5 py-3 text-center">
                  <p className="text-blue-gray-400 block font-sans  font-bold uppercase antialiased">
                    Closed Tickets
                  </p>
                </th>
                <th className="border-blue-gray-50 border-b px-5 py-3 text-center">
                  <p className="text-blue-gray-400 block font-sans  font-bold uppercase antialiased">
                    Total Tickets
                  </p>
                </th>
              </tr>
            </thead>
            <tbody>
              {ticketData.length > 0 &&
                ticketData.map((row, index) => (
                  <tr key={index}>
                    <td className="border-blue-gray-50 border-b px-5 py-3 text-left">
                      <p className="text-blue-gray-900 block font-sans text-sm font-semibold leading-normal antialiased">
                        {row.subcategory_name}
                      </p>
                    </td>
                    <td className="border-blue-gray-50 border-b px-5 py-3 text-center">
                      <p className="text-blue-gray-900 block font-sans text-sm font-semibold leading-normal antialiased">
                        {row.open_tickets}
                      </p>
                    </td>
                    <td className="border-blue-gray-50 border-b px-5 py-3 text-center">
                      <p className="text-blue-gray-900 block font-sans text-sm font-semibold leading-normal antialiased">
                        {row.closed_tickets}
                      </p>
                    </td>
                    <td className="border-blue-gray-50 border-b px-5 py-3 text-center">
                      <p className="text-blue-gray-900 block font-sans text-sm font-semibold leading-normal antialiased">
                        {parseInt(row.open_tickets) +
                          parseInt(row.closed_tickets)}
                      </p>
                    </td>
                  </tr>
                ))}
              {ticketData.length === 0 && (
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

export default TicketCategoryTable;
