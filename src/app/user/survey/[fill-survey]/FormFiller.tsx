'use client'
import React, { useEffect, useState } from 'react'
import { FieldTypes } from "@/components/enums/survey-field-types";
import { FormFields } from '@/components/surveys/FormFields'
import { url_fill_survey } from '@/lib/ApiEndPoints';
// import { useUser } from '@clerk/nextjs';
import Image from 'next/image';
// import { addUserResponse } from '@/lib/surveys';

export default function FormFiller({ surveyFields, title, survey_img, surveyID, userId }) {
  // const { user } = useUser();

  const arr = title.split('%!@')
  title = arr[0];
  const description = arr[1]

  const submitResponse = async (responseData) => {
    console.log("sending with response data: ",responseData);
    try {
      await fetch(url_fill_survey, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(responseData),
      })
      .then(response => response.json())
      .then(result =>  console.log('this was reached',result))
      .catch(err => console.log(err));
    } catch(error) {
      console.log("error while fetching:", error);
    }
  }

  function handleSubmit(event) {
    const submitBTN:any = document.getElementById('submit-btn');
    submitBTN.innerHTML='Submitting';
    submitBTN.disabled = true;
    const domForm = document.getElementById('dom-form');
    console.log(domForm)
    // Prevent the default form submission behavior
    event.preventDefault();

    // Access the form that triggered the event
    const form = event.target;

    // Create an array to hold the form data in the desired format
    const formDataArray = [];

    // Iterate over each form element
    for (const element of form.elements) {
        // Skip elements without a name (e.g., submit buttons)
        if (!element.name) {
            continue;
        }

        // Determine the type of input
        const type = element.type;

        // Get the label text associated with the form element
        let label = '';
        const labelElement = form.querySelector(`label[htmlFor="${element.id}"]`);
        console.log('For this element, ', element,'Type is',element.type ,'\n This si the label ', labelElement)
        if (labelElement) {
            label = labelElement.textContent.trim();
        }

        if (type === 'checkbox' && label=='') {
          label = element.parentNode.parentNode.parentNode.firstChild.textContent;
        }

        // if(type==='file'){
        //   label = element.parentNode.parentNode.parentNode.firstChild.textContent;
        // }

        if(type=='select-one'){
          label = element.parentNode.firstChild.textContent;
        }

        // Determine the answer based on the element type
        let answer = '';
        let id = '';
        switch (type) {
            case 'text':
                answer = element.value;
                id = element.id;
                break;
            case 'checkbox':
                answer = element.checked ? element.value : null;
                if (answer === null) continue;
                else id = element.id; // Skip unchecked checkboxes
                break;
            case 'select-one':
                answer = element.options[element.selectedIndex].value;
                id = element.id;
                break;
            case 'file':
                // For document uploader, collect the file names
                if(!element.files[0]) continue;
                answer = element.files[0].name
                id = element.id;
                break;
            case 'date':
                answer = element.value;
                id = element.id;
                break;
            case 'radio':
                answer = element.checked ? element.value:null;
                if(answer===null) continue;
                else id = element.id;
                break;
            default:
                break;
        }

        // Add the form data item to the array
        const formDataItem = {
            label: label,
            type: type,
            answer: answer,
            id:id
        };

        formDataArray.push(formDataItem);
    }

    // Convert the formDataArray to a JSON string

    if(domForm){
      const htmlString:any = domForm.outerHTML;
      formDataArray.push({
        htmlString:htmlString
      })
    }
    const formDataJSON = JSON.stringify(formDataArray);

    const surveyResponse = {
      user_id: userId?userId:null,
      survey_id: parseInt(surveyID),
      response_data: formDataJSON
    }



    // Print the JSON string to the console
    console.log('are you going to submit Response', surveyResponse)
    submitResponse(surveyResponse);
    submitBTN.innerHTML = 'Submitted';
    console.log(formDataJSON);
  }

  // const [formdata, setFormdata] = useState<any>();

  // function submitFnx(event){
  //   const formData = new FormData(event.target as HTMLFormElement);
  //   setFormdata(formData);
  
  //     // Access form field values using the FormData object
  //     // Iterate through the form data entries (key-value pairs)
  //     for (const [key, value] of formData.entries()) {
  //         console.log(`${key}: ${value}`);
  //     }
  // }
  
  // useEffect(()=>{
  //   const functionnn = async() =>{
  //     handleSubmit(formdata);
  //   }
  
  //   functionnn();
  // },[formdata])




  const initialState = { message: null };
  // const [message, formAction] = useActionState(handleSubmit, null);
  let i = 0;
  let itemID = 1;
  let matrixKey = 0;

  return (
    <div id='dom-form' className='bg-slate-300 pt-4 font-Roboto'>

      <form method="post" className={'flex flex-col justify-center items-center gap-4 mt-12'} onSubmit={handleSubmit}>
        {/* {surveyFields.map((item)=>{
              console.log(item)
            })} */}

        {survey_img && <div className="w-[55%] ">
          <Image width='100' height={100} className="w-[100%] h-[15rem] rounded-lg" src={survey_img} alt='A Survey Banner yash ... '/>
        </div>}

        <div className="w-[55%] rounded-lg border-t-4 border-blue-500 bg-white p-3 ">
          <div className="text-2xl flex  items-center ">
            <label className="my-8 text-left text-2xl outline-none border-b">{title}</label>
          </div>
          <div className=" text-xl text-center flex justify-center items-center">
          <textarea
              className="w-[100%] outline-none text-sm"
              placeholder="Survey Description"
              value={description}
            />
          </div>
        </div>

        



        {surveyFields && surveyFields.map((item: FormFields) => (

          <div className="w-[55%] rounded-lg border-l-4 border-blue-500 bg-white p-3" key={i}>
            {/* {i=i+1} */}
            {item.type === FieldTypes.TEXTINPUT && (
              <div className="flex flex-col ">
                <label htmlFor={(itemID).toString()} className="mb-3 text-lg" >{item.label} </label>
                <input id={(itemID++).toString()} name='TextField' placeholder="Short answer" />
              </div>
            )}

            {item.type == FieldTypes.DROPDOWN && (
              <div className="flex flex-col ">
                <label className="mb-3 text-lg">{item.label}</label>
                <select id={(itemID++).toString()} name='DropDown' className="w-[40%] rounded-md bg-slate-100 px-4 py-4 outline-none">
                  <option className="p-10">Choose your pick </option>
                  {item.options!.map((itemVal) => (
                    <option key={i + 1} className="p-10">
                      {itemVal}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {item.type == FieldTypes.CHECKBOX && (
              <div className="flex flex-col ">
                <p id='checkbox-label' className="mb-3 text-lg">{item.label} </p>
                <div className="flex flex-col ">
                  {item.options?.map((itemVal) => (
                    <div className="align-center flex gap-4" key={i + 1}>
                      <input id={(itemID++).toString()} value={itemVal} name={item.label} type="checkbox" />
                      <label>{itemVal} </label>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {item.type == FieldTypes.FILEUPLOAD && (
              <div className="flex flex-col ">
                <label htmlFor={(itemID).toString()} className="mb-3 text-lg">
                  {item.label}
                </label>
                <div className="flex justify-center items-center">
                  <input id={(itemID++).toString()} name='myfile' type="file" className="w-72 max-w-full p-1.5 bg-white text-gray-800 rounded-lg border border-gray-500 file:mr-5 file:border-none file:bg-blue-800 file:px-5 file:py-2 file:rounded-lg file:text-white file:cursor-pointer file:hover:bg-blue-600" />
                </div>

              </div>
            )}
            {item.type == FieldTypes.DATE && (
              <div className="flex flex-col ">
                <label htmlFor={(itemID).toString()} className="mb-3 text-lg">
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
                  <input name='Date'
                    type="date"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    placeholder="Select date"
                    id={(itemID++).toString()}
                  />
                </div>
              </div>
            )}
            {item.type == FieldTypes.MATRIX && (<div>
              <label className="">{item.label} </label>
              <div className="flex items-center justify-center">
                <table className="w-[80%]">
                  <tbody>
                    <tr className="text-center">
                      <th> </th>
                      {item.matrixColumn?.map((col) => {
                        return <th key={matrixKey++}>{col}</th>;
                      })}
                    </tr>

                    {item.matrixRow?.map((row) => {
                      return (
                        <tr key={matrixKey++}>
                          <td>{row}</td>
                          {item.matrixColumn?.map((cola) => {
                            return <td key={matrixKey++} className="text-center" >
                              <input type="radio" name={row + '1'} id={(itemID++).toString()} value={cola} />
                            </td>
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div></div>
            )}
          </div>
        ))}

        <button id='submit-btn' className="mb-2 me-2 rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800" type={'submit'}>Submit Response</button>
      </form>

    </div>
  )
}
