import * as sharesService from '../services/SharesService';
import * as shareLinksService from '../services/ShareLinksService';
import * as workspaceService from '../services/WorkspaceService';
import * as aclService from '../services/AclService';
import { DatasetAndThing } from './../models/DatasetAndThing';
import { SolidFetch_Type } from '../constants/SolidDatasetType';
import { getSolidDataset } from '@inrupt/solid-client';
import { getThing } from '@inrupt/solid-client';
import { FOAF } from '@inrupt/vocab-common-rdf';
import { getUrlAll } from '@inrupt/solid-client';
import { SOLID_QUIZ_POD_PROFILE } from '../constants/DefaultValues';

export async function handlePublishQuiz(webId: string, workspaceUri: string, quizData: DatasetAndThing, fetch: SolidFetch_Type) {
    //create fallback acl (without this we loose control over the resource)
    await aclService.createFallbackAclForOwner(webId, quizData.dataset, fetch);
    //create acl for the resource
    await aclService.createPublicAclForNewResource(quizData.dataset, fetch);

    //create public share
    const shareThing = await sharesService.publishQuiz(quizData.thing.url);

    //create local shareLink
    await shareLinksService.createShareLink(workspaceUri, SOLID_QUIZ_POD_PROFILE, shareThing.url, fetch);
}

export async function handlePublishQuizResult(webId: string, workspaceUri: string, quizResultData: DatasetAndThing, fetch: SolidFetch_Type) {
    //create fallback acl (without this we loose control over the resource)
    await aclService.createFallbackAclForOwner(webId, quizResultData.dataset, fetch);
    //create acl for the resource
    await aclService.createPublicAclForNewResource(quizResultData.dataset, fetch);

    //create public share
    const shareThing = await sharesService.publishQuizResult(quizResultData.thing.url);

    //create local shareLink
    await shareLinksService.createShareLink(workspaceUri, SOLID_QUIZ_POD_PROFILE, shareThing.url, fetch);
}

export async function shareQuizWithFriend(webId: string, friendsWebId: string, ownWorkSpace: string, quizResultData: DatasetAndThing, fetch: SolidFetch_Type) {
    const friendsShareSpace = await getFriendsShareSpace(friendsWebId);

    //create fallback acl (without this we loose control over the resource)
    await aclService.createFallbackAclForOwner(webId, quizResultData.dataset, fetch);
    //create acl for the resource
    await aclService.createAgentAclForNewResource(friendsWebId, quizResultData.dataset, fetch);

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
