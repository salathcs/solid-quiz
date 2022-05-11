import { createSolidDataset, deleteSolidDataset, getSolidDataset, getSourceUrl, getThing, getThingAll, getUrl, saveSolidDatasetAt, Thing, Url, UrlString } from "@inrupt/solid-client";
import { RDF } from '@inrupt/vocab-common-rdf';
import { WS } from "@inrupt/vocab-solid";
import { SOLID_QUIZ_WORKSPACE } from "../constants/DefaultValues";
import { SolidFetch_Type, SolidDataset_Type } from "../constants/SolidDatasetType";
  
export async function getProfileThing(webId: string, fetch: SolidFetch_Type): Promise<Thing> {
  const profileDataset = await getSolidDataset(webId, {
    fetch: fetch,
  });
  const profileThing = getThing(profileDataset, webId);

  if (profileThing !== null) {
    return profileThing;
  }
  
  throw new Error('Fetching profile failed!');
}

export function getWorkSpaceLocation(profileThing: Thing): string {
  const podRoot = getUrl(profileThing, WS.storage);

  if (podRoot === null) {
    throw new Error('Determining pod root failed!');
  }

  return `${podRoot}${SOLID_QUIZ_WORKSPACE}`;
}

export async function getOrCreateWorkSpace(workspaceUri: string, fetch: SolidFetch_Type): Promise<SolidDataset_Type> {
    try {
      const workspace = await getSolidDataset(workspaceUri, { fetch });
      return workspace;
    } catch (error: any) {
      if (error.statusCode === 404) {
        const workspace = await saveSolidDatasetAt(
          workspaceUri,
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
  
export async function deleteDataset(dataset: SolidDataset_Type, fetch: SolidFetch_Type) {
    const uri = getSourceUrl(dataset);

    deleteSolidDataset(uri, { fetch });
  }

export function getFirstThingByRDFType(workspace: SolidDataset_Type, rdfType: Url | UrlString): Thing | null {
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

export function getAllThingByRDFType(workspace: SolidDataset_Type, rdfType: Url | UrlString): Array<Thing> {
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

export function getAllThingByUris(workspace: SolidDataset_Type, uris: string[]): Array<Thing> {
    let result: Array<Thing> = [];

    uris.forEach(uri => {
        const thing = getThing(workspace, encodeURI(uri));

        if (thing !== null) {
          result.push(thing);
        }
    });

    return result;    
}
