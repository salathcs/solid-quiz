import { SolidDataset_Type, SolidFetch_Type } from './SolidDatasetType';
import * as shareLinksService from '../services/ShareLinksService';
import { getSolidDataset, getBoolean, deleteAclFor, hasAccessibleAcl, removeThing } from '@inrupt/solid-client';
import { getUrl } from '@inrupt/solid-client';
import SOLIDQUIZ from './SOLIDQUIZ';
import { getThing } from '@inrupt/solid-client';
import { MULTI_LANGUAGE_SUPPORT } from '../constants/SolidQuizMissingValues';
import { getString } from './LangReader';
import { TITLE } from './../constants/SolidQuizMissingValues';
import { ShareLinkModel } from '../models/ShareLinkModel';
import { SOLID_QUIZ_POD } from '../constants/DefaultValues';
import { Thing } from '@inrupt/solid-client';
import { saveSolidDatasetAt } from '@inrupt/solid-client';

export async function getAllShareThingByShareLink(workspaceUrl: string, fetch: SolidFetch_Type): Promise<ShareLinkModel[]> {
    const shareLinks = await shareLinksService.getAllShareLink(workspaceUrl, fetch);

    const rv: ShareLinkModel[] = [];

    for (let i = 0; i < shareLinks.length; i++) {
        const shareLink = shareLinks[i];
        
        const resourceUri = getUrl(shareLink, SOLIDQUIZ.shareLinksLink.value) ?? "error";

        let shareDataset = await tryGetShareWhitoutFetch(resourceUri);
        if (shareDataset === null) {
            shareDataset = await tryGetShareWitchFetch(resourceUri, fetch);
        }

        if (shareDataset !== null) {
            const thing = getThing(shareDataset, resourceUri);

            if (thing !== null) {
                const isPubliclyShared = checkIfPubliclyShared(thing.url);

                rv.push({ shareThing: thing, shareLinkThing: shareLink, isPubliclyShared });
            }
        }
    }

    return rv;
}

export async function fetchQuizTitle(quizUri: string, lang: string, fetch: SolidFetch_Type): Promise<string> {
    const dataset = await getSolidDataset(quizUri, { fetch });
    const thing = getThing(dataset, quizUri);

    if (thing === null){
        return "fetch failed";
    }

    const multiLang = getBoolean(thing, MULTI_LANGUAGE_SUPPORT) ?? false;
    const title = getString(thing, TITLE, multiLang, lang);

    return title;
}

export async function fetchQuizTitleFromResult(quizResultUri: string, lang: string, fetch: SolidFetch_Type): Promise<string> {
    const dataset = await getSolidDataset(quizResultUri, { fetch });
    const thing = getThing(dataset, quizResultUri);

    if (thing === null){
        return "fetch failed";
    }

    const quizUri = getUrl(thing, SOLIDQUIZ.quizResultOf.value) ?? "error";
    
    return fetchQuizTitle(quizUri, lang, fetch);
}

export async function removeSharing(shareLinkModel: ShareLinkModel, fetch: SolidFetch_Type) {
    //remove acl from resource
    const resourceUri = getUrl(shareLinkModel.shareThing, SOLIDQUIZ.sharedResource.value) ?? "error";
    const resourceDataset = await getSolidDataset(resourceUri, { fetch });
    await removeAcl(resourceDataset, fetch);
    
    //remove shares source
    if (shareLinkModel.isPubliclyShared) {
        await removePublicShares(shareLinkModel.shareThing);
    }
    else {
        await removeAgentShares(shareLinkModel.shareThing, fetch);
    }

    //remove link
    removeShareLink(shareLinkModel.shareLinkThing, fetch);
}


//privates
async function tryGetShareWhitoutFetch(datasetUri: string): Promise<SolidDataset_Type | null> {
    try {
        const shareDataset = getSolidDataset(datasetUri);
        return shareDataset;
    } catch (error) {
        return null;
    }
}

async function tryGetShareWitchFetch(datasetUri: string, fetch: SolidFetch_Type): Promise<SolidDataset_Type | null> {
    try {
        const shareDataset = getSolidDataset(datasetUri, { fetch });
        return shareDataset;
    } catch (error) {
        return null;
    }
}

function checkIfPubliclyShared(shareUri: string){
    return shareUri.startsWith(SOLID_QUIZ_POD);
}

async function removeAcl(resourceDataset: SolidDataset_Type, fetch: SolidFetch_Type) {
    if (hasAccessibleAcl(resourceDataset)) {
        await deleteAclFor(resourceDataset, { fetch });
    }
}

async function removePublicShares(shareThing: Thing) {
    let shareDataset = await getSolidDataset(shareThing.url);

    shareDataset = removeThing(shareDataset, shareThing.url);

    await saveSolidDatasetAt(shareThing.url, shareDataset);
}

async function removeAgentShares(shareThing: Thing, fetch: SolidFetch_Type) {
    let shareDataset = await getSolidDataset(shareThing.url, { fetch });

    shareDataset = removeThing(shareDataset, shareThing.url);

    await saveSolidDatasetAt(shareThing.url, shareDataset, { fetch });
}

async function removeShareLink(shareLinkThing: Thing, fetch: SolidFetch_Type) {
    let shareLinkDataset = await getSolidDataset(shareLinkThing.url, { fetch });

    shareLinkDataset = removeThing(shareLinkDataset, shareLinkThing.url);

    await saveSolidDatasetAt(shareLinkThing.url, shareLinkDataset, { fetch });
}
