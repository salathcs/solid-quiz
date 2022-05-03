
import { buildThing, createThing } from '@inrupt/solid-client';
import { RDF } from '@inrupt/vocab-common-rdf';
import { QUIZZES_CONTAINER } from '../constants/DefaultValues';
import { CREATED, MULTI_LANGUAGE_SUPPORT, TITLE } from '../constants/SolidQuizMissingValues';
import SOLIDQUIZ from '../helpers/SOLIDQUIZ';
import { QuizContainer } from './../models/QuizContainer';

export function createQuizContainer(quizTitle: string, multiLang: boolean, webId: string): QuizContainer {
    const quizThing = buildThing(createThing({ name: quizTitle }))
      .addUrl(RDF.type, SOLIDQUIZ.Quiz.value)
      .addStringNoLocale(TITLE, quizTitle)      //TODO locale title
      .addDatetime(CREATED, new Date())
      .addUrl(SOLIDQUIZ.createdBy.value, webId)
      .addBoolean(MULTI_LANGUAGE_SUPPORT, multiLang)
      .build();

    return { quiz: quizThing, questions: [] };
}

export function getQuizzesContainer(workspaceUri: string) {
    return `${workspaceUri}${QUIZZES_CONTAINER}`;
}