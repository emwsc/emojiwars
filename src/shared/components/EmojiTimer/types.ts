export type EmojiTimerProps = {
    render: Function;
    /** In milliseconds */
    maxTimerValue: number;
    onTimerEnd: () => void;
}