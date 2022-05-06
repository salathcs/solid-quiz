import { DatasetAndThing } from "../models/DatasetAndThing";
import { SolidDataset_Type } from "./SolidDatasetType";
import * as workspaceService from '../services/WorkspaceService';
import SOLIDQUIZ from "./SOLIDQUIZ";

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
    //TODO
    return [];
}
