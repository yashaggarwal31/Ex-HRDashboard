import React from "react";
import { formatDateString } from "@/../public/Components/function";
import DownloadComponent from "../../ToExcel/Excel";

const FeedbackSystemTable = ({ FeedbackData }) => {
  return (
    <div className="mb-8 mt-12 flex flex-col gap-12 ">
      <div className="relative flex flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
        <div className="relative mx-4 -mt-6 mb-8 overflow-hidden rounded-xl bg-gradient-to-tr from-sky-900 to-sky-800 bg-clip-border p-6 text-white shadow-lg shadow-gray-900/20 flex flex-row justify-between">
          <h6 className="block font-sans text-base font-semibold leading-relaxed tracking-normal text-white antialiased">
            Feedback System Table
          </h6>
          <div>
            <DownloadComponent jsonData={FeedbackData} typeValue="Feedback" />
          </div>
        </div>
        <div className="max-h-96 overflow-auto p-6 px-0 pb-2 pt-0">
          <table className="w-full min-w-[640px] table-auto">
            <thead className=" text-base text-sky-900">
              <tr>
                <th className="border-blue-gray-50 border-b px-5 py-3 text-left">
                  <p className="text-blue-gray-400 block font-sans  font-bold uppercase antialiased">
                    Feedback Title
                  </p>
                </th>
                <th className="border-blue-gray-50 border-b px-5 py-3 text-left">
                  <p className="text-blue-gray-400 block font-sans  font-bold uppercase antialiased">
                    Feedback Description
                  </p>
                </th>
                <th className="border-blue-gray-50 border-b px-5 py-3 text-center">
                  <p className="text-blue-gray-400 block font-sans  font-bold uppercase antialiased">
                    Created By
                  </p>
                </th>
                <th className="border-blue-gray-50 border-b px-5 py-3 text-center">
                  <p className="text-blue-gray-400 block font-sans  font-bold uppercase antialiased">
                    Created On
                  </p>
                </th>
              </tr>
            </thead>
            <tbody>
              {FeedbackData.map(
                ({ id, title, description, username, createdat }) => (
                  <tr key={id}>
                    <td className="border-blue-gray-50 border-b px-5 py-3 text-left">
                      <p className="text-blue-gray-900 block font-sans text-sm font-semibold leading-normal antialiased">
                        {title}
                      </p>
                    </td>
                    <td className="border-blue-gray-50 border-b px-5 py-3 text-left">
                      <p className="text-blue-gray-900 block font-sans text-sm font-semibold leading-normal antialiased">
                        {description.length > 40
                          ? description.slice(0, 40) + "...."
                          : description}
                      </p>
                    </td>
                    <td className="border-blue-gray-50 border-b px-5 py-3 text-center">
                      <p className="text-blue-gray-900 block font-sans text-sm font-semibold leading-normal antialiased">
                        {username}
                      </p>
                    </td>

                    <td className="border-blue-gray-50 border-b px-5 py-3 text-center">
                      <p className="text-blue-gray-900 block font-sans text-sm font-semibold leading-normal antialiased">
                        {formatDateString(createdat)}
                      </p>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FeedbackSystemTable;
