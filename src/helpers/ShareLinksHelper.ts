import { SolidDataset_Type, SolidFetch_Type } from './SolidDatasetType';
import * as shareLinksService from '../services/ShareLinksService';
import { getSolidDataset, getBoolean, hasAccessibleAcl, removeThing, getSolidDatasetWithAcl, getResourceAcl, setPublicResourceAccess, saveAclFor, setAgentResourceAccess } from '@inrupt/solid-client';
import { getUrl } from '@inrupt/solid-client';
import SOLIDQUIZ from './SOLIDQUIZ';
import { getThing } from '@inrupt/solid-client';
import { MULTI_LANGUAGE_SUPPORT } from '../constants/SolidQuizMissingValues';
import { getString } from './LangReader';
import { TITLE } from './../constants/SolidQuizMissingValues';
import { ShareLinkModel } from '../models/ShareLinkModel';
import { SOLID_QUIZ_POD_PROFILE } from '../constants/DefaultValues';
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
                const isPubliclyShared = checkIfPubliclyShared(shareLink);

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
    //take away acl from resource (set the specified acls every right to false)
    const resourceUri = getUrl(shareLinkModel.shareThing, SOLIDQUIZ.sharedResource.value) ?? "error";
    if (shareLinkModel.isPubliclyShared) {
        await takeAwayPublicAcl(resourceUri, fetch);
    }
    else {
        const agentWebId = getUrl(shareLinkModel.shareLinkThing, SOLIDQUIZ.shareLinksIndividual.value) ?? "error";
        await takeAwayAgentAcl(resourceUri, agentWebId, fetch);
    }
    
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
        const shareDataset = await getSolidDataset(datasetUri);
        return shareDataset;
    } catch (error) {
        return null;
    }
}

async function tryGetShareWitchFetch(datasetUri: string, fetch: SolidFetch_Type): Promise<SolidDataset_Type | null> {
    try {
        const shareDataset = await getSolidDataset(datasetUri, { fetch });
        return shareDataset;
    } catch (error) {
        return null;
    }
}

function checkIfPubliclyShared(shareLinkThing: Thing){
    const individualWebId = getUrl(shareLinkThing, SOLIDQUIZ.shareLinksIndividual.value);

    return individualWebId === SOLID_QUIZ_POD_PROFILE;
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

async function takeAwayPublicAcl(resourceUri: string, fetch: SolidFetch_Type) {
    const resourceDataset = await getSolidDatasetWithAcl(resourceUri, { fetch });

    //check for control right (createAcl wont work if this check missing)
    if (!hasAccessibleAcl(resourceDataset)) {
        throw new Error("Has no control right!");
    }

    const resourceAcl = getResourceAcl(resourceDataset);

    if (resourceAcl === null) {
        return;
    }

    const updatedAcl = setPublicResourceAccess(
        resourceAcl,
        { read: false, append: false, write: false, control: false }
      );
      
      // save the new public Acl:
      await saveAclFor(resourceDataset, updatedAcl, { fetch });
}

async function takeAwayAgentAcl(resourceUri: string, agentWebId: string, fetch: SolidFetch_Type) {
    const resourceDataset = await getSolidDatasetWithAcl(resourceUri, { fetch });

    //check for control right (createAcl wont work if this check missing)
    if (!hasAccessibleAcl(resourceDataset)) {
        throw new Error("Has no control right!");
    }

    const resourceAcl = getResourceAcl(resourceDataset);

    if (resourceAcl === null) {
        return;
    }

    const updatedAcl = setAgentResourceAccess(
        resourceAcl,
        agentWebId,
        { read: false, append: false, write: false, control: false }
      );
      
      // save the new public Acl:
      await saveAclFor(resourceDataset, updatedAcl, { fetch });
}
