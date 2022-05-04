export interface Props {
    answerId: string,
    onCloseAnswer?: (answerId: string) => void,

    label: string,
    defaultValue: string,
    onChange: (value: string) => void
}