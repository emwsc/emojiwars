import React, { useMemo } from "react";

import { KeyboardProps } from "./types";


const shuffleArray = (array: any[]) => {
  return [...array.sort(() => Math.random() - 0.5)];
}

export const Keyboard = ({ emojis, render, onClick }: KeyboardProps) => {
  const shufflesEmojis = useMemo(()=> shuffleArray(emojis), [emojis.length]);
  return render({ emojis: shufflesEmojis, onClick });
};
