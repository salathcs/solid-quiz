export interface Props {
    multiLang: boolean,
    
    answerId: string,
    onCloseAnswer?: (answerId: string) => void
}