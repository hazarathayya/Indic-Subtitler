import { formatFileSize } from "@components/utils";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

export default function Dropzone({ setUploadedFile, uploadedFile }) {
  const onDrop = useCallback((acceptedFile) => {
    setUploadedFile(acceptedFile[0]);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      //   "audio/mpeg": [".mp3", ".mpeg", ".mpga"],
      "audio/mp4": [".m4a"],
      "video/webm": [".webm"],
      "audio/wav": [".wav"],
      "audio/mpeg": [".mp3"],
      "video/mp4": [".mp4"],
      "video/mkv": [".mkv"],
    },
  });
  function modalText(active) {
    if (active) {
      return <p className="text-lg font-medium">Drop the files here ...</p>;
    } else {
      return (
        <span>
          <p className="text-lg text-center">
            <span className="font-medium">Click to Upload</span> audio file here
          </p>
          <p className="text-center text-gray-500 text-sm">.WAV, .MP3, .MP4 .WEBM .M4A .MKV</p>
        </span>
      );
    }
  }
  return (
    <div
      className="border-[1px] h-full border-dashed border-gray-300 cursor-pointer flex justify-center items-center hover:bg-s_light-100 transition-all duration-300"
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      {uploadedFile ? (
        <div>
          <div className="text-lg font-medium text-center break-all max-h-36">
            <p className=" truncate-custom">{uploadedFile.path}</p>
          </div>

          {uploadedFile.size ? (
            <p className="text-center text-gray-500">
              ( {formatFileSize(uploadedFile.size)} )
            </p>
          ) : null}
        </div>
      ) : (
        modalText(isDragActive)
      )}
    </div>
  );
}
