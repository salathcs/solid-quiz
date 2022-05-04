import { AnswerCreateModel } from "./AnswerCreateModel";

export interface QuestionCreateModel{
    textEn: string,
    textHu: string,
    answerOptions: AnswerCreateModel[]
}