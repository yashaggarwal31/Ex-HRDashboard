/* eslint-disable @next/next/no-img-element */
import React from "react";
import DownloadComponent from "../../ToExcel/Excel";

interface MonthlyFeedbackSummary {
  month: string;
  totalFeedback: number;
}

interface FeedbackData {
  createdat: string;
  total_responses: string;
}

const MonthlyFeedbackTable = ({
  feedbackData,
}: {
  feedbackData?: FeedbackData[];
}) => {
  const createMonthlyFeedbackData = (
    feedbackData: FeedbackData[] | undefined
  ): MonthlyFeedbackSummary[] => {
    if (!feedbackData || feedbackData.length === 0) {
      return [];
    }

    const monthlyData: { [key: string]: MonthlyFeedbackSummary } = {};

    feedbackData.forEach((feedback) => {
      const createdDate = new Date(feedback.createdat);
      const monthYear = createdDate.toLocaleString("default", {
        month: "long",
        year: "numeric",
      });

      if (!monthlyData[monthYear]) {
        monthlyData[monthYear] = {
          month: monthYear,
          totalFeedback: 0,
        };
      }

      monthlyData[monthYear].totalFeedback++;
    });

    return Object.values(monthlyData);
  };

  const monthlyFeedbackData: MonthlyFeedbackSummary[] =
    createMonthlyFeedbackData(feedbackData);

  return (
    <div className="mb-8 mt-12 flex flex-col gap-12">
      <div className="relative flex flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
        <div className="relative mx-4 -mt-6 mb-8 overflow-hidden rounded-xl bg-gradient-to-tr from-sky-900 to-sky-800 bg-clip-border p-6 text-white shadow-lg shadow-gray-900/20 flex flex-row justify-between">
          <h6 className="block font-sans text-base font-semibold leading-relaxed tracking-normal text-white antialiased">
            Monthly Feedback Data
          </h6>
          <div>
            <DownloadComponent
              jsonData={monthlyFeedbackData}
              typeValue="MonthlyFeedbackData"
            />
          </div>
        </div>
        <div className="max-h-96 overflow-auto p-6 px-0 pb-2 pt-0">
          <table className="w-full min-w-[640px] table-auto">
            <thead className=" text-base text-sky-900">
              <tr>
                <th className="border-blue-gray-50 border-b px-5 py-3 text-center">
                  <p className="text-blue-gray-400 block font-sans  font-bold uppercase antialiased">
                    Month
                  </p>
                </th>
                <th className="border-blue-gray-50 border-b px-5 py-3 text-center">
                  <p className="text-blue-gray-400 block font-sans  font-bold uppercase antialiased">
                    Total Feedback
                  </p>
                </th>
              </tr>
            </thead>
            <tbody>
              {monthlyFeedbackData.length > 0 ? (
                monthlyFeedbackData.map(({ month, totalFeedback }, index) => (
                  <tr key={index}>
                    <td className="border-blue-gray-50 border-b px-5 py-3 text-center">
                      <p className="text-blue-gray-900 block font-sans text-sm font-semibold leading-normal antialiased">
                        {month}
                      </p>
                    </td>
                    <td className="border-blue-gray-50 border-b px-5 py-3 text-center">
                      <p className="text-blue-gray-900 block font-sans text-sm font-semibold leading-normal antialiased">
                        {totalFeedback}
                      </p>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="w-1/1">
                  <td colSpan={3} className="pt-5 text-center">
                    <img
                      src="https://icons.veryicon.com/png/o/business/financial-category/no-data-6.png"
                      alt="no-data"
                      className="mx-auto h-24 w-24"
                    />
                    <p className="-ml-1 font-semibold text-gray-400">No Data</p>
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

export default MonthlyFeedbackTable;
