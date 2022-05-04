import { QuestionCreateModel } from "../../../../../../models/QuestionCreateModel"

export interface Props {
    multiLang: boolean,
    onChange: (delegate: (model: QuestionCreateModel) => QuestionCreateModel) => void
    
    answerId: string,
    onCloseAnswer?: (answerId: string) => void
}