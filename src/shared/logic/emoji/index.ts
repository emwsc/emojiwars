export const convertEmojiToHex = (emoji: string) => {
    return emoji.codePointAt(0).toString(16);
}