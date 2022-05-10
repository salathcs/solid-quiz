import { DatasetAndThing } from "../models/DatasetAndThing";
import { SolidDataset_Type, SolidFetch_Type } from "../constants/SolidDatasetType";
import * as workspaceService from '../services/WorkspaceService';
import SOLIDQUIZ from "./SOLIDQUIZ";
import * as sharesService from '../services/SharesService';
import { getSolidDataset, getSourceUrl, getUrl } from "@inrupt/solid-client";

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

    for (let i = 0; i < publicQuizThings.length; i++) {
        const thing = publicQuizThings[i];
        
        const quizDatasetUri = getUrl(thing, SOLIDQUIZ.sharedResource.value) ?? "error";

        const quizResultsDataset = await tryGetDataset(quizDatasetUri, undefined);

        if (quizResultsDataset !== null) {
            rv.push(quizResultsDataset);
        }
    }

    return rv;
}

export async function getLocalSharesDatasets(workspaceUri: string, fetch: SolidFetch_Type): Promise<SolidDataset_Type[]> {
    const localSharesUri = sharesService.getSharesDataset(workspaceUri);
    const localSharesQuizThings = await sharesService.getLocalShares(localSharesUri, SOLIDQUIZ.Quiz.value, fetch);

    const rv: SolidDataset_Type[] = [];

    for (let i = 0; i < localSharesQuizThings.length; i++) {
        const thing = localSharesQuizThings[i];
        
        const quizDatasetUri = getUrl(thing, SOLIDQUIZ.sharedResource.value) ?? "error";

        const quizResultsDataset = await tryGetDataset(quizDatasetUri, fetch);

        if (quizResultsDataset !== null) {
            rv.push(quizResultsDataset);
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
