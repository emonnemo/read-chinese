import React, { useEffect, useRef, useState } from "react";
import type { ChineseCharacter } from "../types";

interface TextDisplayProps {
  data: ChineseCharacter[];
  showAnnotations: boolean;
  textSize: number;
}

interface CharacterTooltip {
  character: string;
  pinyin: string;
  translation: string;
  x: number;
  y: number;
}

const TextDisplay: React.FC<TextDisplayProps> = ({
  data,
  showAnnotations,
  textSize,
}) => {
  const [tooltip, setTooltip] = useState<CharacterTooltip | null>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const fullText = data.map((item) => item.h).join("");
  const pinyinTextSize = Math.max(12, textSize * 0.5);
  const pinyinLineHeight = pinyinTextSize * 1.35;
  const pinyinBottomGap = Math.max(4, textSize * 0.12);
  const characterBlockWidth = textSize * 1.5;
  const characterBottomGap = Math.max(8, textSize * 0.35);
  const tooltipPinyinSize = Math.max(14, textSize * 0.58);
  const tooltipCharacterSize = Math.max(20, textSize * 0.9);
  const tooltipTranslationSize = Math.max(14, textSize * 0.58);

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
          minWidth: `${characterBlockWidth}px`,
          marginRight: `${Math.max(2, textSize * 0.08)}px`,
          marginBottom: `${characterBottomGap}px`,
          verticalAlign: "top",
        }}
      >
        <div
          className="text-xs text-blue-600 text-center"
          style={{
            marginBottom: `${pinyinBottomGap}px`,
            whiteSpace: "nowrap",
            fontSize: `${pinyinTextSize}px`,
            height: `${pinyinLineHeight}px`,
            lineHeight: `${pinyinLineHeight}px`,
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
          className="cursor-pointer hover:bg-blue-100 px-1 rounded transition-colors inline-block text-center"
          style={{
            fontSize: `${textSize}px`,
            lineHeight: 1.15,
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
        className="text-center font-serif text-gray-800 p-8 bg-white rounded-lg shadow-lg leading-relaxed pt-20"
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
          <div
            className="text-blue-600 font-medium mb-2"
            style={{ fontSize: `${tooltipPinyinSize}px` }}
          >
            {tooltip.pinyin}
          </div>
          <div className="font-bold mb-2 text-gray-900">
            <span style={{ fontSize: `${tooltipCharacterSize}px` }}>
              {tooltip.character}
            </span>
          </div>
          <div
            className="text-gray-700 border-t pt-2"
            style={{ fontSize: `${tooltipTranslationSize}px` }}
          >
            {tooltip.translation}
          </div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
            <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-white" />
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-px">
              <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-gray-300" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TextDisplay;
