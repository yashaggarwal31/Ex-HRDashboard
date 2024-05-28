"use client";
import React, { useState, useEffect } from "react";
import Feedback from "./feedback";
import Pagination from "@/components/tickets/Pagination";
import Input from "@/components/common/Search-Input";
// import Loading from "./loading";
// import { url_get_feedbacks } from "@/app/lib/apiEndPoints";

const paginate = (items: any, pageNumber: any, pageSize: any) => {
  const startIndex = (pageNumber - 1) * pageSize;
  return items.slice(startIndex, startIndex + pageSize);
  // return items;
};

function FeedbackAdminList({ feedbackData }) {
  console.log("feed", feedbackData);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  // const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [myFeedbacks, setMyFeedbacks] = useState(feedbackData);
  const [paginateData, setPaginateData] = useState(feedbackData);
  const [currentData, setCurrentData] = useState(feedbackData);

  // let data = paginate(myFeedbacks, currentPage, pageSize);
  useEffect(() => {
    let data = paginate(myFeedbacks, currentPage, pageSize);
    setCurrentData(data);
  }, []);

  useEffect(() => {
    // console.log("***************************");
    setCurrentData(() => paginate(paginateData, currentPage, pageSize));
  }, [currentPage]);

  const onPageChange = (page: any) => {
    setCurrentPage(page);
  };

  const search = (value) => {
    console.log("->", value);
    if (value.trim().length === 0) {
      setCurrentData(() => paginate(myFeedbacks, currentPage, pageSize));
      return;
    }

    const filtered = myFeedbacks.filter((feedback) =>
      feedback.title.toLowerCase().includes(value.toLowerCase())
    );

    console.log("fil", filtered);
    console.log("->", value);
    setPaginateData(filtered);
    setCurrentData(() => paginate(paginateData, currentPage, pageSize));
  };

  return (
    <div className=" h-screen flex flex-col">
      <div className="w-4/6 ml-auto mr-auto mt-4 mb-2">
        <Input onChangeCallback={search} placeholder="Search by Title" />
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="h-100 flex  flex-col items-center px-4 py-2">
          {currentData.map((feedback, idx) => (
            <Feedback key={idx} feedback={feedback} />
          ))}
          <Pagination
            items={paginateData.length}
            currentPage={currentPage}
            pageSize={pageSize}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </div>
  );
}

export default FeedbackAdminList;
