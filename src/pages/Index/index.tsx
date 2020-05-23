import React, { useCallback } from "react";
import axios from "axios";

import { EmojiTimer } from "../../shared/components/EmojiTimer";
import { EmojiTimerWeb } from "../../web/components/EmojiTimerWeb";

import { convertEmojiToHex } from "../../shared/logic";
import { absoluteUrl } from "../../next.js";

import { Emoji } from "../../types";

export type IndexProps = {
    emoji: Emoji;
}

const Index = ({ emoji }: IndexProps) => {
  const emojiTimerRender = useCallback(
    (value) => <EmojiTimerWeb timerValue={value} emoji={emoji} />,
    []
  );
  return (
    <div>
      <main>
        <section>
          {emoji.character} = {convertEmojiToHex(emoji.character)}
        </section>
        <section>
          <EmojiTimer timerValue={10000} render={emojiTimerRender} />
        </section>
      </main>
    </div>
  );
};

Index.getInitialProps = async (ctx) => {
  const url = absoluteUrl(ctx.req).origin + "/api/emoji/get";
  const { data } = await axios.get(url);
  return { emoji: data };
};


export default Index;
