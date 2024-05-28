/* eslint-disable react/jsx-key */
"use client";
import React, { useEffect, useState } from "react";
import { SurveyInput } from "@/components/surveys/survey-popover";
import { FieldTypes } from "@/components/enums/survey-field-types";
import { url_create_survey } from "@/lib/ApiEndPoints";
import { FormFields } from "@/components/surveys/FormFields";
import { getGroups } from "@/lib/surveys";




import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";

// import { Button } from "@/components/ui/button";
// import {url_create_survey, url_get_survey_responses} from "@/app/lib/apiEndPoints";
// import { useRouter } from "next/navigation";
// import { revalidatePath, revalidateTag } from "next/cache";


// import {revalidateSurveyList} from '@/app/lib/revalidatefnx'







 function SurveysCreation() {
  // const {user} = useUser();

  const [user,setUser] = useState(null);

  useEffect(()=>{
    async function getUser(){
      const session = await getSession()
      console.log('client side session: ', session)
      setUser(session.user)
    }
    getUser();
  },[])
  
  
  // const user = session.user
  const router = useRouter();
  // const [userId, setUserId] = useState('1');
  // const router = useRouter();

  const [formFields, setFormFields] = useState<FormFields[]>([]);
  const [surveyTitle, setSurveyTitle] = useState<string>('Test-Survey');
  const [surveyDescription, setSurveyDescription] = useState<string>('Test-Description');
  const [closesAt, setClosesAt ] = useState<any>();
  const [selectedDate, setSelectedDate] = useState<any>(new Date());
  const [selectedCategory,setSelectedCategory] = useState<any>(null);
  const [categories,setCategories] = useState<any[]>(null)


  useEffect(()=>{
    async function getCategories(){
      const group = await getGroups();
      // console.log('groups are: ',group)
      setCategories(group);
    }

    getCategories();
  },[])


  // useEffect(()=>{
  //   console.log(userId)
  // },[userId])

  const handleCategorySelection = (event) => {
    const selection = event.target.value;
    setSelectedCategory(selection);
    console.log("Selection Value", selection);
  };

  // const handleDateSelection=(selectedDate: Date)=>{
  //   const selection = selectedDate;
  //   let selectedISO = new Date(selection).toISOString();
  //   // let nowDate = new Date().toISOString();

  //   // let test = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getDate();
  //   setClosesAt(selectedISO);
  //   console.log("Selected Date", selectedISO);
  //   // console.log('Now Date: ', nowDate)
  //   // console.log("Selected Date", test);
  // }

  useEffect(()=>{
    setClosesAt(selectedDate.toISOString());
    // console.log('new selectred date:',);
  },[selectedDate])

  // useEffect(()=>{console.log('closes at:: ',closesAt)},[closesAt])



  const addSurvey = async () => {

    console.log('userid is: ',user.id)

    const submitbtn = document.getElementById('survey-creation');
    submitbtn.textContent = 'Creating...'
    
    
    // let currentDate = new Date();
    
    
    // Add one month to the current date
    // let futureDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate());
    // Create an ISO string for the future date
    // let futureISOString = futureDate.toISOString();
    const body = {
      'title': surveyTitle.concat('%!@').concat(surveyDescription),
      'survey_fields': formFields,
      'closes_at': closesAt,
      'created_by': user?user.id:'1',
      'category': selectedCategory,
      'survey_img':'https://res.cloudinary.com/dyeeocktp/image/upload/v1715711217/bannerIcon_nch5v7-cropped_nhtxye.svg'
    };

    console.log(body)

    const response = await fetch(url_create_survey,{
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    console.log('Survey Creation Resposne: ',response)

    submitbtn.textContent = 'Created'

    router.push('/admin/survey');
    router.refresh();
    
  }
  

  return (
      <div className="bg-slate-300 min-h-screen font-Roboto">

        <div className="flex items-center justify-center gap-2 pt-5 mb-10">
        <SurveyInput
          fieldType={FieldTypes.TEXTINPUT}
          formFields={formFields}
          setFormFields={setFormFields}
        >
          Add Text Input
        </SurveyInput>
        <SurveyInput
          fieldType={FieldTypes.DROPDOWN}
          formFields={formFields}
          setFormFields={setFormFields}
        >
          Add Dropdown Input
        </SurveyInput>
        <SurveyInput
          fieldType={FieldTypes.CHECKBOX}
          formFields={formFields}
          setFormFields={setFormFields}
        >
          Add Checkbox Input
        </SurveyInput>
        <SurveyInput
          fieldType={FieldTypes.FILEUPLOAD}
          formFields={formFields}
          setFormFields={setFormFields}
        >
          Add Document Uploader Input
        </SurveyInput>
        <SurveyInput
          fieldType={FieldTypes.DATE}
          formFields={formFields}
          setFormFields={setFormFields}
        >
          Add Date Picker
        </SurveyInput>
        {/* <SurveyInput
          fieldType={FieldTypes.MATRIX}
          formFields={formFields}
          setFormFields={setFormFields}
        >
          Add Matrix Input
        </SurveyInput> */}
        </div>

        <div className="flex gap-3 justify-center items-center">
          <div>
            <label htmlFor="survey-close-date" className="font-medium text-gray-700">Survey Closes On: </label>
            {/* <input onChange={(event)=>handleDateSelection(event)} type="date" name="survey-close-date" min={`${Date.now()}`} id="" className="w-[180px] px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"/> */}
            <DatePicker
              selected={selectedDate}
              onChange={(date)=>setSelectedDate(date)}
              minDate= {new Date()}
              showTimeSelect
              dateFormat="Pp"
              placeholder={'Survey Closing Date'}
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            
          </div>
          

          {categories && <div>

            <label htmlFor="my-select" className="font-medium text-gray-700">Survey Belongs To: </label>
            <select
              id="my-select"
              className="w-[180px] px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              onChange={(event)=>handleCategorySelection(event)}
            >
              <option value="">Public</option>
              {categories.map((item:any)=>{
                  return <option value={item.id}>{item.groupname}</option>
                })}
            </select>
          </div>}
        </div>
        

        <form action="">
          <div className="flex flex-col items-center justify-center gap-4 bg-slate-300 p-10 ">

          <div className="w-[55%] ">
                <Image width='100' height={100} className="w-[100%] h-[15rem] rounded-lg" src={'https://res.cloudinary.com/dyeeocktp/image/upload/v1715711217/bannerIcon_nch5v7-cropped_nhtxye.svg'} alt='A Survey Banner yash ... '/>
          </div>

            <div className="w-[55%] rounded-lg border-t-4 border-blue-500 bg-white p-3">
              <div className="text-2xl">
                <input
                  className="my-8 w-[100%] text-2xl outline-none"
                  placeholder="Survey Title"
                  onChange={(e)=>setSurveyTitle(e.target.value)}
                />
              </div>
              <div>
                <textarea
                  className="w-[100%] outline-none"
                  placeholder="Survey Description"
                  onChange={(e)=>setSurveyDescription(e.target.value)}
                />
              </div>
              {/* <div className="text-2xl">
                <input
                  className="my-8 w-[100%] text-2xl outline-none"
                  placeholder="Closes At"
                  // onChange={(e)=>setClosesAt(e.target.value)}
                />
              </div> */}
            </div>
            {formFields?.map((item: FormFields) => (
              <div className="w-[55%] rounded-lg border-l-4 border-blue-500 bg-white p-3">
                {item.type === FieldTypes.TEXTINPUT && (
                  <div className="flex flex-col ">
                    <label className="mb-3 text-lg">{item.label} </label>
                    <input placeholder="input" />
                  </div>
                )}

                {item.type == FieldTypes.DROPDOWN && (
                  <div className="flex flex-col ">
                    <label className="mb-3 text-lg">{item.label}</label>
                    <select className="w-[40%] rounded-md bg-slate-100 px-4 py-4 outline-none">
                      <option className="p-10">Choose your pick </option>
                      {item.options!.map((itemVal) => (
                        <option>
                          <div className="p-10">{itemVal}</div>
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                {item.type == FieldTypes.CHECKBOX && (
                  <div className="flex flex-col ">
                    <label className="mb-3 text-lg">{item.label} </label>
                    <div className="flex flex-col ">
                      {item.options?.map((itemVal) => (
                        <div className="align-center flex gap-4">
                          <input type="checkbox" />
                          <label>{itemVal} </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {item.type == FieldTypes.FILEUPLOAD && (
                  <div className="flex flex-col ">
                  <label className="mb-3 text-lg">
                    {item.label}
                  </label>
                  <div className="flex justify-center items-center">
                    <input name='myfile' type="file" className="w-72 max-w-full p-1.5 bg-white text-gray-800 rounded-lg border border-gray-500 file:mr-5 file:border-none file:bg-blue-800 file:px-5 file:py-2 file:rounded-lg file:text-white file:cursor-pointer file:hover:bg-blue-600" />
                  </div>
                  
                </div>
                )}
                {item.type == FieldTypes.DATE && (
                  <div className="flex flex-col ">
                    <label className="mb-3 text-lg" htmlFor="">
                      {item.label}{" "}
                    </label>
                    {/* <input type="date" /> */}

                    <div className="relative max-w-sm">
                      <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5">
                        <svg
                          className="h-4 w-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                        </svg>
                      </div>
                      <input
                        type="date"
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        placeholder="Select date"
                      />
                    </div>
                  </div>
                )}
                {item.type == FieldTypes.MATRIX && (<>
                  <label className="">{item.label} </label>
                  <div className="flex items-center justify-center">
                  <table className="w-[80%]">
                    <tr className="text-center">
                      <th> </th>
                      {item.matrixColumn?.map((col) => {
                        return <th>{col}</th>;
                      })}
                    </tr>

                      <tbody>
                    {item.matrixRow?.map((row) => {
                      return (
                        <tr>
                          <td>{row}</td>
                          {item.matrixColumn?.map(() => {
                            return (
                              // eslint-disable-next-line react/jsx-key
                              <td className="text-center">
                                <input type="radio" name={row} />
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                    </tbody>
                  </table>
                    </div></>
                )}
              </div>
            ))}
          </div>

            <div className=" flex items-center justify-center">
            <button
            id='survey-creation'
            type="button"
            className="mb-2 me-2 rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
            onClick={()=>addSurvey()}
            >
                Create Survey
            </button>
            </div>
        </form>
      </div>
  );
}

export default SurveysCreation;
