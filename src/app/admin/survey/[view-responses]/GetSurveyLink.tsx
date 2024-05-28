'use client'
import ShareLink from '@/components/common/share-link';
import React from 'react';

export default function GetSurveyLink({surveyID,title}) {
    const baseUrl = process.env.NEXT_PUBLIC_URL;
    const downloadUrl = `${baseUrl}/user/survey/${surveyID}`
  return (
    <div className='flex flex-col w-[100%]'>
        <ShareLink link={downloadUrl} title={title}/>
    </div>
  )
}
