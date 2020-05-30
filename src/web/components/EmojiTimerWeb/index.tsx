import React, { useRef, useState, useEffect } from "react";

import { EmojiTimerWebProps } from "./types";

export const EmojiTimerWeb = ({
  timerValue,
  maxTimerValue,
  emoji,
}: EmojiTimerWebProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [size, setSize] = useState(0);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }
    setSize(containerRef.current.clientWidth);
  }, []);

  const radius = 105;
  const circumference = radius * 2 * Math.PI;
  const percent = (timerValue * 100) / maxTimerValue;
  const offset = (circumference - (percent / 100) * circumference) * -1;

  return (
    <div className="timer" ref={containerRef}>
      <div className="progress-ring">
        <svg className="progress-ring">
          <circle
            className="progress-ring__circle"
            stroke="#4E6ACD"
            strokeWidth="10"
            fill="transparent"
            r={(size/2)-5}
            strokeDashoffset={offset}
            strokeDasharray={`${circumference} ${circumference}`}
            cx={(size/2)}
            cy={(size/2)}
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
          width: 150px;
          height: 150px;
          background: #c4c4c4;
          border-radius: 50%;
          box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 1;
          font-size: 50px;
          margin: 0 auto;
        }

        .timer__inner {
          width: calc(${size}px - 20px);
          height: calc(${size}px - 20px);
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
