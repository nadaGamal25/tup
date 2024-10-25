import React, { useState, useEffect } from 'react';

export default function MarketerGenerateLink(marketerData) {
    const marketerCode = marketerData.marketerData.data.user.code ;
    const [firstPartOfLink, setFirstPartOfLink] = useState('');

    useEffect(() => {
        console.log(marketerData)
      // Get the current URL
      const currentURL = window.location.href;
  
      // Extract the first part of the link
      const firstPart = extractFirstPart(currentURL);
  
      // Set the state with the first part of the link
      setFirstPartOfLink(firstPart);
    }, []);
  
    // Function to extract the first part of the link
    const extractFirstPart = (url) => {
      // Use URL constructor to parse the URL
      const parsedUrl = new URL(url);
  
      // Get the origin (protocol + hostname) from the parsed URL
      const firstPart = parsedUrl.origin;
  
      return firstPart;
    };
  
  return (
<>
    <div className="p-5" id='content'>
      <div className="bg-light p-4">
   
           <div className="link-box p-3 text-center" >
              <p className='text-primary' dir='ltr'>{`${firstPartOfLink}/registerClient/${marketerCode}`}</p>
            
            </div>
           </div>
    </div>
    </>  )
}
