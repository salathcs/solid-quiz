import { getSolidDataset, saveSolidDatasetAt, createSolidDataset, setThing, createThing, buildThing, hasAccessibleAcl, createAcl, setPublicResourceAccess, saveAclFor, getSourceUrl, setAgentResourceAccess } from '@inrupt/solid-client';
import { SHARES_CONTAINER_DATASET, SOLID_QUIZ_POD_SHARES_DATASET } from '../constants/DefaultValues';
import { SolidDataset_Type, SolidFetch_Type } from '../constants/SolidDatasetType';
import SOLIDQUIZ from './../helpers/SOLIDQUIZ';
import { Thing } from '@inrupt/solid-client';
import { RDF } from '@inrupt/vocab-common-rdf';
import { SHARE_CREATED } from '../constants/SolidQuizMissingValues';
import { getThingAll } from '@inrupt/solid-client';
import { getUrl } from '@inrupt/solid-client';
import { getThing } from '@inrupt/solid-client';

export async function publishQuiz(quizUri: string): Promise<Thing> {
    let publicSharesDataset = await getOrCreateShares(SOLID_QUIZ_POD_SHARES_DATASET);
    const newPublicShareThing = createPublishedThing(quizUri, SOLIDQUIZ.Quiz.value);

    publicSharesDataset = setThing(publicSharesDataset, newPublicShareThing);

    const updatedDataset = await saveSolidDatasetAt(SOLID_QUIZ_POD_SHARES_DATASET, publicSharesDataset);

    const savedThingUri = getSavedShareThingsUri(newPublicShareThing, updatedDataset);
    const savedThing = getThing(updatedDataset, savedThingUri);

    if (savedThing === null) {
        throw new Error("creating share failed, cannot load it");
    }

    return savedThing;
}

export async function shareQuiz(friendsShareSpace: string, quizUri: string): Promise<Thing> {
    const friendsSharesDataset = await tryGetFirendsShareDataset(friendsShareSpace);
    const newPublicShareThing = createPublishedThing(quizUri, SOLIDQUIZ.Quiz.value);

    let publicSharesDataset = setThing(friendsSharesDataset, newPublicShareThing);

    const updatedDataset = await saveSolidDatasetAt(friendsShareSpace, publicSharesDataset);

    const savedThingUri = getSavedShareThingsUri(newPublicShareThing, updatedDataset);
    const savedThing = getThing(updatedDataset, savedThingUri);

    if (savedThing === null) {
        throw new Error("creating share failed, cannot load it");
    }

    return savedThing;
}

export async function publishQuizResult(quizResultUri: string): Promise<Thing> {
    let publicSharesDataset = await getOrCreateShares(SOLID_QUIZ_POD_SHARES_DATASET);
    const newPublicShareThing = createPublishedThing(quizResultUri, SOLIDQUIZ.QuizResult.value);

    publicSharesDataset = setThing(publicSharesDataset, newPublicShareThing);

    const updatedDataset = await saveSolidDatasetAt(SOLID_QUIZ_POD_SHARES_DATASET, publicSharesDataset);

    const savedThingUri = getSavedShareThingsUri(newPublicShareThing, updatedDataset);
    const savedThing = getThing(updatedDataset, savedThingUri);

    if (savedThing === null) {
        throw new Error("creating share failed, cannot load it");
    }

    return savedThing;
}

export async function getPublishedShares(shareTypeFilter: string): Promise<Thing[]> {
    const publicSharesDataset = await tryGetShares(SOLID_QUIZ_POD_SHARES_DATASET);

    if (publicSharesDataset === null) {
        console.log("Public shares not found, returns empty array!");
        return [];
    }

    const publicSharesThings = getThingAll(publicSharesDataset);

    const rv: Thing[] = [];

    publicSharesThings.forEach(thing => {
        const shareType = getUrl(thing, SOLIDQUIZ.sharedResourceType.value);

        if (shareType === shareTypeFilter) {
            rv.push(thing);
        }
    });

    return rv;
}

