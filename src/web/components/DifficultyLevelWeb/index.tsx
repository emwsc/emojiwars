import React, { useCallback } from "react";

import { DifficultyLevel } from "../../../types";
import { DifficultyLevelWebProps } from "./types";

export const DifficultyLevelWeb = ({
  selectDifficultyLevel,
}: DifficultyLevelWebProps) => {
  const levels = Object.values(DifficultyLevel);
  return (
    <div className="levels">
      {levels.map((level) => (
        <button
          key={level}
          onClick={useCallback(() => selectDifficultyLevel(level), [])}
          type="button"
          className="nes-btn is-primary"
        >
          {level}
        </button>
      ))}
      <style jsx>{`
        .levels {
          display: grid;
          grid-template-columns: 1fr;
          grid-rows: auto;
          grid-gap: 10px;
        }
      `}</style>
    </div>
  );
};
