import { buildThing, createThing, Thing, createSolidDataset, setThing, saveSolidDatasetAt } from '@inrupt/solid-client';
import { RDF } from '@inrupt/vocab-common-rdf';
import { QUIZ_RESULTS_CONTAINER } from '../constants/DefaultValues';
import { QUIZ_RESULT_CREATED, SUCCESS_OF_QUESTION_RESULT } from '../constants/SolidQuizMissingValues';
import { SolidDataset_Type, SolidFetch_Type } from '../helpers/SolidDatasetType';
import SOLIDQUIZ from '../helpers/SOLIDQUIZ';
import { NestedLocalDataset } from '../models/NestedLocalDataset';

export function createQuizResult(quizThing: Thing, webId: string): Thing {
    const quizResultThing = buildThing(createThing())
      .addUrl(RDF.type, SOLIDQUIZ.QuizResult.value)
      .addDatetime(QUIZ_RESULT_CREATED, new Date())
      .addUrl(SOLIDQUIZ.quizResultCreatedBy.value, webId)
      .addUrl(SOLIDQUIZ.quizResultOf.value, quizThing.url)
      .build();

    return quizResultThing;
}   

export function createQuestionResult(questionThing: Thing, answerThing: Thing, success: boolean): Thing {
    const questionResultThing = buildThing(createThing())
      .addUrl(RDF.type, SOLIDQUIZ.QuestionResult.value)
      .addUrl(SOLIDQUIZ.questionResultOf.value, questionThing.url)
      .addUrl(SOLIDQUIZ.questionResultsAnswer.value, answerThing.url)
      .addBoolean(SUCCESS_OF_QUESTION_RESULT, success)
      .build();

    return questionResultThing;
}

export async function saveQuizResult(quizResultUri: string, quizResultThing: Thing, questionResultThings: Thing[], fetch: SolidFetch_Type): Promise<SolidDataset_Type> {
    let localeDataset = createSolidDataset();
    localeDataset = setThing(localeDataset, quizResultThing);
    const nestedDateset = { localeDataset };
    addQuestionResultssToDataset(nestedDateset, questionResultThings);
    
    return await saveSolidDatasetAt(quizResultUri, nestedDateset.localeDataset, {
      fetch: fetch,
    });
}

export function getQuizResultsContainer(workspaceUri: string) {
    return `${workspaceUri}${QUIZ_RESULTS_CONTAINER}`;
}
export function createQuizResultUri(workspaceUri: string) {
    return `${getQuizResultsContainer(workspaceUri)}${new Date().getTime()}.ttl`;
}


//privates
function addQuestionResultssToDataset(nestedDataset: NestedLocalDataset, questionResultThings: Thing[]) {
    for (let i = 0; i < questionResultThings.length; i++) {
      const questionResultThing = questionResultThings[i];
      
      nestedDataset.localeDataset = setThing(nestedDataset.localeDataset, questionResultThing);
    }
}
