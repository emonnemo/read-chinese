import React from "react";
import type { ChineseCharacter } from "../types";

interface FileUploadProps {
  onDataLoaded: (data: ChineseCharacter[]) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onDataLoaded }) => {
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const data = JSON.parse(content) as ChineseCharacter[];
        onDataLoaded(data);
      } catch (error) {
        console.error("Error parsing JSON:", error);
        alert(
          "Invalid JSON file. Please upload a valid JSON file with the correct format.",
        );
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 rounded-lg">
      <label htmlFor="file-upload" className="cursor-pointer">
        <div className="flex flex-col items-center">
          <svg
            className="w-12 h-12 text-gray-400 mb-4"
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
          <span className="text-lg font-medium text-gray-700 mb-2">
            Upload Chinese Text JSON
          </span>
          <span className="text-sm text-gray-500">
            Click to browse or drag and drop
          </span>
        </div>
      </label>
      <input
        id="file-upload"
        type="file"
        accept=".json"
        onChange={handleFileUpload}
        className="hidden"
      />
    </div>
  );
};

export default FileUpload;
