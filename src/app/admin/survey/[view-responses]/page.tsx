import React, { Suspense } from 'react'
// import AdminSurveyResponseList from './AdminSurveyResponseList'
import { GetSurveyResponses, getSurveyById } from '@/lib/surveys';
// import Link from 'next/link';
import SearchFunctionality from './AdminSurveyResponsesSearchFunctionality';
import { revalidatePath } from 'next/cache'
// import DownloadResponses from '../download-responses/[download]/page';



async function AdminSurveyResponses({surveyID}:{surveyID:number}){
  

    console.log(surveyID)
    const surveyData = await getSurveyById(surveyID);
    const formFields = surveyData[0].surveyfields;
    const title = surveyData[0].title;

    const surveyResponseData = await GetSurveyResponses(surveyID);
    // console.log('Survey Response Data: ', surveyResponseData)

    // return <AdminSurveyResponseList surveyResponseData={surveyResponseData} surveyID={surveyID} title={title} formFields={formFields}/>
    return <SearchFunctionality surveyResponseData={surveyResponseData} surveyID={surveyID} title={title} formFields={formFields}/>;
}

export default function AdminSurveyPage({params}:{params:any}) {

  revalidatePath('admin/survey/[slug]');

  const surveyID = params['view-responses'];

  return (
    <div className="mb-8 mt-12 flex flex-col gap-12 ">
      <div className="relative flex flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
        
        <div className="flex justify-center items-center relative mx-4 -mt-6 mb-8 rounded-xl bg-gradient-to-tr from-blue-900 to-blue-800 bg-clip-border p-6 text-white shadow-lg shadow-gray-900/20">
          <h2 className=" block font-sans text-xl font-semibold leading-relaxed tracking-normal text-white antialiased">
            Survey Responses
          </h2>
        </div>

        

        <Suspense fallback={ <div className="fixed top-0 left-0 w-screen h-screen z-[99999999999999] flex flex-col items-center justify-center bg-black/40">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div> <h3>Fetching response ...</h3> </div>}>
            <AdminSurveyResponses surveyID={params['view-responses']}/>
        </Suspense>
      
      </div>
    </div>
          
     
  )
}
