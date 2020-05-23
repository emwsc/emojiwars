import React from "react";

import { EmojiTimerWebProps } from "./types";

export const EmojiTimerWeb = ({ timerValue, emoji }: EmojiTimerWebProps) => {
  const radius = 105;
  const circumference = radius * 2 * Math.PI;
  const percent = (timerValue * 100) / 10000;
  const offset = (circumference - (percent / 100) * circumference) * -1;

  return (
    <div className="timer">
      <div className="progress-ring">
        <svg className="progress-ring">
          <circle
            className="progress-ring__circle"
            stroke="#4E6ACD"
            stroke-width="10"
            fill="transparent"
            r="105"
            strokeDashoffset={offset}
            strokeDasharray={`${circumference} ${circumference}`}
            cx="110"
            cy="110"
          />
        </svg>
      </div>
      <div className="timer__inner">
        <span role="img" aria-label={emoji.slug}>
          {emoji.character}
        </span>
      </div>
      <style jsx>{`
        .timer {
          background: #c4c4c4;
          width: 220px;
          height: 220px;
          border-radius: 50%;
          box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 1;
          font-size: 50px;
        }

        .timer__inner {
          width: 200px;
          height: 200px;
          position: relative;
          z-index: 2;
          border-radius: 50%;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .progress-ring {
          position: absolute;
          width: 100%;
          height: 100%;
          z-index: 3;
        }
        .progress-ring__circle {
          transition: 0.35s stroke-dashoffset;
          transform: rotate(-90deg);
          transform-origin: 50% 50%;
        }
      `}</style>
    </div>
  );
};
