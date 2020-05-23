import EMOJIS from "./emojis.json";

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

const sendRandomEmoji = (res) => {
  const emoji = EMOJIS[getRandomInt(0, EMOJIS.length)];
  res.status(200).json(emoji);
};

export default async (req, res) => {
  return new Promise(async (resolve) => {
    sendRandomEmoji(res);
    return resolve();
  });
};
