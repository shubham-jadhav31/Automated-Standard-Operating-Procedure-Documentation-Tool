import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import notify from "./utils/notify.js";

const VideoUploader = ({lang = "English"}) => {
  const [videoUrl, setVideoUrl] = useState(null);
  const [file, setFile] = useState(null); 
  const [isProcessing, setIsProcessing] = useState(false);
  const [fileUrl, setFileUrl] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const selectedFile = acceptedFiles[0];

    // Check if the file is actually a video
    if (selectedFile && selectedFile.type.startsWith('video/')) {
      const url = URL.createObjectURL(selectedFile);
      setVideoUrl(url);
      setFile(selectedFile);
    } else {
      // alert('Only video files are allowed!');
      notify("Only video files are allowed!", "warning");
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'video/mp4': [],
      'video/avi': [],
      'video/mov': [],
      'video/webm': [],
      'video/mkv': []
    },
    multiple: false
  });

  const handleProcess = async () => {
    console.log('Processing video...');

    if (!file) {
      console.error("No file selected");
      return;
    }

    setIsProcessing(true);
    // Custom styling
    notify("Video is being processed", "info");

    const selectedLanguage = lang;
    const formData = new FormData();

    formData.append("video", file);
    formData.append("language", selectedLanguage);

    try {
      const response = await fetch("http://127.0.0.1:5000/process", {
        method: "POST",
        body: formData
      });

      if (!response.ok) throw new Error("Failed to process file");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      setFileUrl(url);
      console.log("File is ready for download.");
      notify("File is ready for download", "success");
    } catch (error) {
      console.error("Error processing file:", error);
      notify(`Error: something went wrong`, "error");
    }

    setIsProcessing(false);
  };

  const handleDownload = () => {
    if (fileUrl) {
      const a = document.createElement('a');
      a.href = fileUrl;
      a.download = "documentation.docx";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else {
      console.error("No file available for download.");
      notify("No file available for download", "error");
    }
  };

  return (
    <div className="max-w-3xl mt-2 mx-auto p-2">
      {!videoUrl ? (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
            ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}`}
        >
          <input {...getInputProps()} />
          <div className="space-y-4">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <p className="text-gray-600">
              {isDragActive ? 'Drop the video here' : 'Drag & drop video, or click to select'}
            </p>
            <p className="text-sm text-gray-500">MP4, AVI, MOV, etc. (Max 500MB)</p>
          </div>
        </div>
      ) : (
        <div className="space-y-4 w-7/8 max-w-9/10 m-auto">
          <div className="relative bg-white rounded-lg overflow-hidden">
            <video controls className="m-auto aspect-video">
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="flex justify-end gap-4">
            <button
              onClick={() => {
                setVideoUrl(null);
                setFile(null);
                setFileUrl(null);
              }}
              className="px-3 py-1.5 text-gray-900 bg-gray-200 rounded-md cursor-pointer hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>

            {!fileUrl ? (
              <button
                onClick={handleProcess}
                className="px-4 py-1.5 bg-gray-900 text-white rounded-md cursor-pointer hover:bg-gray-800 transition-colors"
                disabled={isProcessing}
              >
                {isProcessing ? "Processing..." : "Process Video"}
              </button>
            ) : (
              <button
                onClick={handleDownload}
                className="px-4 py-1.5 bg-blue-600 text-white rounded-md cursor-pointer hover:bg-blue-500 transition-colors"
              >
                Download File
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoUploader;
