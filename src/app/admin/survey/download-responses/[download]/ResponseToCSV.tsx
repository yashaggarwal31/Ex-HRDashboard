'use client'
import React from 'react'

export default function ResponseToCSV({csv,title,description}) {
    console.log(csv)

    function downloadCSV(){
      var hiddenElement = document.createElement('a');  
      hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);  
      hiddenElement.target = '_blank';  
        
      //provide the name for the CSV file to be downloaded  
      hiddenElement.download = `${title}.csv`;  
      hiddenElement.click();  
    }

  return (

    <div className='flex h-[80vh]'>
      <div className='m-auto'>

      <div className="relative p-20">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              
              <div className="flex flex-col p-[10rem] gap-4">
                  {/* <div className='flex justify-center items-center'>
                    <blockquote className="text-xl italic font-semibold text-center text-gray-900 dark:text-white">
                        <p>"Flowbite is just awesome. It contains tons of predesigned components and pages starting from login screen to complex dashboard. Perfect choice for your next SaaS application."</p>
                    </blockquote>
                  </div> */}
                  <h3 className="mb-1 text-xl font-bold text-gray-900 dark:text-white">{title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-6">
                  {description}
                  </p>

                  
                  <div className="flex items-center mt-6 space-x-4 rtl:space-x-reverse justify-center">
                      <button onClick={downloadCSV} data-modal-hide="progress-modal" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Download CSV</button>
                      {/* <button data-modal-hide="progress-modal" type="button" className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Cancel</button> */}
                  </div>
              </div>
          </div>
      </div>

      </div>
    </div>

  )
}
