import { GetSurveyResponses, getSurveyById, responsesToJson, createJsonFromLabels, jsonToCsv, getUserNameAndEmailForSurveyResponses } from '@/lib/surveys';
import React, { Suspense } from 'react'
import ResponseToCSV from './ResponseToCSV';

let surveyID;
let title;
let description;

 async function ResponseDownloader(){

    console.log(surveyID)
    const surveyData = await getSurveyById(surveyID);
    console.log('SurveyDATATATATA ', surveyData[0].surveyfields)
    const JsonWithLabelSeqArr = await createJsonFromLabels(surveyData[0].surveyfields);


    const formFields = surveyData[0].surveyfields;
    const titles = surveyData[0].title;
    title = titles.split('%!@')[0];
    description=titles.split('%!@')[1];


    const surveyResponseData = await GetSurveyResponses(surveyID);
    // console.log('Survey Response Data: ', surveyResponseData)

    const responseJson = await responsesToJson(formFields,surveyResponseData,JsonWithLabelSeqArr);

    const userNameAndEmail = await getUserNameAndEmailForSurveyResponses(surveyID)

    console.log('these are username email', userNameAndEmail)

    const csv = await jsonToCsv(responseJson,userNameAndEmail);

    
    return <ResponseToCSV csv={csv} title={title} description={description}/>

    //get surveyResponses by id
    //take one response and make the base fields (title fields)
    //for other responses use answers only since sequence will be the same
    //convert created json to csv on client side and return that client side component button

}

export default function DownloadResponses(props) {
    surveyID = props['params'].download;
    console.log('surveyID::',surveyID)
  return (
    <Suspense fallback={<div className="fixed top-0 left-0 w-screen h-screen z-[99999999999999] flex flex-col items-center justify-center bg-black/40">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div> <h3>Collecting responses for you ...</h3> </div>}>
        <ResponseDownloader/>
    </Suspense>
  )
}