export async function getLocalShares(sharesDatasetUri: string, shareTypeFilter: string, fetch: SolidFetch_Type): Promise<Thing[]> {
    const sharesDataset = await getSolidDataset(sharesDatasetUri, { fetch });
    const localSharesThings = getThingAll(sharesDataset);

    const rv: Thing[] = [];

    localSharesThings.forEach(thing => {
        const shareType = getUrl(thing, SOLIDQUIZ.sharedResourceType.value);

        if (shareType === shareTypeFilter) {
            rv.push(thing);
        }
    });

    return rv;
}

export function getSharesDataset(workspaceUri: string) {
    return `${workspaceUri}${SHARES_CONTAINER_DATASET}`;
}

export async function createSharesIndexForPublic(workspaceUri: string, webId:string, fetch: SolidFetch_Type) {
    const sharesUri = getSharesDataset(workspaceUri);

    if (await isLocalSharesExists(sharesUri)) {
        return;
    }

    const sharesDataset = await saveSolidDatasetAt(sharesUri, createSolidDataset(), {fetch});

    if (!hasAccessibleAcl(sharesDataset)) {
        throw new Error("Has no control right!");
    }

    const ownerAcl = createAcl(sharesDataset);

    const ownerUpdatedAcl = setAgentResourceAccess(
        ownerAcl,
        webId,
        { read: true, append: true, write: true, control: true }
      );
      
    // save the new public Acl:
    await saveAclFor(sharesDataset, ownerUpdatedAcl, { fetch });

    const publicAcl = createAcl(sharesDataset);

    const updatedPublicAcl = setPublicResourceAccess(
        publicAcl,
        { read: true, append: true, write: true, control: false }
      );
      
      // save the new public Acl:
      await saveAclFor(sharesDataset, updatedPublicAcl, { fetch });
}


//privates
async function getOrCreateShares(uri: string): Promise<SolidDataset_Type> {
    try {
      const sharesDataset = await getSolidDataset(uri);
      return sharesDataset;
    } catch (error: any) {
      if (error.statusCode === 404) {
        const sharesDataset = await saveSolidDatasetAt(
            uri,
            createSolidDataset()
        );
        return sharesDataset;
      }

      console.log(error);
    }

    throw new Error('error.share.notFoundSharesGlobal');
}

async function tryGetShares(uri: string): Promise<SolidDataset_Type | null> {
    try {
        const shares = await getOrCreateShares(uri);

        return shares;
    } catch (error) {
        return null;
    }
}

async function isLocalSharesExists(uri: string): Promise<boolean> {
    try {
      await getSolidDataset(uri);
      return true;
    } catch (error: any) {
        return false;
    }
}

function createPublishedThing(sharedResourceUri: string, sharedType: string): Thing {
    const shareThing = buildThing(createThing())
    .addUrl(RDF.type, SOLIDQUIZ.Share.value)
    .addDatetime(SHARE_CREATED, new Date())
    .addUrl(SOLIDQUIZ.sharedResource.value, sharedResourceUri)
    .addUrl(SOLIDQUIZ.sharedResourceType.value, sharedType)
    .build();

    return shareThing;
}

function getSavedShareThingsUri(localThing: Thing, updatedDataset: SolidDataset_Type): string {
    const indexOfSeparator = localThing.url.lastIndexOf('/');

    const name = localThing.url.substring(indexOfSeparator + 1);

    const datasetUri = getSourceUrl(updatedDataset);

    return `${datasetUri}#${name}`;
}

async function tryGetFirendsShareDataset(friendsShareSpace: string): Promise<SolidDataset_Type> {    
    try {
        const friendsSharesDataset = await getSolidDataset(friendsShareSpace);

        return friendsSharesDataset;
    } catch (error: any) {
        if (error.statusCode === 401 || error.statusCode === 403 || error.statusCode === 404) {
            throw new Error("error.share.notFoundShares");
        }

        throw error;
    }
}
