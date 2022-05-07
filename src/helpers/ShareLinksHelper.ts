import { SolidDataset_Type, SolidFetch_Type } from './SolidDatasetType';
import * as shareLinksService from '../services/ShareLinksService';
import { getSolidDataset, Thing, getBoolean } from '@inrupt/solid-client';
import { getUrl } from '@inrupt/solid-client';
import SOLIDQUIZ from './SOLIDQUIZ';
import { getThing } from '@inrupt/solid-client';
import { MULTI_LANGUAGE_SUPPORT } from '../constants/SolidQuizMissingValues';
import { getString } from './LangReader';
import { TITLE } from './../constants/SolidQuizMissingValues';

export async function getAllShareThingByShareLink(workspaceUrl: string, fetch: SolidFetch_Type): Promise<Thing[]> {
    const shareLinks = await shareLinksService.getAllShareLink(workspaceUrl, fetch);

    const rv: Thing[] = [];

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
                rv.push(thing);
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
