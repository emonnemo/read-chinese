import { useState } from "react";
import "./App.css";
import ChineseTextDisplay from "./components/ChineseTextDisplay";
import FileUpload from "./components/FileUpload";
import type { ChineseCharacter } from "./types";

function App() {
  const [chineseData, setChineseData] = useState<ChineseCharacter[]>([]);
  const [showAnnotations, setShowAnnotations] = useState(false);

  const handleDataLoaded = (data: ChineseCharacter[]) => {
    console.log("Data loaded:", data.length, "items");
    setChineseData(data);
  };

  const handleReset = () => {
    setChineseData([]);
    setShowAnnotations(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">Read Chinese</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20">
        {chineseData.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                Learn Chinese Characters
              </h2>
              <p className="text-gray-600 max-w-md">
                Upload a JSON file with Chinese characters, pinyin, and
                translations to start learning. Long press on any character to
                see its pronunciation and meaning.
              </p>
            </div>
            <FileUpload onDataLoaded={handleDataLoaded} />
          </div>
        ) : (
          <ChineseTextDisplay
            data={chineseData}
            showAnnotations={showAnnotations}
          />
        )}
      </main>

      {/* Bottom Navigation */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "white",
          borderTop: "1px solid #e5e7eb",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
          zIndex: 50,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            padding: "16px 20px",
          }}
        >
          <div
            onClick={() =>
              chineseData.length > 0 && setShowAnnotations(!showAnnotations)
            }
            style={{
              fontSize: "16px",
              color: chineseData.length > 0 ? "#374151" : "#9ca3af",
              cursor: chineseData.length > 0 ? "pointer" : "default",
              fontWeight: chineseData.length > 0 ? "500" : "400",
            }}
          >
            Pinyin
          </div>
          <div
            onClick={handleReset}
            style={{
              fontSize: "16px",
              color: "#374151",
              cursor: "pointer",
              fontWeight: "500",
            }}
          >
            Upload
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
