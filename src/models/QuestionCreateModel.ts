import { AnswerCreateModel } from "./AnswerCreateModel";

export interface QuestionCreateModel{
    questionNumber: number,
    textEn: string,
    textHu: string,
    answerOptions: AnswerCreateModel[],
    correctAnswerId: string,
    multiLang: boolean,
    lang: string
}