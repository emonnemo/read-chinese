import React, { useEffect, useRef, useState } from "react";
import CharacterTooltip from "./CharacterTooltip";
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

  const pinyinTextSize = Math.max(12, textSize * 0.5);
  const pinyinLineHeight = pinyinTextSize * 1.35;
  const pinyinBottomGap = Math.max(4, textSize * 0.12);
  const characterBlockWidth = textSize * 1.2;
  const characterBottomGap = Math.max(8, textSize * 0.35);
  const groupedCharacterGap = Math.max(1, textSize * 0.03);
  const wordGroupGap = Math.max(8, textSize * 0.35);

  useEffect(() => {
    const handleClickOutside = () => {
      setTooltip(null);
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const renderCharacter = (
    char: string,
    characterIndex: number,
    item: ChineseCharacter,
  ) => {
    if (char === "\n") {
      return <br key={characterIndex} />;
    }

    const pinyin = item.p.split(" ")[characterIndex];

    return (
      <span
        key={`${item.h}-${characterIndex}`}
        className="relative inline-block"
        style={{
          minWidth: `${characterBlockWidth}px`,
          marginRight: `${groupedCharacterGap}px`,
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
            setTooltip({
              character: item.h,
              pinyin: item.p,
              translation: item.t,
              x: rect.left + rect.width / 2,
              y: rect.top - 10,
            });
          }}
          onMouseLeave={() => setTooltip(null)}
          onClick={() => setTooltip(null)}
        >
          {char}
        </span>
      </span>
    );
  };

  const renderWordGroup = (item: ChineseCharacter, itemIndex: number) => {
    if (item.h === "\n") {
      return <br key={`line-break-${itemIndex}`} />;
    }

    return (
      <span
        key={`${item.h}-${itemIndex}`}
        className="inline-block"
        style={{
          marginRight: `${wordGroupGap}px`,
          whiteSpace: "nowrap",
        }}
      >
        {item.h
          .split("")
          .map((char, characterIndex) =>
            renderCharacter(char, characterIndex, item),
          )}
      </span>
    );
  };

  return (
    <div className="p-8">
      <div
        ref={textRef}
        className="text-center font-serif text-gray-800 p-8 bg-white rounded-lg shadow-lg leading-relaxed pt-20"
      >
        {data.map((item, itemIndex) => renderWordGroup(item, itemIndex))}
      </div>

      {tooltip && (
        <CharacterTooltip
          character={tooltip.character}
          pinyin={tooltip.pinyin}
          textSize={textSize}
          translation={tooltip.translation}
          x={tooltip.x}
          y={tooltip.y}
        />
      )}
    </div>
  );
};

export default TextDisplay;
