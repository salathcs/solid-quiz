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
import { SOLID_QUIZ_POD_PROFILE } from '../constants/DefaultValues';

export async function handlePublishQuiz(webId: string, workspaceUri: string, quizData: DatasetAndThing, fetch: SolidFetch_Type) {
    //create fallback acl (without this we loose control over the resource)
    await createFallbackAclForOwner(webId, quizData.dataset, fetch);
    //create acl for the resource
    await createPublicAclForNewResource(quizData.dataset, fetch);

    //create public share
    const shareThing = await sharesService.publishQuiz(quizData.thing.url);

    //create local shareLink
    await shareLinksService.createShareLink(workspaceUri, SOLID_QUIZ_POD_PROFILE, shareThing.url, fetch);
}

export async function handlePublishQuizResult(webId: string, workspaceUri: string, quizResultData: DatasetAndThing, fetch: SolidFetch_Type) {
    //create fallback acl (without this we loose control over the resource)
    await createFallbackAclForOwner(webId, quizResultData.dataset, fetch);
    //create acl for the resource
    await createPublicAclForNewResource(quizResultData.dataset, fetch);

    //create public share
    const shareThing = await sharesService.publishQuizResult(quizResultData.thing.url);

    //create local shareLink
    await shareLinksService.createShareLink(workspaceUri, SOLID_QUIZ_POD_PROFILE, shareThing.url, fetch);
}

export async function shareQuizWithFriend(webId: string, friendsWebId: string, ownWorkSpace: string, quizResultData: DatasetAndThing, fetch: SolidFetch_Type) {
    const friendsShareSpace = await getFriendsShareSpace(friendsWebId);

    //create fallback acl (without this we loose control over the resource)
    await createFallbackAclForOwner(webId, quizResultData.dataset, fetch);
    //create acl for the resource
    await createAgentAclForNewResource(friendsWebId, quizResultData.dataset, fetch);

    //create public share
    const shareThing = await sharesService.shareQuiz(friendsShareSpace, quizResultData.thing.url);

    //create local shareLink
    await shareLinksService.createShareLink(ownWorkSpace, friendsWebId, shareThing.url, fetch);
}

export async function checkForQuizShare(quizData: DatasetAndThing, fetch: SolidFetch_Type): Promise<boolean> {
    //no check, because shares page shows all your share, event the duplicates, so you can delete it there if its duplicate
    //maybe a future to do
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

async function createFallbackAclForOwner(webId: string, dataset: SolidDataset_Type, fetch: SolidFetch_Type) {
    try {
        //check for control right (createAcl wont work if this check missing)
        if (!hasAccessibleAcl(dataset)) {
            throw new Error("Has no control right!");
        }

        const newFallbackAcl = createAcl(dataset);

        const updatedAcl = setAgentResourceAccess(
            newFallbackAcl,
            webId,
            { read: true, append: true, write: true, control: true }
          );
          
          // save the new public Acl:
          await saveAclFor(dataset, updatedAcl, { fetch });

    } catch (error) {
        console.log(error);
        throw error;
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
