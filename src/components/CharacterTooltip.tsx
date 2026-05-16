interface CharacterTooltipProps {
  character: string;
  pinyin: string;
  textSize: number;
  translation: string;
  x: number;
  y: number;
}

const CharacterTooltip: React.FC<CharacterTooltipProps> = ({
  character,
  pinyin,
  textSize,
  translation,
  x,
  y,
}) => {
  const pinyinSize = Math.max(14, textSize * 0.58);
  const characterSize = Math.max(20, textSize * 0.9);
  const translationSize = Math.max(14, textSize * 0.58);

  return (
    <div
      className="fixed z-50 border-2 border-gray-300 text-gray-800 p-4 rounded-xl shadow-2xl max-w-xs transform -translate-x-1/2 -translate-y-full"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        backgroundColor: "white",
        borderRadius: "12px",
      }}
    >
      <div
        className="text-blue-600 font-medium mb-2"
        style={{ fontSize: `${pinyinSize}px` }}
      >
        {pinyin}
      </div>
      <div className="font-bold mb-2 text-gray-900">
        <span style={{ fontSize: `${characterSize}px` }}>{character}</span>
      </div>
      <div
        className="text-gray-700 border-t pt-2"
        style={{ fontSize: `${translationSize}px` }}
      >
        {translation}
      </div>
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
        <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-white" />
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-px">
          <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-gray-300" />
        </div>
      </div>
    </div>
  );
};

export default CharacterTooltip;
