export interface Props {
    answerId: string,
    onCloseAnswer?: (answerId: string) => void,

    labelEn: string,
    labelHu: string,
    defaultValueEn: string,
    defaultValueHu: string,
    onChangeEn: (value: string) => void
    onChangeHu: (value: string) => void
}