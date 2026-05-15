import React, { useMemo, useState } from "react";
import { AppContext, type AppContextValue } from "./AppContext";
import type { ChineseCharacter } from "../types";

export const AppContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [chineseData, setChineseData] = useState<ChineseCharacter[]>([]);
  const [showAnnotations, setShowAnnotations] = useState(false);

  const value = useMemo<AppContextValue>(
    () => ({
      chineseData,
      showAnnotations,
      loadChineseData: setChineseData,
      resetChineseData: () => {
        setChineseData([]);
        setShowAnnotations(false);
      },
      setShowAnnotations,
      toggleAnnotations: () => setShowAnnotations((current) => !current),
    }),
    [chineseData, showAnnotations],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
