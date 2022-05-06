import { getSolidDataset, addUrl, getThing, saveSolidDatasetAt, createSolidDataset, setThing, createThing } from '@inrupt/solid-client';
import { SOLID_QUIZ_POD_SHARES_DATASET, SOLID_QUIZ_POD_SHARES_THING, SOLID_QUIZ_POD_SHARES_THING_NAME } from '../constants/DefaultValues';
import { SolidDataset_Type, SolidFetch_Type } from '../helpers/SolidDatasetType';
import SOLIDQUIZ from './../helpers/SOLIDQUIZ';
import { Thing } from '@inrupt/solid-client';
import { RDF } from '@inrupt/vocab-common-rdf';

export async function publishQuiz(quizUri: string, fetch: SolidFetch_Type) {
    
}

export async function publishQuizResult(quizResultUri: string) {
    let publicSharesDataset = await getOrCreateShares(SOLID_QUIZ_POD_SHARES_DATASET);
    let publicSharesThing = getThing(publicSharesDataset, SOLID_QUIZ_POD_SHARES_THING) ?? createPublishedThing();

    if (publicSharesThing === null) {
        throw new Error('unkown error in shareQuizResult');
    }

    publicSharesThing = addUrl(publicSharesThing, SOLIDQUIZ.sharedQuizResult.value, quizResultUri);

    publicSharesDataset = setThing(publicSharesDataset, publicSharesThing);

    await saveSolidDatasetAt(SOLID_QUIZ_POD_SHARES_DATASET, publicSharesDataset);
}

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

    throw new Error('unkown error in getOrCreateShares');
}

function createPublishedThing(): Thing {
    let publishedThing = createThing({name: SOLID_QUIZ_POD_SHARES_THING_NAME});
    publishedThing = addUrl(publishedThing, RDF.type, SOLIDQUIZ.Shares.value);

    return publishedThing;
}
