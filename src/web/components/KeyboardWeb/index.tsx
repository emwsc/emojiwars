import React from "react";

import { KeyboardWebProps, KeyProps } from "./types";
import { Emoji } from "../../../types";

const Key = ({ character, slug }: KeyProps) => {
  return (
    <button className="key" tabIndex={1}>
      <span role="img" aria-label={slug}>{character}</span>
      <style jsx>{`
        .key {
          background: #fff;
          border-radius: 5px;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 50px;
          width: 30px;
          margin: 2px;
          border: 1px solid transparent;
          outline: none;
          box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.3);
        }

        .key::-moz-focus-inner {
          border: 0;
        }

        .key:focus {
          border-color: var(--light-blue);
        }

        .key:active{
          border-color: var(--light-blue);
          background: var(--light-blue);
        }
      `}</style>
    </button>
  );
};

const breakIntoBlocks = (emojis: Emoji[]) => {
  const blocks = [[]];
  emojis.forEach((emoji) => {
    let lastBlock = blocks[blocks.length - 1];
    if (lastBlock.length >= 60) {
      blocks.push([]);
      lastBlock = blocks[blocks.length - 1];
    }
    lastBlock.push(emoji);
  });
  return blocks;
};

export const KeyboardWeb = ({ emojis, onClick }: KeyboardWebProps) => {
  const blocks = breakIntoBlocks(emojis);
  return (
    <div className="keyboard">
      <div className="keyboard__keys-container">
        {blocks.map((block, index) => {
          return (
            <div key={index} className="block">
              {block.map((emoji) => (
                <Key key={emoji.character} {...emoji} />
              ))}
            </div>
          );
        })}
      </div>

      <style jsx>{`
        .keyboard {
          background: #ced2d9;
          max-width: 100%;
          height: 320px;
          margin: 0 auto;
          padding: 10px;
          border-radius: 5px;
          box-sizing: border-box;
        }

        .keyboard__keys-container {
          width: 100%;
          height: 100%;
          display: flex;
          overflow-x: auto;
          overflow-y: hidden;
          margin-bottom: 15px;
          scroll-snap-type: x mandatory;
        }

        .block {
          scroll-snap-align: start;
          flex-shrink: 0;
          width: 100%;
          height: 100%;
          display: flex;
          flex-wrap: wrap;
          justify-content: start;
          align-content: start;
        }
      `}</style>
    </div>
  );
};
