import { validateChineseData } from "../utils/validateChineseData";
import type { ChineseCharacter } from "../types";

export const parseChineseTextJson = (content: string): ChineseCharacter[] => {
  const parsed = JSON.parse(content) as unknown;

  if (!validateChineseData(parsed)) {
    throw new Error("Chinese text JSON must be an array of h, p, and t entries.");
  }

  return parsed;
};
