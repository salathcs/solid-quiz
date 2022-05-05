export interface Props {
    answerId: string,
    onCloseAnswer?: (answerId: string) => void,
    correctAnswerId: string,

    label: string,
    defaultValue: string,
    onChange: (value: string) => void
}