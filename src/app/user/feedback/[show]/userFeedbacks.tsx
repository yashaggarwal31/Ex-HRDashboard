"use client";
import React, { useState, useEffect } from "react";
import SideNavbar from "../sideNavbar";
import FeedbackCard from "./feedbackCard";
import Pagination from "@/components/tickets/Pagination";
import Input from "@/components/common/Search-Input";

const paginate = (items: any, pageNumber: any, pageSize: any) => {
  const startIndex = (pageNumber - 1) * pageSize;
  return items.slice(startIndex, startIndex + pageSize);
  // return items;
};

export function UserFeedbacks({ feedbacks }) {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const [myFeedbacks, setMyFeedbacks] = useState(feedbacks);
  const [paginateData, setPaginateData] = useState(feedbacks);
  const [currentData, setCurrentData] = useState([]);

  useEffect(() => {
    let data = paginate(myFeedbacks, currentPage, pageSize);
    // data = paginate(myFeedbacks, currentPage, pageSize);
    setCurrentData(data);
  }, []);

  useEffect(() => {
    setCurrentData(() => paginate(paginateData, currentPage, pageSize));
  }, [currentPage]);

  const onPageChange = (page: any) => {
    setCurrentPage(page);
  };

  const search = (value) => {
    console.log(value);
    if (value.trim().length === 0) {
      setCurrentData(() => paginate(myFeedbacks, currentPage, pageSize));
      return;
    }

    const filtered = myFeedbacks.filter((feedback) =>
      feedback.title.toLowerCase().includes(value.toLowerCase())
    );

    console.log("arr ->", filtered);
    setPaginateData(filtered);
    setCurrentData(() => paginate(paginateData, currentPage, pageSize));
  };

  const filter = (e) => {
    const value = e.target.id;
    let filtered = [];
    if (value === "viewed") {
      filtered = myFeedbacks.filter((feedback) => feedback.viewed);
      console.log(filtered);
    } else if (value === "not-viewed") {
      filtered = myFeedbacks.filter((feedback) => !feedback.viewed);
    } else if (value === "all") {
      filtered = myFeedbacks;
    }
    // setPaginateData(filtered);
    setCurrentData(paginate(filtered, currentPage, pageSize));
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <SideNavbar page={2} />
      <div className="w-4/6 flex flex-row">
        <Input onChangeCallback={search} placeholder="Search by Title" />
        <ul className="flex flex-row gap-2 ml-auto">
          <li
            className="border-2 flex justify-center items-center border-sky-300 px-4 rounded-full hover:bg-sky-500 hover:text-white transition-all hover:cursor-pointer"
            onClick={filter}
            id="all"
          >
            All
          </li>
          <li
            className="border-2 flex justify-center items-center border-green-300 px-4 rounded-full hover:bg-green-500 hover:border-black hover:text-white transition-all hover:cursor-pointer"
            onClick={filter}
            id="viewed"
          >
            Viewed
          </li>
          <li
            className="border-2 flex justify-center items-center border-rose-300 px-4 rounded-full hover:bg-rose-500 hover:border-black hover:text-white transition-all hover:cursor-pointer"
            onClick={filter}
            id="not-viewed"
          >
            Not Viewed
          </li>
        </ul>
      </div>
      {currentData.map((feedback, idx) => (
        <FeedbackCard feedback={feedback} key={idx} />
      ))}
      <Pagination
        items={paginateData.length}
        currentPage={currentPage}
        pageSize={pageSize}
        onPageChange={onPageChange}
      />
    </div>
  );
}
