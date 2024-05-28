import React, { Suspense } from 'react'
import AdminSurveyList from './AdminSurveyList'
import { getRecentSurveys } from '@/lib/surveys';
import Link from 'next/link';
import AdminSurveySearchFunctionality from './AdminSurveySearch';


async function AdminSurveys(){

    const surveyData = await getRecentSurveys();

    return <AdminSurveySearchFunctionality surveyData={surveyData}/>
}

export default function AdminSurveyPage() {
  return (

    <div className="mb-8 mt-12 flex flex-col gap-12 ">
      <div className="relative flex flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
        <div className="relative mx-4 -mt-6 mb-8 rounded-xl bg-gradient-to-tr from-blue-900 to-blue-800 bg-clip-border p-6 text-white shadow-lg shadow-gray-900/20">
          <h6 className="block font-sans text-base font-semibold leading-relaxed tracking-normal text-white antialiased text-center">
            Showing a List of All Surveys
          </h6>
          
        </div>

        <div>
          <Suspense fallback={<div className="fixed top-0 left-0 w-screen h-screen z-[99999999999999] flex flex-col items-center justify-center bg-black/40">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div> <h3>Fetching Surveys ...</h3> </div>}>
            <AdminSurveys/>
          </Suspense>
        </div>

      </div>
    </div>
  )
}
