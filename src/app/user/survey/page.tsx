import React, { Suspense } from 'react'
import UserSurveyList from './UserSurveyList'
import { getUserSurveys } from '@/lib/surveys';
import UserSurveySearchFunctionality from './UserSurveySearch';
// import { auth } from '@clerk/nextjs/server';
import { getServerSession } from "next-auth";
import { config } from "@/auth.config";

async function getGoogleUserId(){
  const session = await getServerSession(config);
  if(!session) return null;
  const user_id = session.user.token.sub
  console.log(user_id)

  return user_id;
}

async function UserSurveys(){

  // const session = await getServerSession();
  // console.log(session,"sss")

  const userId = await getGoogleUserId();

  // const userID = session.user.id;

    const surveyData = await getUserSurveys(userId);
    if(surveyData==null){
      return <div>Error Occured</div>
    }

    // console.log('users page, survey data: ',surveyData)

    

    return <UserSurveySearchFunctionality surveyData={surveyData}/>
}


export default function SurveyPage() {
  return (
    <div className="mb-8 mt-12 flex flex-col gap-12 ">
      <div className="relative flex flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">

        <div className="flex justify-center items-center relative mx-4 -mt-6 mb-8 rounded-xl bg-gradient-to-tr from-blue-900 to-blue-800 bg-clip-border p-6 text-white shadow-lg shadow-gray-900/20">
          <h2 className=" block font-sans text-xl font-semibold leading-relaxed tracking-normal text-[#ffffffe0] antialiased">
          List of Active Surveys
          </h2>
        </div>

        {/* <div className="relative mx-4 -mt-6 mb-8 rounded-xl bg-gradient-to-tr from-blue-900 to-blue-800 bg-clip-border p-6 text-white shadow-lg shadow-gray-900/20">
          <h6 className="block font-sans text-base font-semibold leading-relaxed tracking-normal text-white antialiased text-center">
            List of Active Surveys
          </h6>
        </div> */}


      <Suspense fallback={<div className="fixed top-0 left-0 w-screen h-screen z-[99999999999999] flex flex-col items-center justify-center bg-black/40">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div> <h3>Fetching Surveys ...</h3> </div>}>
        <UserSurveys/>
      </Suspense>
      </div>
    </div>
  )
}
