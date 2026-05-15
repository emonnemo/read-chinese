import { createContext } from "react";
import type { ChineseCharacter } from "../types";

export interface AppContextValue {
  chineseData: ChineseCharacter[];
  showAnnotations: boolean;
  textSize: number;
  decreaseTextSize: () => void;
  increaseTextSize: () => void;
  loadChineseData: (data: ChineseCharacter[]) => void;
  resetChineseData: () => void;
  setShowAnnotations: (show: boolean) => void;
  toggleAnnotations: () => void;
}

export const AppContext = createContext<AppContextValue | undefined>(undefined);
