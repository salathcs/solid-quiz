import { createAcl, hasAccessibleAcl, saveAclFor, setPublicResourceAccess } from '@inrupt/solid-client';
import * as sharesService from '../services/SharesService';
import { DatasetAndThing } from './../models/DatasetAndThing';
import { SolidDataset_Type, SolidFetch_Type } from './SolidDatasetType';

export async function handlePublishQuiz(quizData: DatasetAndThing, fetch: SolidFetch_Type) {
    await createPublicAclForNewResource(quizData.dataset, fetch);

    //TODO: create local info of the share
    //const datasetUrl = getSourceUrl(quizResultData.dataset);

    await sharesService.publishQuiz(quizData.thing.url);
}

export async function handlePublishQuizResult(quizResultData: DatasetAndThing, fetch: SolidFetch_Type) {
    await createPublicAclForNewResource(quizResultData.dataset, fetch);

    //TODO: create local info of the share
    //const datasetUrl = getSourceUrl(quizResultData.dataset);

    await sharesService.publishQuizResult(quizResultData.thing.url);
}

export async function checkForQuizShare(quizData: DatasetAndThing, fetch: SolidFetch_Type): Promise<boolean> {
    //TODO
    return false;
}

async function createPublicAclForNewResource(dataset: SolidDataset_Type, fetch: SolidFetch_Type) {
    try {
        //check for control right (createAcl wont work if this check missing)
        if (!hasAccessibleAcl(dataset)) {
            throw new Error("Has no control right!");
        }

        const newAcl = createAcl(dataset);

        const updatedAcl = setPublicResourceAccess(
            newAcl,
            { read: true, append: false, write: false, control: false }
          );
          
          // save the new public Acl:
          await saveAclFor(dataset, updatedAcl, { fetch });

    } catch (error) {
        console.log(error);
    }
}
