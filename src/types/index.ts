export type Emoji = {
    slug: string;
    character: string;
    unicodeName: string;
    codePoint: string;
    group: string;
    subGroup: string;
}

export enum DifficultyLevel {
    EASY = 'Easy',
    NORMAL = 'Normal',
    HARD = 'Hard',
    INSANE = 'Insane'
}

export type DifficultyLevelSettings = {
    maxTimer: number;
    emojiCount: number;
    shuffled: boolean;
    maxErrorsCount: number;
  }