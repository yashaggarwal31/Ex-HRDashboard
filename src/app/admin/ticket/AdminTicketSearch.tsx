"use client";
import { useState, useEffect } from "react";
import Input from "@/components/common/Search-Input";
import Link from "next/link";
import AdminTicketList from "./AdminTicket";
import { formatDateString } from "@/lib/FormatDateString";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

enum DateSelect {
  "All",
  "Today",
  "OneWeek",
  "OneMonth",
  "OneYear",
}

function AdminTicketSearch({ surveyData }: { surveyData: any }) {
  const [filteredResponses, setFilteredResponses] = useState([]);
  const [dropwdownValue, setDropdownValue] = useState<any>(0);
  const [filterISOString, setFilterISOString] = useState<any>();
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
        ).toISOString();
        setFilterISOString(filterDate);
        console.log("all");
        break;
      case DateSelect.Today:
        filterDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate() - 1
        ).toISOString();
        setFilterISOString(filterDate);
        break;
      case DateSelect.OneWeek:
        filterDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate() - 7
        ).toISOString();
        setFilterISOString(filterDate);
        break;
      case DateSelect.OneMonth:
        filterDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() - 1,
          currentDate.getDate()
        ).toISOString();
        setFilterISOString(filterDate);
        break;
      case DateSelect.OneYear:
        filterDate = new Date(
          currentDate.getFullYear() - 1,
          currentDate.getMonth(),
          currentDate.getDate()
        ).toISOString();
        setFilterISOString(filterDate);
        break;
      default:
        console.log("The default case for dropdown was called");
        break;
    }
  };

  useEffect(() => {
    filterByDate();
  }, [filterISOString]);

  const filterByDate = () => {
    const filteredItems = surveyData.filter((response) => {
      const surveyDate = new Date(response.createdat).toISOString();

      return filterISOString ? filterISOString < surveyDate : true;
    });

    console.log("filter by date", filteredItems);
    setDateFilteredRecords(filteredItems);
  };

  const filterItems = (searchTerm?) => {
    setSearchQuery(searchTerm);

    const filteredItems = dateFilteredRecords.filter((response) => {
      const searchBool =
        response.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        response.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (response.assignedto != null &&
          response.assignedto
            .trim()
            .toLowerCase()
            .includes(searchTerm.toLowerCase()));

      return searchBool;
    });

    console.log("bbb", filteredItems);
    setFilteredResponses(filteredItems);
  };

  //   useEffect(() => {
  //     filterItems(searchQuery);
  //   }, [searchQuery]);

  useEffect(() => {
    filterItems(searchQuery);
  }, [dateFilteredRecords]);

  return (
    <>
      <div className="flex justify-between items-center relative mx-4 my-4">
        <Input onChangeCallback={filterItems} placeholder="Search Tickets" />

        {/* <Select>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by recent" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                <SelectItem onChange={(e)=>handleOptionClick(e)} value="All-Time">All Time</SelectItem>
                <SelectItem value="One-day">Today</SelectItem>
                <SelectItem value="One-week">Last one week</SelectItem>
                <SelectItem value="One-month">Last one month</SelectItem>
                <SelectItem value="One-year">Last one year</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select> */}

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
        </div>
      </div>

      <AdminTicketList surveyData={filteredResponses} />
    </>
  );
}

export default AdminTicketSearch;
