"use client";
import { useState, useEffect } from "react";
import Input from "@/components/common/Search-Input";
import Link from "next/link";
import AdminSurveyList from "./AdminSurveyList";


enum DateSelect {
  "All",
  "Today",
  "OneWeek",
  "OneMonth",
  "OneYear",
}

function AdminSurveySearchFunctionality({ surveyData }: { surveyData: any }) {
  const [filteredResponses, setFilteredResponses] = useState([]);
  const [dropwdownValue, setDropdownValue] = useState<any>(0);
  const [filterDate, setFilterDate] = useState<any>();
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilteredRecords, setDateFilteredRecords] = useState([]);

  //   console.log('dropdown val: ', dropwdownValue)

  useEffect(() => {
    setFilteredResponses(surveyData);
  }, []);

  const handleOptionClick = (event) => {
    const selection = event.target.value;
    setDropdownValue(selection);
    console.log("Selection Value", selection);
  };

  useEffect(() => {
    createFilterDate();
  }, [dropwdownValue]);

  const createFilterDate = () => {
    let currentDate = new Date();
    let filterDate;
    // Add one month to the current date
    console.log(
      "dropwdownValue is ",
      dropwdownValue,
      DateSelect.All,
      typeof dropwdownValue,
      typeof DateSelect.All
    );
    const selectedDate = parseInt(dropwdownValue);
    console.log(dropwdownValue === DateSelect.All);
    switch (selectedDate) {
      case DateSelect.All:
        filterDate = new Date(
          currentDate.getFullYear() - 100,
          currentDate.getMonth(),
          currentDate.getDate()
        );
        setFilterDate(filterDate);
        console.log("all");
        break;
      case DateSelect.Today:
        filterDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate() - 1
        );
        setFilterDate(filterDate);
        break;
      case DateSelect.OneWeek:
        filterDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate() - 7
        );
        setFilterDate(filterDate);
        break;
      case DateSelect.OneMonth:
        filterDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() - 1,
          currentDate.getDate()
        );
        setFilterDate(filterDate);
        break;
      case DateSelect.OneYear:
        filterDate = new Date(
          currentDate.getFullYear() - 1,
          currentDate.getMonth(),
          currentDate.getDate()
        );
        setFilterDate(filterDate);
        break;
      default:
        console.log("The default case for dropdown was called");
        break;
    }
  };

  useEffect(() => {
    filterByDate();
  }, [filterDate]);

  const filterByDate = () => {
    const filteredItems = surveyData.filter((response) => {
      const surveyDate = new Date(response.created_at);

      return filterDate ? filterDate < surveyDate : true;
    });
    setDateFilteredRecords(filteredItems);
  };

  const filterItems = (searchTerm?) => {
    setSearchQuery(searchTerm);

    const filteredItems = dateFilteredRecords.filter((response) => {
      const searchBool =
        response.survey_title
          .split("%!@")[0]
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        response.survey_title
          .split("%!@")[1]
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        response.creator_name
          .trim()
          .toLowerCase()
          .includes(searchTerm.toLowerCase())

      return searchBool;
    });

    setFilteredResponses(filteredItems);
  };

  useEffect(() => {
    filterItems(searchQuery);
  }, [dateFilteredRecords]);

  return (
    <>
      <div className="flex justify-between items-center relative mx-4 mt-2 mb-8">
        <Input
          onChangeCallback={filterItems}
          placeholder="Search Records"
        />

        <div className="flex justify-center items-center gap-2">
          <label htmlFor="my-select" className="font-medium text-gray-700">
            Sort by:
          </label>
          <select
            id="my-select"
            className="w-[180px] px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            onChange={(event) => handleOptionClick(event)}
          >
            <option value={DateSelect.All}>All Time</option>
            <option value={DateSelect.Today}>Today</option>
            <option value={DateSelect.OneWeek}>Last one week</option>
            <option value={DateSelect.OneMonth}>Last one month</option>
            <option value={DateSelect.OneYear}>Last one year</option>
          </select>

          <Link
            href={"survey/create-survey"}
            className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2"
          >
            Create a new Survey
          </Link>
        </div>
      </div>

      <AdminSurveyList surveyData={filteredResponses} />
    </>
  );
}

export default AdminSurveySearchFunctionality;
