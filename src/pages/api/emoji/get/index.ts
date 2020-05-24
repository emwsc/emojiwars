import EMOJIS from "./emojis.json";

import { getRandomInt } from "../../../../shared/logic";

const sendRandomEmojis = (res) => {
  const { group } = EMOJIS[getRandomInt(0, EMOJIS.length)];
  const emojis = EMOJIS.filter((emoji) => emoji.group === group);
  res.status(200).json(emojis);
};

export default async (req, res) => {
  return new Promise(async (resolve) => {
    sendRandomEmojis(res);
    return resolve();
  });
};
