
import React, { Suspense} from 'react'
import FormFiller from './FormFiller';
import { getSurveyById } from '@/lib/surveys';
import { checkUserPermissionForSurvey } from '@/lib/users';
import { getServerSession } from "next-auth";
import { config } from "@/auth.config";

async function getGoogleUserId(){
  const session = await getServerSession(config);
  if(!session) return null;
  const user_id = session.user.token.sub
  console.log(user_id)

  return user_id;
}

let surveyID;

async function SurveyForm({surveyID}){
  const userId = await getGoogleUserId();

  // console.log(surveyID)
  // console.log('space')
  // console.log(userId)

  const permission = await checkUserPermissionForSurvey(surveyID, userId);

  if(!permission){
    console.log('does not have permission')
    return (
      <>
      <section className="bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
          <div className="mx-auto max-w-screen-sm text-center">
            <h1 className="dark:text-primary-500 mb-4 text-7xl font-extrabold tracking-tight text-blue-600 lg:text-9xl">403</h1>
            <p className="mb-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl dark:text-white">Access Denied</p>
            <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">Sorry, you dont seem to have permission to view this survey</p>
          </div>
        </div>
      </section>
      </>
    )
  }
  else{
    console.log('has permission')
  }

    const surveyData = await getSurveyById(surveyID);
    const formFields = surveyData[0].surveyfields;
    const title = surveyData[0].title;
    const survey_img = surveyData[0].survey_img;

    return <>
    <FormFiller surveyFields={formFields} title={title} survey_img={survey_img} surveyID={surveyID} userId={userId}/>
    </>

}


export default function FillSurveyPage({params}) {

    let surveyID = params['fill-survey'];
    
    

    // const [dataFetched,setDataFetched] = useState(false);
    // const [surveyFields,setSurveyFields] = useState([]);
    // const [title, setTitle] = useState('');

    // const dummyResponse = {
    //     survey_id: 1,
    //     response_data: [{"question":"How would you rate the overall organization of the event?","response":"Good"},{"question":"Did you find the event content relevant and engaging?","response":"Yes"},{"question":"Would you recommend this event to others?","response":"Maybe"}]
    //   }
    //   const submitResponse = async (responseData) => {
    //     console.log("sending with response data: ",responseData);
    //     try {
    //       await fetch(url_add_response, {
    //         method: 'POST',
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(responseData),
    //       })
    //       .then(response => response.json())
    //       .then(result =>  console.log('this was reached',result))
    //       .catch(err => console.log(err));
    //     } catch(error) {
    //       console.log("error while fetching:", error);
    //     }
    //   }

    //   const GetSurveyById = async (surveyID) => {
    //     try {
    //       return await fetch(`${url_get_survey_by_id}${surveyID}`)
    //       .then(response => response.json())
    //       .then(result => {console.log(result); return result})
    //       .catch(err => console.log(err))
    //     } catch(error) {
    //       console.log("error while fetching:", error);
    //     }
    //   }

    //   GetSurveyById(surveyID).then((res)=>{
        
    //     // console.log(res.Response.result[0]);
    //     setTitle(res.Response.result[0].title);
    //     setSurveyFields(res.Response.result[0].surveyfields);
    //     checkDataFetched();
        
    //   })
    
  return <>
    <Suspense fallback={<div className="fixed top-0 left-0 w-screen h-screen z-[99999999999999] flex flex-col items-center justify-center bg-black/40">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div> <h3>Fetching Survey ...</h3> </div>}>
        <SurveyForm surveyID={surveyID}/>
    </Suspense>
  </>
}

