import { QuestionCreateModel } from "../../../../../models/QuestionCreateModel";

export interface Props {
    questionModel: QuestionCreateModel,
    onChange: (delegate: (model: QuestionCreateModel) => QuestionCreateModel) => void
}