import React, { useCallback } from "react";

import { KeyboardProps } from "./types";

export const Keyboard = ({ emojis, render, onClick }: KeyboardProps) => {
  return render({ emojis, onClick });
};
