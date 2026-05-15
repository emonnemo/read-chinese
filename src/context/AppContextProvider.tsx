import React, { useMemo, useState } from "react";
import { AppContext, type AppContextValue } from "./AppContext";
import type { ChineseCharacter } from "../types";

const DEFAULT_TEXT_SIZE = 24;
const TEXT_SIZE_STEP = 4;
const MIN_TEXT_SIZE = 16;
const MAX_TEXT_SIZE = 48;

export const AppContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [chineseData, setChineseData] = useState<ChineseCharacter[]>([]);
  const [showAnnotations, setShowAnnotations] = useState(false);
  const [textSize, setTextSize] = useState(DEFAULT_TEXT_SIZE);

  const value = useMemo<AppContextValue>(
    () => ({
      chineseData,
      showAnnotations,
      textSize,
      decreaseTextSize: () =>
        setTextSize((current) => Math.max(MIN_TEXT_SIZE, current - TEXT_SIZE_STEP)),
      increaseTextSize: () =>
        setTextSize((current) => Math.min(MAX_TEXT_SIZE, current + TEXT_SIZE_STEP)),
      loadChineseData: setChineseData,
      resetChineseData: () => {
        setChineseData([]);
        setShowAnnotations(false);
        setTextSize(DEFAULT_TEXT_SIZE);
      },
      setShowAnnotations,
      toggleAnnotations: () => setShowAnnotations((current) => !current),
    }),
    [chineseData, showAnnotations, textSize],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
