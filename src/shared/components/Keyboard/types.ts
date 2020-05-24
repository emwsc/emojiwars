import {Emoji} from '../../../types'

export type KeyboardProps = {
    emojis: Emoji[];
    render: Function;
    onClick: (emoji: Emoji) => void;
}