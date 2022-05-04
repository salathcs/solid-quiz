import { AnswerCreateModel } from "./AnswerCreateModel";

export interface QuestionCreateModel{
    questionNumber: number,
    textEn: string,
    textHu: string,
    answerOptions: AnswerCreateModel[],
    multiLang: boolean,
    lang: string
}