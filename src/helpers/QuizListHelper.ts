import { DatasetAndThing } from "../models/DatasetAndThing";
import { SolidDataset_Type } from "./SolidDatasetType";
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

        const quizResultsDataset = await getSolidDataset(quizDatasetUri);

        if (quizResultsDataset !== null) {
            rv.push(quizResultsDataset);
        }
    }

    return rv;
}

export function mergeQuizzes(localResults: SolidDataset_Type[], publicResults: SolidDataset_Type[]): SolidDataset_Type[] {    
    const rv: SolidDataset_Type[] = [...localResults];

    publicResults.forEach(publisResult => {
        const conflict = localResults.find(item => {
            const publishedUri = getSourceUrl(publisResult);
            const localUri = getSourceUrl(item);

            return publishedUri === localUri;
        });

        if (conflict === undefined) {
            rv.push(publisResult);
        }
    });

    return rv;
}
