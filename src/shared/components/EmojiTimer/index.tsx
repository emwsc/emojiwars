import React, { useEffect, useState } from "react";

import { EmojiTimerProps } from "./types";
import { ONE_SECOND } from "./constants";

export const EmojiTimer = ({ render, maxTimerValue, onTimerEnd }: EmojiTimerProps) => {
  const [timerValue, settimerValue] = useState(maxTimerValue);
  useEffect(() => {
    const interval = setInterval(() => {
      if (timerValue <= 0) {
        onTimerEnd();
        settimerValue(maxTimerValue);
        return;
      }
      settimerValue(timerValue - ONE_SECOND)
    }, ONE_SECOND);
    return () => clearInterval(interval);
  }, [timerValue]);
  return render({timerValue, maxTimerValue});
};
