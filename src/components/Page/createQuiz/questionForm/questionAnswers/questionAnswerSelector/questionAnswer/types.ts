export interface Props {
    answerId: string,
    onCloseAnswer?: (answerId: string) => void,

    label: string
}