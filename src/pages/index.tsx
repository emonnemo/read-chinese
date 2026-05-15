import BottomNavigationComponent from "../components/BottomNavigation";
import TextDisplay from "../components/TextDisplay";
import UploadForm from "../components/UploadForm";
import { useAppContext } from "../context/useAppContext";

const HomePage = () => {
  const {
    chineseData,
    decreaseTextSize,
    increaseTextSize,
    loadChineseData,
    resetChineseData,
    showAnnotations,
    textSize,
    toggleAnnotations,
  } = useAppContext();

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
            <UploadForm onDataLoaded={loadChineseData} />
          </div>
        ) : (
          <TextDisplay
            data={chineseData}
            showAnnotations={showAnnotations}
            textSize={textSize}
          />
        )}
      </main>

      <BottomNavigationComponent
        decreaseTextSize={decreaseTextSize}
        increaseTextSize={increaseTextSize}
        isHavingAnyData={chineseData.length > 0}
        onUpload={resetChineseData}
        showAnnotations={showAnnotations}
        toggleAnnotations={toggleAnnotations}
      />
    </div>
  );
};

export default HomePage;
