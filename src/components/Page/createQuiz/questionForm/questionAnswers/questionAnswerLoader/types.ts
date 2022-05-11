import { QuestionCreateModel } from "../../../../../../models/QuestionCreateModel";
import { MultiLangText } from './../../../../../../models/MultiLangText';

export interface Props {
    multiLang: boolean,
    onChange: (delegate: (model: QuestionCreateModel) => QuestionCreateModel) => void,
    correctAnswerId: string,
    
    answerId: string,
    onCloseAnswer?: (answerId: string) => void,

    multiLangText: MultiLangText
}