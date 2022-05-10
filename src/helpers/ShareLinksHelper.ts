import { SolidDataset_Type, SolidFetch_Type } from '../constants/SolidDatasetType';
import * as shareLinksService from '../services/ShareLinksService';
import * as aclService from '../services/AclService';
import { getSolidDataset, getBoolean, removeThing, getStringNoLocale } from '@inrupt/solid-client';
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
import { FOAF } from '@inrupt/vocab-common-rdf';

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

export async function fetchQuizTitle(quizUri: string, lang: string, fetch: SolidFetch_Type): Promise<string | null> {
    try {        
        const dataset = await getSolidDataset(quizUri, { fetch });
        const thing = getThing(dataset, quizUri);

        if (thing === null){
            return "fetch failed";
        }

        const multiLang = getBoolean(thing, MULTI_LANGUAGE_SUPPORT) ?? false;
        const title = getString(thing, TITLE, multiLang, lang);

        return title;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function fetchQuizTitleFromResult(quizResultUri: string, lang: string, fetch: SolidFetch_Type): Promise<string | null> {
    try {        
        const dataset = await getSolidDataset(quizResultUri, { fetch });
        const thing = getThing(dataset, quizResultUri);

        if (thing === null){
            return "fetch failed";
        }

        const quizUri = getUrl(thing, SOLIDQUIZ.quizResultOf.value) ?? "error";
        
        return fetchQuizTitle(quizUri, lang, fetch);
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function removeSharing(shareLinkModel: ShareLinkModel, fetch: SolidFetch_Type) {
    //take away acl from resource (set the specified acls every right to false)
    const resourceUri = getUrl(shareLinkModel.shareThing, SOLIDQUIZ.sharedResource.value) ?? "error";
    if (shareLinkModel.isPubliclyShared) {
        await aclService.takeAwayPublicAcl(resourceUri, fetch);
    }
    else {
        const agentWebId = getUrl(shareLinkModel.shareLinkThing, SOLIDQUIZ.shareLinksIndividual.value) ?? "error";
        await aclService.takeAwayAgentAcl(resourceUri, agentWebId, fetch);
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

export async function tryGetName(webId: string): Promise<string | null> {
    try {
        const dataset = await getSolidDataset(webId);
        const thing = getThing(dataset, webId);
        if (thing === null) {
            return null;
        }

        let name = getStringNoLocale(thing, FOAF.firstName);
        if (name === null) {
            name = getStringNoLocale(thing, FOAF.name);
        }

        return name;
    } catch (error) {
        console.log(error);
    }

    return null;
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
