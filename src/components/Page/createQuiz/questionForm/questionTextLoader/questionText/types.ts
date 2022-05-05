import { QuestionCreateModel } from "../../../../../../models/QuestionCreateModel";

export interface Props {
    multiLang: boolean,
    onChange: (delegate: (model: QuestionCreateModel) => QuestionCreateModel) => void,

    defaultValue: string,
    defaultValueEn: string,
    defaultValueHu: string,
}