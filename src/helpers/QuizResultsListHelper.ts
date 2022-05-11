import { DatasetAndThing } from "../models/DatasetAndThing";
import { SolidDataset_Type, SolidFetch_Type } from "../constants/SolidDatasetType";
import * as workspaceService from '../services/WorkspaceService';
import * as sharesService from '../services/SharesService';
import SOLIDQUIZ from "./SOLIDQUIZ";
import { getUrl, Thing, getInteger, getDatetime, getThing, getUrlAll } from '@inrupt/solid-client';
import { NUMBER_OF_CORRECT_ANSWERS, QUIZ_RESULT_CREATED } from "../constants/SolidQuizMissingValues";
import { getSolidDataset } from '@inrupt/solid-client';
import { LDP } from "@inrupt/vocab-common-rdf";

export async function getQuizResultsFromContainer(containerUri: string, fetch: SolidFetch_Type): Promise<SolidDataset_Type[]> {
    const containerDataset = await getSolidDataset(containerUri, { fetch });
    const datasetThing = getThing(containerDataset, containerUri);

    if (datasetThing === null) {
        console.log("Cannot found container: " + containerDataset);
        return [];
    }

    const containedResources = getUrlAll(datasetThing, LDP.contains);
    
    const quizResultDatasets = await getQuizResultDatasets(containedResources, fetch);

    return quizResultDatasets;
  }

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

export function getQuizNameFromQuizThing(quizThing: Thing) {
    const indexOfSeparator = quizThing.url.lastIndexOf('#');

    const quizName = quizThing.url.substring(indexOfSeparator + 1);
    
    return quizName;
}

export async function getPublicQuizResultDatasets(quizResultOf: Thing): Promise<DatasetAndThing[]> {
    const publicQuizResultThings = await sharesService.getPublishedShares(SOLIDQUIZ.QuizResult.value);

    const rv: DatasetAndThing[] = [];

    for (let i = 0; i < publicQuizResultThings.length; i++) {
        const thing = publicQuizResultThings[i];
        
        const quizResultDatasetUri = getUrl(thing, SOLIDQUIZ.sharedResource.value) ?? "error";

        const quizResultsDataset = await checkQuizResultsQuizOf(quizResultDatasetUri, quizResultOf);

        if (quizResultsDataset !== null) {
            rv.push(quizResultsDataset);
        }
    }

    return rv;
}

export function mergeQuizResults(localResults: DatasetAndThing[], publicResults: DatasetAndThing[]): DatasetAndThing[] {    
    const rv: DatasetAndThing[] = [...localResults];

    publicResults.forEach(publisResult => {
        const conflict = localResults.find(item => publisResult.thing.url === item.thing.url);

        if (conflict === undefined) {
            rv.push(publisResult);
        }
    });

    return rv;
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

async function checkQuizResultsQuizOf(quizResultUri: string, quizResultOf: Thing): Promise<DatasetAndThing | null> {
    const quizResultDataset = await getSolidDataset(quizResultUri);
    
    //find quizResult thing inside the dataset (there are also questionResults)
    const quizResultThing = workspaceService.getFirstThingByRDFType(quizResultDataset, SOLIDQUIZ.QuizResult.value);
    if (quizResultThing !== null) {
        const quizUri = getUrl(quizResultThing, SOLIDQUIZ.quizResultOf.value);

        if (quizUri === quizResultOf.url){
            return { dataset: quizResultDataset, thing: quizResultThing };
        }
    }

    return null;
}

async function getQuizResultDatasets(quizContainerContainedUris: string[], fetch: SolidFetch_Type): Promise<SolidDataset_Type[]> {
    const rv: SolidDataset_Type[] = [];

    //fetch together
    const promiseList: Promise<SolidDataset_Type | null>[] = [];
    for (let i = 0; i < quizContainerContainedUris.length; i++) {
        const quizResultUri = quizContainerContainedUris[i];

        promiseList.push(tryGetQuizResultDataset(quizResultUri, fetch));
    }
    const fetchedPromises = await Promise.all(promiseList);

    for (let i = 0; i < fetchedPromises.length; i++) {
        const promiseResult = fetchedPromises[i];

        if (promiseResult !== null) {
            rv.push(promiseResult);
        }
    }

    return rv;
}

async function tryGetQuizResultDataset(quizResultUri: string, fetch: SolidFetch_Type): Promise<SolidDataset_Type | null> {
    try {
        const dataset = await getSolidDataset(quizResultUri, { fetch });

        return dataset;
    } catch (error) {
        console.log(error);
    }

    return null;
}
