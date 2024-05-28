'use client'
import React, { useEffect, useState } from 'react'

export default function SurveyResponse({response}) {

    // response = response[0];

    // console.log(response)

    function responseDataToHTML(response){

        const htmlString = JSON.parse(response);
        console.log('this is response from db ', htmlString)
        const htmlDATA = htmlString[htmlString.length - 1];
        console.log('This is htmlString', htmlDATA.htmlString )
        const formdiv = document.createElement('div');
        formdiv.innerHTML = htmlDATA.htmlString;

        console.log('this is formdiv', formdiv)

        if(formdiv.firstChild?.firstChild){
            const grandchild = formdiv.firstChild.firstChild as HTMLElement;
            // grandchild.style = "display: flex; flex-direction: column; justify-items: center;align-items: center;gap:1rem;"
            grandchild.style.display = "flex";
            grandchild.style.flexDirection = "column";
            grandchild.style.justifyContent = "center";
            grandchild.style.alignItems = "center";
            grandchild.style.gap = "1rem";
        }
        
        // document.getElementById('form').appendChild(formdiv);
        
        const formElement = document.getElementById('form');
        if(formElement && formElement.childElementCount>0){
            return;
        }
        if (formElement) {
            formElement.appendChild(formdiv);
        } else {
            console.error('Element with ID "form" not found in the document.');
        }
    
        for(let data of htmlString){
            console.log('This is data: ',data.id);
            if(data.id){
                const ele = document.getElementById(data.id) as HTMLInputElement;
                // if(ele){
                //     ele.value = data.answer;
                // }
                if(ele){
                    console.log('****************************', ele)
                    ele.disabled = true;
                    switch(ele.type){
                        case 'checkbox':
                            ele.checked = true;
                            break;
                        case 'radio':
                            console.log('This is a radio button', ele)
                            ele.checked = true;
                            ele.classList.add('disabled:bg-red-200');
                            break;
                        case 'file':
                            console.log('this is filedata: moon',data)
                            ele.type = 'text'
                            // ele.disabled = true;
                            if(!data.answer){
                                ele.value = 'No file uploaded';
                                
                                continue;
                            }
                            ele.value = data.answer;
                            break;
                        default:
                            ele.value = data.answer;
                            break;
                    }

                }
                // if(ele.type!='select'){
                    
                // }
                 
            }
        }

        const subbtn = document.getElementById('submit-btn')
        if(subbtn) subbtn.style.display = 'none';
        
    }

    useEffect(() => {
        responseDataToHTML(response);
        // console.log('farthest page: ',response);
     },[])

    
    
  return (
        <div id={'form'} className='w-[100%] bg-slate-300 pb-8' >
      
        </div>
  )
}
