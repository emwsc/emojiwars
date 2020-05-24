import { Emoji } from "../../../types";

export type KeyboardWebProps = {
  emojis: Emoji[];
  onClick: (emoji: Emoji) => void;
};

export type KeyProps = Pick<KeyboardWebProps, "onClick"> & {
    emoji: Emoji;
};
