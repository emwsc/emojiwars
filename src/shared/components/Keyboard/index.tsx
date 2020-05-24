import React, { useCallback } from "react";

import { KeyboardProps } from "./types";

export const Keyboard = ({ emojis, render }: KeyboardProps) => {
  const handleOnClick = useCallback((emoji) => {}, []);
  return render({ emojis, onClick: handleOnClick });
};
