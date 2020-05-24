import { Emoji } from "../../../types";

export type EmojiTimerWebProps = {
    /** In milliseconds, max value */
    maxTimerValue: number;
    /** In milliseconds */
    timerValue: number;
    emoji: Emoji;
}