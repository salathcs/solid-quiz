import { QuestionCreateModel } from './../../../../models/QuestionCreateModel';

export interface Props {
    multiLang: boolean,
    questionSubmitted: (model: QuestionCreateModel) => void,
    finishQuiz: () => void,
}