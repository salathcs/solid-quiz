import { QuestionCreateModel } from "../../../../../../../models/QuestionCreateModel"

export interface Props {
    multiLang: boolean,
    onChange: (delegate: (model: QuestionCreateModel) => QuestionCreateModel) => void,
    correctAnswerId: string,
    
    answerId: string,
    onCloseAnswer?: (answerId: string) => void,

    defaultValue: string,
    defaultValueEn: string,
    defaultValueHu: string,
}