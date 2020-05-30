import {Emoji} from '../../../types'

export type KeyboardProps = {
    emojis: Emoji[];
    render: Function;
    shuffled: boolean;
    onClick: (emoji: Emoji) => void;
}