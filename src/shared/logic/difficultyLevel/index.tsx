import { DifficultyLevel, DifficultyLevelSettings } from "../../../types";

/**
 * 10 seconds
 */
const BASE_TIMER_VALUE = 10000;

const DIFFICULTY_LEVELS_MAP: {
  [key in DifficultyLevel]: DifficultyLevelSettings;
} = {
  [DifficultyLevel.EASY]: {
    maxTimer: BASE_TIMER_VALUE * 2,
    emojiCount: 10,
    shuffled: false,
    maxErrorsCount: 10
  },
  [DifficultyLevel.NORMAL]: {
    maxTimer: BASE_TIMER_VALUE * 2,
    emojiCount: 30,
    shuffled: false,
    maxErrorsCount: 6
  },
  [DifficultyLevel.HARD]: {
    maxTimer: BASE_TIMER_VALUE,
    emojiCount: 30,
    shuffled: false,
    maxErrorsCount: 6
  },
  [DifficultyLevel.INSANE]: {
    maxTimer: BASE_TIMER_VALUE,
    emojiCount: 50,
    shuffled: true,
    maxErrorsCount: 5
  },
};

export const getDifficultySettings = (level: DifficultyLevel) =>
  DIFFICULTY_LEVELS_MAP[level];
