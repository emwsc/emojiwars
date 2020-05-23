import fs from "fs";

let EMOJI_CACHE = null;

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

const sendRandomEmoji = (res) => {
  const emoji = EMOJI_CACHE[getRandomInt(0, EMOJI_CACHE.length)];
  res.status(200).json(emoji);
};

export default (req, res) => {
  if (EMOJI_CACHE) {
    return sendRandomEmoji(res);
  }
  fs.readFile("./public/emojis.json", "utf8", (err, data) => {
    EMOJI_CACHE = JSON.parse(data);
    return sendRandomEmoji(res);
  });
};
