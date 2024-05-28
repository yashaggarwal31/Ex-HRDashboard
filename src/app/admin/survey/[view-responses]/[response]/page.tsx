import React, { Suspense } from 'react'
import SurveyResponse from './ResponsePage'
import { GetResponseById } from '@/lib/surveys';


async function Response({responseID}){
    const response = await GetResponseById(responseID);

    console.log('this is resposne ', response[0])

    return <SurveyResponse response={response[0]['response_data']}></SurveyResponse>
}

export default function SurveySingleResponsePage({params}:{params:any}) {
    // console.log(params['response'])
  return (
    <div className='bg-slate-300 p-10'>
    <Suspense fallback={<div className="fixed top-0 left-0 w-screen h-screen z-[99999999999999] flex flex-col items-center justify-center bg-black/40">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div> <h3>Fetching Response ...</h3> </div>}>
      <Response responseID={params['response']}/>
    </Suspense>
    </div>
  )
}
