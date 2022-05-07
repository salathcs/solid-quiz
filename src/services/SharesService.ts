import { getSolidDataset, saveSolidDatasetAt, createSolidDataset, setThing, createThing, buildThing } from '@inrupt/solid-client';
import { SOLID_QUIZ_POD_SHARES_DATASET } from '../constants/DefaultValues';
import { SolidDataset_Type, SolidFetch_Type } from '../helpers/SolidDatasetType';
import SOLIDQUIZ from './../helpers/SOLIDQUIZ';
import { Thing } from '@inrupt/solid-client';
import { RDF } from '@inrupt/vocab-common-rdf';
import { SHARE_CREATED } from '../constants/SolidQuizMissingValues';
import { getThingAll } from '@inrupt/solid-client';
import { getUrl } from '@inrupt/solid-client';

export async function publishQuiz(quizUri: string, fetch: SolidFetch_Type) {
    //TODO
}

export async function publishQuizResult(quizResultUri: string) {
    let publicSharesDataset = await getOrCreateShares(SOLID_QUIZ_POD_SHARES_DATASET);
    const newPublicShareThing = createPublishedThing(quizResultUri, SOLIDQUIZ.QuizResult.value);

    publicSharesDataset = setThing(publicSharesDataset, newPublicShareThing);

    await saveSolidDatasetAt(SOLID_QUIZ_POD_SHARES_DATASET, publicSharesDataset);
}

export async function getPublishedShares(shareTypeFilter: string): Promise<Thing[]> {
    const publicSharesDataset = await getOrCreateShares(SOLID_QUIZ_POD_SHARES_DATASET);
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

    throw new Error('shares folder unavailable');
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
