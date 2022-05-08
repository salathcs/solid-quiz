import { buildThing, createSolidDataset, createThing, getSolidDataset, getThingAll, saveSolidDatasetAt, setThing, Thing } from "@inrupt/solid-client";
import { RDF } from "@inrupt/vocab-common-rdf";
import { SHARE_LINKS_CONTAINER_DATASET } from "../constants/DefaultValues";
import { SolidDataset_Type, SolidFetch_Type } from "../helpers/SolidDatasetType";
import SOLIDQUIZ from "../helpers/SOLIDQUIZ";

export async function createShareLink(workspaceUri: string, individualWebId: string, shareUri: string, fetch: SolidFetch_Type) {
    const linksUrl = `${workspaceUri}${SHARE_LINKS_CONTAINER_DATASET}`;
    let linksDataset = await getOrCreateLinksDataset(linksUrl, fetch);

    const shareLinkThing = buildThing(createThing())
      .addUrl(RDF.type, SOLIDQUIZ.ShareLink.value)
      .addUrl(SOLIDQUIZ.shareLinksLink.value, shareUri)
      .addUrl(SOLIDQUIZ.shareLinksIndividual.value, individualWebId)
      .build();

    linksDataset = setThing(linksDataset, shareLinkThing);

    await saveSolidDatasetAt(linksUrl, linksDataset, {
        fetch: fetch,
    });
}

export async function getAllShareLink(workspaceUri: string, fetch: SolidFetch_Type): Promise<Thing[]> {
    const linksDatasetUri = getShareLinksDatasetUri(workspaceUri);

    const linksDataset = await getOrCreateLinksDataset(linksDatasetUri, fetch);

    return getThingAll(linksDataset);
}

export function getShareLinksDatasetUri(workspaceUri: string) {
    return `${workspaceUri}${SHARE_LINKS_CONTAINER_DATASET}`;
}


//privates
async function getOrCreateLinksDataset(linksUrl: string, fetch: SolidFetch_Type): Promise<SolidDataset_Type> {
    try {
      const workspace = await getSolidDataset(linksUrl, { fetch });
      return workspace;
    } catch (error: any) {
      if (error.statusCode === 404) {
        const workspace = await saveSolidDatasetAt(
            linksUrl,
            createSolidDataset(),
            {
                fetch,
            }
        );
        return workspace;
      }

      console.log(error);
    }

    throw new Error('unkown error in getOrCreateWorkSpace');
}
