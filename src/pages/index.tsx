import React, { useCallback } from "react";
import axios from "axios";

import { EmojiTimer } from "../shared/components/EmojiTimer";
import { EmojiTimerWeb } from "../web/components/EmojiTimerWeb";
import { Keyboard } from "../shared/components/Keyboard";
import { KeyboardWeb } from "../web/components/KeyboardWeb";

import { convertEmojiToHex, getRandomInt } from "../shared/logic";
import { absoluteUrl } from "../next";

import { Emoji } from "../types";

export type IndexProps = {
  emojis: Emoji[];
};

const Index = ({ emojis }: IndexProps) => {
  const emoji = emojis[getRandomInt(0, emojis.length)];
  const emojiTimerRender = useCallback(
    (value) => <EmojiTimerWeb timerValue={value} emoji={emoji} />,
    []
  );
  const keyboardRender = useCallback((props) => <KeyboardWeb {...props} />, []);
  return (
    <main className="page">
      <section>
        {emoji.character} = {convertEmojiToHex(emoji.character)}
        <EmojiTimer timerValue={10000} render={emojiTimerRender} />
      </section>
      <section>
        <div className="keyboard-container">
          <Keyboard emojis={emojis} render={keyboardRender} />
        </div>
      </section>
      <style jsx>{`
        .page {
          margin: 0 auto;
          max-width: 600px;
          display: grid;
          grid-template-columns: 1fr 428px;
          grid-template-rows: 1fr;
          grid-gap: 10px;
          justify-content: center;
          align-items: center;
          height: 90vh;
          --light-blue: #4E6ACD;
        }

        .keyboard-container {
          height: 300px;
          width: 100%;
        }
      `}</style>
    </main>
  );
};

Index.getInitialProps = async (ctx) => {
  const url = absoluteUrl(ctx.req).origin + "/api/emoji/get";
  const { data } = await axios.get(url);
  return { emojis: data };
};

export default Index;
