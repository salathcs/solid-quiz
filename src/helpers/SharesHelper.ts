import { createAcl, hasAccessibleAcl, saveAclFor, setAgentResourceAccess, setPublicResourceAccess } from '@inrupt/solid-client';
import * as sharesService from '../services/SharesService';
import * as shareLinksService from '../services/ShareLinksService';
import * as workspaceService from '../services/WorkspaceService';
import { DatasetAndThing } from './../models/DatasetAndThing';
import { SolidDataset_Type, SolidFetch_Type } from './SolidDatasetType';
import { getSolidDataset } from '@inrupt/solid-client';
import { getThing } from '@inrupt/solid-client';
import { FOAF } from '@inrupt/vocab-common-rdf';
import { getUrlAll } from '@inrupt/solid-client';

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

export async function shareQuizWithFriend(friendsWebId: string, ownWorkSpace: string, quizResultData: DatasetAndThing, fetch: SolidFetch_Type) {
    const friendsShareSpace = await getFriendsShareSpace(friendsWebId);

    //create acl for the resource
    await createAgentAclForNewResource(friendsWebId, quizResultData.dataset, fetch);

    //create public share
    const shareThing = await sharesService.shareQuiz(friendsShareSpace, quizResultData.thing.url);

    //create local shareLink
    await shareLinksService.createShareLink(ownWorkSpace, shareThing.url, fetch);
}

export async function checkForQuizShare(quizData: DatasetAndThing, fetch: SolidFetch_Type): Promise<boolean> {
    //TODO
    return false;
}

export async function getFriendsList(webId: string, fetch: SolidFetch_Type): Promise<string[]> {
    const profileDataset = await getSolidDataset(webId, { fetch });
    const profileThing = getThing(profileDataset, webId);

    if (profileThing !== null) {
        const friendUris = getUrlAll(profileThing, FOAF.knows);

        return friendUris;
    }

    return [];
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

async function createAgentAclForNewResource(friendsWebId: string, dataset: SolidDataset_Type, fetch: SolidFetch_Type) {
    try {
        //check for control right (createAcl wont work if this check missing)
        if (!hasAccessibleAcl(dataset)) {
            throw new Error("Has no control right!");
        }

        const newAcl = createAcl(dataset);

        const updatedAcl = setAgentResourceAccess(
            newAcl,
            friendsWebId,
            { read: true, append: false, write: false, control: false }
          );
          
          // save the new public Acl:
          await saveAclFor(dataset, updatedAcl, { fetch });

    } catch (error) {
        console.log(error);
    }
}

async function getFriendsShareSpace(friendsWebId: string): Promise<string> {
    const friendsProfileDataset = await getSolidDataset(friendsWebId);
    const friendsProfileThing = getThing(friendsProfileDataset, friendsWebId);

    if (friendsProfileThing === null) {
        throw new Error("Fetching friends profile failed!");
    }

    const friendsWorkspace = workspaceService.getWorkSpaceLocation(friendsProfileThing);
    
    const friendsShareSpace = sharesService.getSharesDataset(friendsWorkspace);

    return friendsShareSpace;
}
