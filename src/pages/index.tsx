import React, { useCallback, useState } from "react";
import axios from "axios";

import Head from "next/head";
import { EmojiTimer } from "../shared/components/EmojiTimer";
import { EmojiTimerWeb } from "../web/components/EmojiTimerWeb";
import { Keyboard } from "../shared/components/Keyboard";
import { KeyboardWeb } from "../web/components/KeyboardWeb";

import { getRandomInt, compareEmoji } from "../shared/logic";
import { absoluteUrl } from "../next";

import { Emoji } from "../types";

export type IndexProps = {
  emojis: Emoji[];
};

const MAX_ERROR = 5;

const Index = ({ emojis }: IndexProps) => {
  /**
   * @todo Move state to app store
   */
  const [emoji, setEmoji] = useState(emojis[getRandomInt(0, emojis.length)]);
  const [errorCounter, updateErrorCounter] = useState(0);
  const [maxTimerValue, setMaxTimervalue] = useState(10000);
  const [score, setScore] = useState(0);

  const emojiTimerRender = useCallback(
    (props) => <EmojiTimerWeb {...props} emoji={emoji} />,
    [emoji]
  );
  const keyboardRender = useCallback((props) => <KeyboardWeb {...props} />, []);

  const handleOnTimerEnd = useCallback((isError: boolean) => {
    setEmoji(emojis[getRandomInt(0, emojis.length)]);
    if (isError) {
      updateErrorCounter((value) => value + 1);
    }
  }, []);

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
    [emoji]
  );

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, shrink-to-fit=no"
        />
        <title>Emojiwars</title>
      </Head>
      <main className="page">
        <section>
          <h2 className="text">Score {score}</h2>
          <p className="text">
            Errors {errorCounter}/{MAX_ERROR}
          </p>
          {errorCounter < MAX_ERROR && (
            <EmojiTimer
              key={emoji.character}
              maxTimerValue={maxTimerValue}
              render={emojiTimerRender}
              onTimerEnd={handleOnTimerEnd}
            />
          )}
          {errorCounter === MAX_ERROR && <p className="text">You died</p>}
        </section>
        <section>
          {errorCounter < MAX_ERROR && (
            <div className="keyboard-container">
              <Keyboard
                emojis={emojis}
                render={keyboardRender}
                onClick={handleOnKeyboardClick}
              />
            </div>
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
              grid-template-rows: 1fr 1fr;
              grid-template-columns: 100vw;
              align-items: end;
            }
            .keyboard-container {
            }
          }
        `}</style>
        <style jsx global>{`
          :root {
            --light-blue: #4e6acd;
          }

          body {
            margin: 0;
            padding: 0;
            overflow: hidden;
            height: 100vh;
          }
        `}</style>
      </main>
    </>
  );
};

Index.getInitialProps = async (ctx) => {
  const url = absoluteUrl(ctx.req).origin + "/api/emoji/get";
  const { data } = await axios.get(url);
  return { emojis: data };
};

export default Index;
