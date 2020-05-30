import React, { useMemo } from "react";

import { KeyboardProps } from "./types";


const shuffleArray = (array: any[]) => {
  return [...array.sort(() => Math.random() - 0.5)];
}

export const Keyboard = ({ emojis, render, shuffled, onClick }: KeyboardProps) => {
  const shufflesEmojis = useMemo(()=> shuffled ? shuffleArray(emojis) : emojis, [emojis.length, shuffled]);
  return render({ emojis: shufflesEmojis, onClick });
};
