"use client";
import { formatDateString } from "@/lib/FormatDateString";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import Pagination from "@/components/tickets/Pagination";

const paginate = (items: any, pageNumber: any, pageSize: any) => {
  const startIndex = (pageNumber - 1) * pageSize;
  return items.slice(startIndex, startIndex + pageSize);
  // return items;
};

export default function AdminSurveyResponseList({
  surveyResponseData,
  surveyID,
  title,
  formFields,
}: {
  surveyResponseData: any;
  surveyID: number;
  title: string;
  formFields: any;
}) {
  const arr = title.split("%!@");
  title = arr[0];
  const description = arr[1];

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 11;
  const [myTickets, setMyTickets] = useState(surveyResponseData);
  const [currentData, setCurrentData] = useState([]);

  useEffect(() => {
    setMyTickets(surveyResponseData);
    setCurrentPage(1);
  }, [surveyResponseData]);

  useEffect(() => {
    let data = paginate(surveyResponseData, currentPage, pageSize);
    setCurrentData(data);
  }, [surveyResponseData]);

  useEffect(() => {
    let data = [];

    data = paginate(surveyResponseData, currentPage, pageSize);

    console.log("next page", data);
    setCurrentData(data);
  }, [currentPage]);

  const onPageChange = (page: any) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className=" p-6 px-0 pb-2 pt-0">
        <table className="w-full min-w-[640px] table-auto">
          <thead className=" text-base text-sky-900">
            <tr>
              <th className="border-blue-gray-50 border-b px-5 py-3 text-left">
                <p className="text-blue-gray-400 block font-sans  font-bold uppercase antialiased">
                  Survey Title
                </p>
              </th>
              <th className="border-blue-gray-50 border-b px-5 py-3 text-center">
                <p className="text-blue-gray-400 block font-sans  font-bold uppercase antialiased">
                  Response By
                </p>
              </th>
              <th className="border-blue-gray-50 border-b px-5 py-3 text-center">
                <p className="text-blue-gray-400 block font-sans  font-bold uppercase antialiased">
                  Response Date
                </p>
              </th>
              {/* <th className="border-blue-gray-50 border-b px-5 py-3 text-center">
                  <p className="text-blue-gray-400 block font-sans  font-bold uppercase antialiased">
                    Total Responses
                  </p>
                </th> */}
              <th></th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((response: any, index: any) => (
              <tr key={index}>
                <td className="border-blue-gray-50 border-b px-5 py-3 text-left">
                  <p className="text-blue-gray-900 block font-sans text-sm font-semibold leading-normal antialiased">
                    {title}
                  </p>
                </td>
                <td className="border-blue-gray-50 border-b px-5 py-3 text-center">
                  <p className="text-blue-gray-900 block font-sans text-sm font-semibold leading-normal antialiased">
                    {response.username}
                  </p>
                </td>
                <td className="border-blue-gray-50 border-b px-5 py-3 text-center">
                  <p className="text-blue-gray-900 block font-sans text-sm font-semibold leading-normal antialiased">
                    {formatDateString(response.createdat)}
                  </p>
                </td>
                <td className="border-blue-gray-50 border-b px-5 py-3 text-center">
                  <p className="text-blue-gray-900 block font-sans text-sm font-semibold leading-normal antialiased">
                    <Link href={`${surveyID}/${response.id}`}>
                      <button>View Response</button>
                    </Link>
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Pagination
          items={myTickets.length}
          currentPage={currentPage}
          pageSize={pageSize}
          onPageChange={onPageChange}
        />
      </div>
    </>
  );
}
