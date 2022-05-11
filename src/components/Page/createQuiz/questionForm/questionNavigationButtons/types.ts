import { QuestionCreateModel } from "../../../../../models/QuestionCreateModel";

export interface Props {
    questionModel: QuestionCreateModel,
    onPrev: () => void,
    onNext: () => void,
    onNextNew: () => void,
    onFinishClick: () => void
}