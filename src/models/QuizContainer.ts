
import { Thing } from '@inrupt/solid-client';
import { QuestionContainer } from './QuestionContainer';

export interface QuizContainer {
    quiz: Thing;
    questions: QuestionContainer[];
}