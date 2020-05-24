import { Emoji } from "../../../types";

export const compareEmoji = (a: Emoji | null, b: Emoji | null) => {
  if (a === null || b === null) {
    return false;
  }
  return a.codePoint === b.codePoint;
};
