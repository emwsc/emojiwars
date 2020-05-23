import React, { useEffect, useState } from "react";

import { EmojiTimerProps } from "./types";
import { ONE_SECOND } from "./constants";

export const EmojiTimer = ({ render, timerValue }: EmojiTimerProps) => {
  const [currentTimerValue, setCurrentTimerValue] = useState(timerValue);
  useEffect(() => {
    const interval = setInterval(() => {
      if (currentTimerValue <= 0) {
        return clearInterval(interval);
      }
      setCurrentTimerValue(currentTimerValue - ONE_SECOND)
    }, ONE_SECOND);
    return () => clearInterval(interval);
  }, [currentTimerValue]);
  return render(currentTimerValue);
};
