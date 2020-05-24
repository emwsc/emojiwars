import React, { useRef, useState, useEffect, useCallback } from "react";

import { KEY_HEIGHT, KEY_MARGIN, KEY_WIDTH } from "./constants";

import { KeyboardWebProps, KeyProps } from "./types";
import { Emoji } from "../../../types";

const Key = ({ emoji, onClick }: KeyProps) => {
  const { character, slug } = emoji;

  const handleOnClick = useCallback(() => onClick(emoji), [emoji, onClick]);

  return (
    <button className="key" tabIndex={1} onClick={handleOnClick}>
      <span role="img" aria-label={slug}>
        {character}
      </span>
      <style jsx>{`
        .key {
          flex-shrink: 0;
          background: #fff;
          border-radius: 5px;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          width: 100%;
          border: 1px solid transparent;
          outline: none;
          box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.3);
          font-size: 24px;
          padding: 0;
          transition: all 0.25s ease;
        }

        .key::-moz-focus-inner {
          border: 0;
        }

        .key:focus {
          border-color: var(--light-blue);
        }

        .key:active {
          border-color: var(--light-blue);
          background: var(--light-blue);
        }
      `}</style>
    </button>
  );
};

const breakIntoBlocks = (emojis: Emoji[], columns: number, rows: number) => {
  const maxKeys = rows * columns;
  const blocks = [[]];
  emojis.forEach((emoji) => {
    let lastBlock = blocks[blocks.length - 1];
    if (lastBlock.length >= maxKeys) {
      blocks.push([]);
      lastBlock = blocks[blocks.length - 1];
    }
    lastBlock.push(emoji);
  });
  return blocks;
};

export const KeyboardWeb = ({ emojis, onClick }: KeyboardWebProps) => {
  const keyboardRef = useRef<HTMLDivElement | null>(null);
  const [blocks, setBlocks] = useState([]);
  const [columns, setColumns] = useState(0);
  const [rows, setRows] = useState(0);
  useEffect(() => {
    const { clientWidth, clientHeight } = keyboardRef.current;
    const columns = Math.floor(clientWidth / (KEY_WIDTH + KEY_MARGIN));
    let rows = Math.floor(clientHeight / (KEY_HEIGHT + KEY_MARGIN));
    if (rows === 0) {
      rows = 1;
    }
    setRows(rows);
    setColumns(columns);
    setBlocks(breakIntoBlocks(emojis, columns, rows));
  }, []);
  return (
    <div className="keyboard">
      <div className="keyboard__keys-container" ref={keyboardRef}>
        {blocks.map((block, index) => {
          return (
            <div key={index} className="block">
              {block.map((emoji) => (
                <Key key={emoji.character} emoji={emoji} onClick={onClick} />
              ))}
            </div>
          );
        })}
      </div>

      <style jsx>{`
        .keyboard {
          background: #ced2d9;
          width: 100%;
          height: 100%;
          margin: 0 auto;
          border-radius: 5px;
          box-sizing: border-box;
        }

        .keyboard__keys-container {
          width: 100%;
          height: 100%;
          display: flex;
          overflow-x: auto;
          overflow-y: hidden;
          scroll-snap-type: x mandatory;
        }

        .block {
          scroll-snap-align: center;
          width: 100%;
          height: 100%;
          display: grid;
          grid-template-rows: repeat(${rows}, ${KEY_HEIGHT}px);
          grid-template-columns: repeat(${columns}, ${KEY_WIDTH}px);
          grid-gap: ${KEY_MARGIN}px;
          align-content: center;
          justify-content: center;
          flex-shrink: 0;
        }

        @media (max-width: 1000px) {
          .keyboard {
            border-radius: 5px 5px 0 0;
          }
        }
      `}</style>
    </div>
  );
};
