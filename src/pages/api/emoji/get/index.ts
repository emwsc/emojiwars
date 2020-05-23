import fs from "fs";
import path from 'path';
import getConfig from 'next/config'

const { serverRuntimeConfig } = getConfig()

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

export default async (req, res) => {
  return new Promise(async (resolve) => {
    if (EMOJI_CACHE) {
      sendRandomEmoji(res);
      return resolve();
    }
    const filePath = path.join(serverRuntimeConfig.PROJECT_ROOT, 'public', 'emojis.json').replace(/\\/g, '/');
    console.log(filePath);
    fs.readFile(filePath, "utf8", (err, data) => {
      console.log(err);
      EMOJI_CACHE = JSON.parse(data);
      sendRandomEmoji(res);
      return resolve();
    });
  });
};
