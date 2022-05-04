
import { Thing } from '@inrupt/solid-client';
import { QuestionContainer } from './QuestionContainer';
import { QuizFormModel } from './QuizFormModel';

export interface QuizContainer {
    quizName: string,
    quizFormModel: QuizFormModel,
    quiz: Thing;
    questions: QuestionContainer[];
}