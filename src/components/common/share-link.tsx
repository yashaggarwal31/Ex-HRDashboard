
import CopyToClipboard from './copy-link';

const ShareLink = ({link,title}) => {

    return (
        <div className="w-full">
            <div className="mb-2">
                <label htmlFor="website-url" className=" text-lg font-medium text-gray-900 dark:text-white text-center">Share this survey</label>
            </div>
              <h4 className='mb-4 text-base font-medium text-green-600'> {title.split('%!@')[0]}</h4>
            {/* <div className='flex gap-2 items-center'><span className='text-sm font-medium text-gray-900 dark:text-white'>Survey Description:</span><h4>  {title.split('%!@')[1]}</h4></div> */}
           
                <div className="flex items-center">
                    <span className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg dark:bg-gray-600 dark:text-white dark:border-gray-600">URL</span>
                    <div className="relative w-full">
                        <input id="website-url" type="text" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-e-0  border-gray-300 text-gray-500 dark:text-gray-400 text-sm border-s-0 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" value={link} readOnly disabled /> 
                    </div>
                    <span className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-white bg-blue-800 border border-gray-300 rounded-e-lg dark:bg-gray-600 dark:text-white dark:border-gray-600"><CopyToClipboard link = {link}/></span>
                </div>
                
            
        </div>
    );
};

export default ShareLink;
