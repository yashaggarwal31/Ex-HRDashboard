"use client";
import { useState, useEffect } from "react";
import Input from "@/components/common/Search-Input";
import AdminSurveyResponseList from "./AdminSurveyResponseList";
import Link from "next/link";
// import { usePathname } from 'next/navigation'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import GetSurveyLink from "./GetSurveyLink";
import ShareLink from "@/components/common/share-link";

function SearchFunctionality({
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

  const [filteredResponses, setFilteredResponses] = useState([]);

  useEffect(() => {
    setFilteredResponses(surveyResponseData);
  }, []);

  const filterItems = (searchTerm) => {
    const filteredItems = surveyResponseData.filter((response) =>
      response.username.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredResponses(filteredItems);
  };

  return (
    <>
      <div className="flex justify-between relative mx-4 mt-2 mb-8">
        <Input
          onChangeCallback={filterItems}
          placeholder="Search Records"
        />

        <div className="flex gap-4">
            <Popover>
              <PopoverTrigger className="text-white bg-gradient-to-br from-sky-500 to-sky-900 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2">Share</PopoverTrigger>
              <PopoverContent className="w-[25rem]">
                <GetSurveyLink title={title} surveyID={surveyID}/>
                </PopoverContent>
            </Popover>
        

        <Link
          href={`download-responses/${surveyID}`}
          target="_blank"
          className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2"
        >
          Export Responses to Excel
        </Link>
        </div>
      </div>

      <AdminSurveyResponseList
        surveyResponseData={filteredResponses}
        surveyID={surveyID}
        title={title}
        formFields={formFields}
      />
    </>
  );
}

export default SearchFunctionality;
