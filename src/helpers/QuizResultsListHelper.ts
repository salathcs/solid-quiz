import { DatasetAndThing } from "../models/DatasetAndThing";
import { SolidDataset_Type } from "./SolidDatasetType";
import * as workspaceService from '../services/WorkspaceService';
import SOLIDQUIZ from "./SOLIDQUIZ";
import { getUrl, Thing, getInteger, getDatetime } from '@inrupt/solid-client';
import { NUMBER_OF_CORRECT_ANSWERS, QUIZ_RESULT_CREATED } from "../constants/SolidQuizMissingValues";

export function getQuizResultsFromDatasets(quizResultDatasets: SolidDataset_Type[], quizResultOf: Thing): DatasetAndThing[] {
    const quizResultsThings: DatasetAndThing[] = [];

    for (let i = 0; i < quizResultDatasets.length; i++) {
        const quizResultDataset = quizResultDatasets[i];
        
        const quizResultThing = workspaceService.getFirstThingByRDFType(quizResultDataset, SOLIDQUIZ.QuizResult.value);

        if (quizResultThing !== null) {
            const quizOfUri = getUrl(quizResultThing, SOLIDQUIZ.quizResultOf.value);

            if (quizOfUri === quizResultOf.url) {
                quizResultsThings.push({ dataset: quizResultDataset, thing: quizResultThing });
            }
        }
    }

    return quizResultsThings;
}

export function sortQuizResultDatas(quizResultDatas: DatasetAndThing[]) {
    quizResultDatas.sort((a, b) => {
        const byCorrectAnswer = compareByCorrectAnswer(a.thing, b.thing);

        if (byCorrectAnswer !== 0) {
            return byCorrectAnswer;
        }

        const byNewer = compareByNewer(a.thing, b.thing);

        return byNewer;
    });
}

export function getSavedQuizResultName(datasetUri: string, localThing: Thing) {
    const indexOfSeparator = localThing.url.lastIndexOf('/');

    const resultsName = localThing.url.substring(indexOfSeparator + 1);
    
    return `${datasetUri}#${resultsName}`;
}

export async function getPublicQuizResultDatasets(): Promise<DatasetAndThing[]> {
    //TODO
    return [];
}


//privates
function compareByCorrectAnswer(thingA: Thing, thingB: Thing): number {
    const correctAnswersA = getInteger(thingA, NUMBER_OF_CORRECT_ANSWERS) ?? 0;
    const correctAnswersB = getInteger(thingB, NUMBER_OF_CORRECT_ANSWERS) ?? 0;

    return correctAnswersB - correctAnswersA;
}

function compareByNewer(thingA: Thing, thingB: Thing): number {
    const dateA = getDatetime(thingA, QUIZ_RESULT_CREATED)?.getTime() ?? 0;
    const dateB = getDatetime(thingB, QUIZ_RESULT_CREATED)?.getTime() ?? 0;

    return dateB - dateA;
}
