import React from "react";

import { convertEmojiToHex } from "../shared/logic";

export default function Home() {
  return (
    <div>
      <main>😀 = {convertEmojiToHex("😀")}</main>
    </div>
  );
}
