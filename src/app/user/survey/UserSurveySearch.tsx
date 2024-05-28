'use client'
import { useState, useEffect } from 'react'
import Input from '@/components/common/Search-Input'
import Link from 'next/link'
import UserSurveyList from './UserSurveyList'

function UserSurveySearchFunctionality({surveyData}:{surveyData:any}) {

  const [filteredResponses, setFilteredResponses] = useState([])
  
  useEffect(()=>{setFilteredResponses(surveyData);},[])

  const filterItems = (searchTerm) => { 
    if(surveyData.length==0) return;
    
    const filteredItems = surveyData.filter((response) =>
    (response.survey_title.split('%!@')[0].toLowerCase().includes(searchTerm.toLowerCase()) || response.survey_title.split('%!@')[1].toLowerCase().includes(searchTerm.toLowerCase()))
    );

    setFilteredResponses(filteredItems);
  }

  return (
    <>
      

      <div className="flex justify-between relative mx-4 mt-2 mb-8">
        <Input placeholder={'Search Records'} onChangeCallback={filterItems} />    
      </div>
      
      <UserSurveyList surveyData={filteredResponses}/>
    </>
  )
}

export default UserSurveySearchFunctionality