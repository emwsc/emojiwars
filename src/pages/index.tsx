import React, { useCallback, useState, useMemo } from "react";
import axios from "axios";

import { EmojiTimer } from "../shared/components/EmojiTimer";
import { EmojiTimerWeb } from "../web/components/EmojiTimerWeb";
import { Keyboard } from "../shared/components/Keyboard";
import { KeyboardWeb } from "../web/components/KeyboardWeb";
import { HealthWeb } from "../web/components/HealthWeb";
import { DifficultyLevelWeb } from "../web/components/DifficultyLevelWeb";

import {
  compareEmoji,
  getDifficultySettings,
  pickRandomEmoji,
  pickEmojis,
} from "../shared/logic";
import { absoluteUrl } from "../next";

import { Emoji, DifficultyLevel, DifficultyLevelSettings } from "../types";

type IndexProps = {
  emojis: Emoji[];
};

type GameProps = IndexProps & {
  settings: DifficultyLevelSettings;
};

const Game = ({ emojis, settings }: GameProps) => {
  const { maxTimer, maxErrorsCount, emojiCount, shuffled } = settings;

  const pickedEmojis = useMemo(() => pickEmojis(emojis, emojiCount), [
    settings,
  ]);

  /**
   * @todo Move state to app store
   */
  const [emoji, setEmoji] = useState(pickRandomEmoji(pickedEmojis));
  const [errorCount, updateErrorCount] = useState(0);
  const [maxTimerValue, setMaxTimervalue] = useState(maxTimer);
  const [score, setScore] = useState(0);

  const emojiTimerRender = useCallback(
    (props) => <EmojiTimerWeb {...props} emoji={emoji} />,
    [emoji]
  );
  const keyboardRender = useCallback((props) => <KeyboardWeb {...props} />, []);

  const handleOnTimerEnd = useCallback(
    (isError: boolean) => {
      setEmoji(pickRandomEmoji(pickedEmojis));
      if (isError) {
        updateErrorCount((value) => value + 1);
      }
    },
    [pickedEmojis, settings]
  );

  /**
   * @todo Move logic to shared
   */
  const handleOnKeyboardClick = useCallback(
    (selectedEmoji: Emoji) => {
      if (compareEmoji(selectedEmoji, emoji)) {
        setScore((value) => value + 1);
        setMaxTimervalue((value) => value - 250);
        handleOnTimerEnd(false);
      } else {
        handleOnTimerEnd(true);
      }
    },
    [pickedEmojis, settings, emoji]
  );

  return (
    <>
      <main className="page">
        <section className="stats-container">
          <h2 className="text">Score {score}</h2>
          <HealthWeb errorsCount={errorCount} maxErrorsCount={maxErrorsCount} />
          {errorCount < maxErrorsCount && (
            <EmojiTimer
              key={emoji.character}
              maxTimerValue={maxTimerValue}
              render={emojiTimerRender}
              onTimerEnd={handleOnTimerEnd}
            />
          )}
          {errorCount === maxErrorsCount && <p className="text">You died</p>}
        </section>
        <section className="keyboard-container">
          {errorCount < maxErrorsCount && (
            <Keyboard
              shuffled={shuffled}
              emojis={pickedEmojis}
              render={keyboardRender}
              onClick={handleOnKeyboardClick}
            />
          )}
        </section>
        <style jsx>{`
          .text {
            text-align: center;
          }
          .page {
            margin: 0 auto;
            max-width: 600px;
            display: grid;
            grid-template-columns: 1fr 420px;
            grid-template-rows: 1fr;
            grid-gap: 10px;
            justify-content: center;
            align-items: center;
            height: 100vh;
          }

          .keyboard-container {
            width: 100%;
            height: 360px;
          }

          @media (max-width: 1000px) {
            .page {
              overflow: hidden;
              grid-template-rows: 1fr 260px;
              grid-template-columns: 100vw;
              position: absolute;
              bottom: 0;
              grid-gap: 50px;
            }
            .keyboard-container {
              height: 100%;
            }
            .stats-container {
              align-self: end;
            }
          }
        `}</style>
      </main>
    </>
  );
};

const Index = (props: IndexProps) => {
  const [
    difficultyLevel,
    selectDifficultyLevel,
  ] = useState<DifficultyLevel | null>(null);
  const handleSelectDifficultyLevel = useCallback((level: DifficultyLevel) => {
    selectDifficultyLevel(level);
  }, []);
  return (
    <>
      {difficultyLevel === null && (
        <main className="menu">
          <h1 className="title">
            <span role="img" alt-label="Skull and Crossbones">
              ☠️
            </span>
            <span>Emoji Wars</span>
            <span role="img" alt-label="Skull and Crossbones">
              ☠️
            </span>
          </h1>
          <DifficultyLevelWeb
            selectDifficultyLevel={handleSelectDifficultyLevel}
          />
          <style jsx>{`
            .menu {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              width: 90%;
            }

            .title {
              width: 80%;
              margin: 0 auto;
              margin-bottom: 20px;
              font-size: 20px;
              display: flex;
              align-items: center;
              justify-content: space-between;
            }
          `}</style>
        </main>
      )}
      {difficultyLevel !== null && (
        <Game {...props} settings={getDifficultySettings(difficultyLevel)} />
      )}
    </>
  );
};

Index.getInitialProps = async (ctx) => {
  const url = absoluteUrl(ctx.req).origin + "/api/emoji/get";
  const { data } = await axios.get(url);
  return { emojis: data };
};

export default Index;
