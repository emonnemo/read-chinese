import React, { useEffect, useRef, useState } from "react";
import type { ChineseCharacter } from "../types";

interface ChineseTextDisplayProps {
  data: ChineseCharacter[];
  showAnnotations: boolean;
}

interface CharacterTooltip {
  character: string;
  pinyin: string;
  translation: string;
  x: number;
  y: number;
}

const ChineseTextDisplay: React.FC<ChineseTextDisplayProps> = ({
  data,
  showAnnotations,
}) => {
  const [tooltip, setTooltip] = useState<CharacterTooltip | null>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const fullText = data.map((item) => item.h).join("");

  useEffect(() => {
    const handleClickOutside = () => {
      setTooltip(null);
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const getCharacterPinyin = (char: string): string | undefined => {
    for (const item of data) {
      const charIndex = item.h.indexOf(char);
      if (charIndex !== -1) {
        // For multi-character words, we need to split the pinyin
        const pinyinParts = item.p.split(" ");
        if (pinyinParts[charIndex]) {
          return pinyinParts[charIndex];
        }
      }
    }
    return undefined;
  };

  const getCharacterInfo = (char: string): ChineseCharacter | undefined => {
    return data.find((item) => item.h.includes(char));
  };

  const renderCharacter = (char: string, index: number) => {
    // Handle newline characters
    if (char === "\n") {
      return <br key={index} />;
    }

    const pinyin = getCharacterPinyin(char);
    const charInfo = getCharacterInfo(char);

    return (
      <span
        key={index}
        className="relative inline-block"
        style={{
          minWidth: "1.5em",
          marginRight: "0.1em",
          marginBottom: "0.5em",
        }}
      >
        <div
          className="text-xs text-blue-600 text-center"
          style={{
            marginTop: "0.8em",
            whiteSpace: "nowrap",
            fontSize: "0.75em",
            height: "1em",
            opacity: showAnnotations && pinyin ? 1 : 0,
            visibility: showAnnotations && pinyin ? "visible" : "hidden",
            userSelect: "none",
            WebkitUserSelect: "none",
            MozUserSelect: "none",
            msUserSelect: "none",
          }}
        >
          {pinyin || ""}
        </div>
        <span
          className="cursor-pointer hover:bg-blue-100 px-1 rounded transition-colors text-2xl inline-block text-center"
          style={{
            width: "100%",
            userSelect: "none",
            WebkitUserSelect: "none",
            MozUserSelect: "none",
            msUserSelect: "none",
          }}
          onMouseDown={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            if (charInfo) {
              setTooltip({
                character: charInfo.h,
                pinyin: charInfo.p,
                translation: charInfo.t,
                x: rect.left + rect.width / 2,
                y: rect.top - 10,
              });
            }
          }}
          onMouseUp={() => {}}
          onMouseLeave={() => setTooltip(null)}
          onClick={() => setTooltip(null)}
        >
          {char}
        </span>
      </span>
    );
  };

  return (
    <div className="p-8">
      <div
        ref={textRef}
        className="text-center font-serif text-gray-800 p-8 bg-white rounded-lg shadow-lg text-4xl leading-relaxed pt-20"
      >
        {fullText.split("").map((char, index) => renderCharacter(char, index))}
      </div>

      {tooltip && (
        <div
          className="fixed z-50 border-2 border-gray-300 text-gray-800 p-4 rounded-xl shadow-2xl max-w-xs transform -translate-x-1/2 -translate-y-full"
          style={{
            left: `${tooltip.x}px`,
            top: `${tooltip.y}px`,
            backgroundColor: "white",
            borderRadius: "12px",
          }}
        >
          <div className="text-sm text-blue-600 font-medium mb-2">
            {tooltip.pinyin}
          </div>
          <div className="font-bold text-xl mb-2 text-gray-900">
            {tooltip.character}
          </div>
          <div className="text-sm text-gray-700 border-t pt-2">
            {tooltip.translation}
          </div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
            <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-white"></div>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-px">
              <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-gray-300"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChineseTextDisplay;
