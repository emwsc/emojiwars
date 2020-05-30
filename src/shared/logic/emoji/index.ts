import { Emoji } from "../../../types";
import { getRandomInt } from "../toolkit";

export const compareEmoji = (a: Emoji | null, b: Emoji | null) => {
  if (a === null || b === null) {
    return false;
  }
  return a.codePoint === b.codePoint;
};

export const pickEmojis = (emojis: Emoji[], maxCount: number) => {
  if(maxCount > emojis.length) {
    return emojis;
  }
  return emojis.slice(0, maxCount);
};

export const pickRandomEmoji = (emojis: Emoji[]) => {
  return emojis[getRandomInt(0, emojis.length)];
};
