import React, { useCallback } from "react";

import { EmojiTimer } from "../shared/components/EmojiTimer";
import { EmojiTimerWeb } from "../web/components/EmojiTimerWeb";

import { convertEmojiToHex } from "../shared/logic";

export default function Home() {
  const emojiTimerRender = useCallback(
    (value) => <EmojiTimerWeb timerValue={value} emoji="🙉" />,
    []
  );
  return (
    <div>
      <main>
        <section>😀 = {convertEmojiToHex("😀")}</section>
        <section>
          <EmojiTimer timerValue={10000} render={emojiTimerRender} />
        </section>
      </main>
    </div>
  );
}
