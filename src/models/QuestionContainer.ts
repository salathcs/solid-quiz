import { Thing } from '@inrupt/solid-client';
import { AnswerContainer } from './AnswerContainer';
import { QuestionCreateModel } from './QuestionCreateModel';

export interface QuestionContainer{
    questionName: string,
    questionModel: QuestionCreateModel,
    question: Thing;
    answers: AnswerContainer[]
}