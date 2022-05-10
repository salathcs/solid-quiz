import { DatasetAndThing } from "../models/DatasetAndThing";
import { SolidDataset_Type, SolidFetch_Type } from "../constants/SolidDatasetType";
import * as workspaceService from '../services/WorkspaceService';
import SOLIDQUIZ from "./SOLIDQUIZ";
import * as sharesService from '../services/SharesService';
import * as quizService from '../services/QuizService';
import { getSolidDataset, getSourceUrl, getThing, getUrl, getUrlAll, Thing } from "@inrupt/solid-client";
import { LDP, RDF } from "@inrupt/vocab-common-rdf";

export async function getOwnQuizzes(workspaceUri: string, fetch: SolidFetch_Type): Promise<SolidDataset_Type[]> {
    const containerUri = quizService.getQuizzesContainer(workspaceUri);
    const containerDataset = await getSolidDataset(containerUri, { fetch });
    const datasetThing = getThing(containerDataset, containerUri);

    if (datasetThing === null) {
        console.log("Cannot found container: " + containerDataset);
        return [];
    }

    const containedResources = getUrlAll(datasetThing, LDP.contains);

    const quizDatasets = await getQuizDatasets(containedResources, fetch);

    return quizDatasets;
}

export function getQuizzesFromDatasets(quizDatasets: SolidDataset_Type[]): DatasetAndThing[] {
    const quizThings: DatasetAndThing[] = [];

    for (let i = 0; i < quizDatasets.length; i++) {
        const quizDataset = quizDatasets[i];
        
        const quizThing = workspaceService.getFirstThingByRDFType(quizDataset, SOLIDQUIZ.Quiz.value);

        if (quizThing !== null) {
            quizThings.push({ dataset: quizDataset, thing: quizThing });
        }
    }

    return quizThings;
}

export async function getPublicDatasets(): Promise<SolidDataset_Type[]> {
    const publicQuizThings = await sharesService.getPublishedShares(SOLIDQUIZ.Quiz.value);

    const rv: SolidDataset_Type[] = [];

    const fetchedDatasets = await tryGetSharedDatasetsAtOnce(publicQuizThings, undefined);

    for (let i = 0; i < fetchedDatasets.length; i++) {
        const dataset = fetchedDatasets[i];
        
        if (dataset !== null) {
            rv.push(dataset);
        }
    }

    return rv;
}

export async function getLocalSharesDatasets(workspaceUri: string, fetch: SolidFetch_Type): Promise<SolidDataset_Type[]> {
    const localSharesUri = sharesService.getSharesDataset(workspaceUri);
    const localSharesQuizThings = await sharesService.getLocalShares(localSharesUri, SOLIDQUIZ.Quiz.value, fetch);

    const rv: SolidDataset_Type[] = [];

    const fetchedDatasets = await tryGetSharedDatasetsAtOnce(localSharesQuizThings, fetch);

    for (let i = 0; i < fetchedDatasets.length; i++) {
        const dataset = fetchedDatasets[i];
        
        if (dataset !== null) {
            rv.push(dataset);
        }
    }

    return rv;
}

export function mergeQuizzes(localResults: SolidDataset_Type[], publicSharesResults: SolidDataset_Type[], localharesResults: SolidDataset_Type[]): SolidDataset_Type[] {    
    const rv: SolidDataset_Type[] = [...localResults];

    publicSharesResults.forEach(publisResult => {
        const conflict = rv.find(item => {
            const publishedUri = getSourceUrl(publisResult);
            const localUri = getSourceUrl(item);

            return publishedUri === localUri;
        });

        if (conflict === undefined) {
            rv.push(publisResult);
        }
    });

    localharesResults.forEach(localShareResult => {
        const conflict = rv.find(item => {
            const publishedUri = getSourceUrl(localShareResult);
            const localUri = getSourceUrl(item);

            return publishedUri === localUri;
        });

        if (conflict === undefined) {
            rv.push(localShareResult);
        }
    });

    return rv;
}

async function tryGetDataset(datasetUri: string, fetch: SolidFetch_Type | undefined): Promise<SolidDataset_Type | null> {
    try {        
        let dataset: SolidDataset_Type | null = null;

        if (fetch === undefined) {
            dataset = await getSolidDataset(datasetUri);
        }
        else {
            dataset = await getSolidDataset(datasetUri, { fetch });
        }

        return dataset;
    } catch (error) {
        console.log(error);
    }

    return null;
}

async function getQuizDatasets(quizContainerContainedUris: string[], fetch: SolidFetch_Type): Promise<SolidDataset_Type[]> {
    const rv: SolidDataset_Type[] = [];

    //fetch together
    const promiseList: Promise<SolidDataset_Type | null>[] = [];
    for (let i = 0; i < quizContainerContainedUris.length; i++) {
        const quizUri = tryGetQuizUri(quizContainerContainedUris[i]);

        if (quizUri !== null) {
            promiseList.push(tryGetQuizDataset(quizUri, fetch));
        }
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

function tryGetQuizUri(uri: string): string | null {
    if (!uri.endsWith('/')) {
        return null;
    }

    const lastWord = getLastWordFromUri(uri);

    return `${uri}${lastWord}.ttl#${lastWord}`;
}

function getLastWordFromUri(uri: string) {
    uri = uri.substring(0, uri.length - 1);

    const indexOfLast = uri.lastIndexOf('/');

    const uriLastWord = uri.substring(indexOfLast + 1);

    return uriLastWord;
}

async function tryGetQuizDataset(quizUri: string, fetch: SolidFetch_Type): Promise<SolidDataset_Type | null> {
    try {
        const dataset = await getSolidDataset(quizUri, { fetch });

        if (validateDatasetForQuizType(quizUri, dataset)) {
            return dataset;
        }
    } catch (error) {
        console.log(error);
    }

    return null;
}

function validateDatasetForQuizType(quizUri: string, dataset: SolidDataset_Type): boolean {
    const quizThing = getThing(dataset, quizUri);

    if (quizThing === null) {
        return false;
    }

    const typeUrls = getUrlAll(quizThing, RDF.type);
  
    const quizTypeUrl = typeUrls.find((item) => item === SOLIDQUIZ.Quiz.value);

    return quizTypeUrl !== undefined;
}

async function tryGetSharedDatasetsAtOnce(sharedQuizThings: Thing[], fetch: SolidFetch_Type | undefined) {
    const promises: Promise<SolidDataset_Type | null>[] = [];

    for (let i = 0; i < sharedQuizThings.length; i++) {
        const thing = sharedQuizThings[i];
        
        const quizDatasetUri = getUrl(thing, SOLIDQUIZ.sharedResource.value) ?? "error";

        promises.push(tryGetDataset(quizDatasetUri, fetch));
    }

    const fetchedPromises = await Promise.all(promises);

    return fetchedPromises;
}
