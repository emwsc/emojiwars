import React from "react";

import { HealthWebProps } from "./types";

export const HealthWeb = ({ errorsCount, maxErrorsCount }: HealthWebProps) => {
  const fullHearts = [];
  const emptyHearts = [];
  for (let i = 0; i < maxErrorsCount - errorsCount; i++) {
    fullHearts.push(<i key={i} className="nes-icon is-medium heart"></i>);
  }
  for (let i = 0; i < errorsCount; i++) {
    emptyHearts.push(
      <i key={i} className="nes-icon is-medium is-transparent heart"></i>
    );
  }
  return (
    <section className="health icon-list nes-container with-title is-centered">
      <p className="title">Health</p>
      {fullHearts}
      {emptyHearts}
      <style jsx>{`
        .health {
          margin: 20px auto;
          min-width: 300px;
          width: 90%;
          font-size: 12px;
          box-sizing: border-box;
        }
      `}</style>
    </section>
  );
};
