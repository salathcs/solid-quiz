import { Thing } from '@inrupt/solid-client';

export interface GameStatus {
    actQuestionIndex: number,
    allQuestions: number,

    quizResultNameUri: string,
    quizResultThing: Thing,
    questionResultThings: Thing[],

    multiLang: boolean
}