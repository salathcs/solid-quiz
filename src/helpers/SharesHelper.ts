import { createAcl, hasAccessibleAcl, saveAclFor, setPublicResourceAccess } from '@inrupt/solid-client';
import * as sharesService from '../services/SharesService';
import * as shareLinksService from '../services/ShareLinksService';
import { DatasetAndThing } from './../models/DatasetAndThing';
import { SolidDataset_Type, SolidFetch_Type } from './SolidDatasetType';

export async function handlePublishQuiz(workspaceUri: string, quizData: DatasetAndThing, fetch: SolidFetch_Type) {
    //create acl for the resource
    await createPublicAclForNewResource(quizData.dataset, fetch);

    //create public share
    const shareThing = await sharesService.publishQuiz(quizData.thing.url);

    //create local shareLink
    await shareLinksService.createShareLink(workspaceUri, shareThing.url, fetch);
}

export async function handlePublishQuizResult(workspaceUri: string, quizResultData: DatasetAndThing, fetch: SolidFetch_Type) {
    //create acl for the resource
    await createPublicAclForNewResource(quizResultData.dataset, fetch);

    //create public share
    const shareThing = await sharesService.publishQuizResult(quizResultData.thing.url);

    //create local shareLink
    await shareLinksService.createShareLink(workspaceUri, shareThing.url, fetch);
}

export async function checkForQuizShare(quizData: DatasetAndThing, fetch: SolidFetch_Type): Promise<boolean> {
    //TODO
    return false;
}


//privates
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
