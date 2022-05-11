import { CSSProperties } from "react";

export interface Props {
    children: string | JSX.Element,
    modalText: string,
    variant: string,
    onConfirm: () => void,
    style?: CSSProperties
}