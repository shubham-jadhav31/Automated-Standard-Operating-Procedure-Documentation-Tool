import React from 'react'
import VideoUploader from './VideoUploader'

const Container = ({lang}) => {
    const handleFileUpload = (file) => {
        console.log("Uploaded file:", file);
      };
    
    return (
        <div className='w-1/2 pt-2 pb-2 h-auto rounded-md m-auto shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
            <div className="flex justify-center items-center">
                <VideoUploader lang={lang}/>
            </div>
        </div>
    )
}

export default Container