import { createSolidDataset, getSolidDataset, getThingAll, getUrl, saveSolidDatasetAt, Thing, Url, UrlString } from "@inrupt/solid-client";
import { RDF } from '@inrupt/vocab-common-rdf';
import { SolidDataset_Type } from "../helpers/SolidDatasetType";
  
export async function getOrCreateWorkSpace(containerUri: string, fetch: (url: RequestInfo, init?: RequestInit | undefined) => Promise<Response>): Promise<SolidDataset_Type> {
    const indexUrl = `${containerUri}index.ttl`;
    try {
      const workspace = await getSolidDataset(indexUrl, { fetch });
      return workspace;
    } catch (error: any) {
      if (error.statusCode === 404) {
        const workspace = await saveSolidDatasetAt(
          indexUrl,
          createSolidDataset(),
          {
            fetch,
          }
        );
        return workspace;
      }
    }

    throw new Error('unkown error in getOrCreateWorkSpace');
  }

export async function getFirstThingByRDFType(workspace: SolidDataset_Type, rdfType: Url | UrlString): Promise<Thing | null> {
    const allThings = getThingAll(workspace);

    for (let i = 0; i < allThings.length; i++) {
        const thing = allThings[i];
        const typeUrl = getUrl(thing, RDF.type);
        if (typeUrl === rdfType) {
            return thing;
        }
    }

    return null;    
}

export async function getAllThingByRDFType(workspace: SolidDataset_Type, rdfType: Url | UrlString): Promise<Array<Thing>> {
    const allThings = getThingAll(workspace);
    let result: Array<Thing> = [];

    allThings.forEach(thing => {
        const typeUrl = getUrl(thing, RDF.type);
        if (typeUrl === rdfType) {
            result.push(thing);
        }
    });

    return result;    
}