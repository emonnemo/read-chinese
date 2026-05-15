import type { ChineseCharacter } from "../types";

const isChineseCharacterEntry = (value: unknown): value is ChineseCharacter => {
  if (!value || typeof value !== "object") {
    return false;
  }

  const entry = value as Record<string, unknown>;
  return (
    typeof entry.h === "string" &&
    typeof entry.p === "string" &&
    typeof entry.t === "string"
  );
};

export const validateChineseData = (
  value: unknown,
): value is ChineseCharacter[] => {
  return Array.isArray(value) && value.every(isChineseCharacterEntry);
};
