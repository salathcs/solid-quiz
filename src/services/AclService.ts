import { createAcl, getAgentAccess, getResourceAcl, getSolidDatasetWithAcl, getSourceUrl, hasAccessibleAcl, hasResourceAcl, saveAclFor, setAgentResourceAccess, setPublicResourceAccess } from "@inrupt/solid-client";
import { SolidDataset_Type, SolidFetch_Type } from "../constants/SolidDatasetType";

export async function createPublicAclForNewResource(dataset: SolidDataset_Type, fetch: SolidFetch_Type) {
    try {
        //check for control right (createAcl wont work if this check missing)
        if (!hasAccessibleAcl(dataset)) {
            throw new Error("Has no control right!");
        }

        const newAcl = createAcl(dataset);

        const updatedAcl = setPublicResourceAccess(
            newAcl,
            { read: true, append: false, write: false, control: false }
          );
          
          // save the new public Acl:
          await saveAclFor(dataset, updatedAcl, { fetch });

    } catch (error) {
        console.log(error);
    }
}

export async function createAgentAclForNewResource(friendsWebId: string, dataset: SolidDataset_Type, fetch: SolidFetch_Type) {
    try {
        //check for control right (createAcl wont work if this check missing)
        if (!hasAccessibleAcl(dataset)) {
            throw new Error("Has no control right!");
        }

        const newAcl = createAcl(dataset);

        const updatedAcl = setAgentResourceAccess(
            newAcl,
            friendsWebId,
            { read: true, append: false, write: false, control: false }
          );
          
          // save the new public Acl:
          await saveAclFor(dataset, updatedAcl, { fetch });

    } catch (error) {
        console.log(error);
    }
}

export async function createFallbackAclForOwner(webId: string, dataset: SolidDataset_Type, fetch: SolidFetch_Type) {
    try {
        if (await checkForOwnerRights(webId, dataset, fetch)) {
            return;
        }

        //check for control right (createAcl wont work if this check missing)
        if (!hasAccessibleAcl(dataset)) {
            throw new Error("Has no control right!");
        }

        const newFallbackAcl = createAcl(dataset);

        const updatedAcl = setAgentResourceAccess(
            newFallbackAcl,
            webId,
            { read: true, append: true, write: true, control: true }
          );
          
          // save the new public Acl:
          await saveAclFor(dataset, updatedAcl, { fetch });

    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function takeAwayPublicAcl(resourceUri: string, fetch: SolidFetch_Type) {
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

export async function takeAwayAgentAcl(resourceUri: string, agentWebId: string, fetch: SolidFetch_Type) {
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


//privates
async function checkForOwnerRights(webId: string, dataset: SolidDataset_Type, fetch: SolidFetch_Type): Promise<boolean> {
    try {
        const datasetUri = getSourceUrl(dataset);
        const datasetWithAcl = await getSolidDatasetWithAcl(datasetUri, { fetch });
        if (!hasResourceAcl(datasetWithAcl)) {
            return false;
        }
        const agentAccess = getAgentAccess(datasetWithAcl, webId);

        return agentAccess !== null && 
                agentAccess.read &&
                agentAccess.write &&
                agentAccess.append &&
                agentAccess.control;
    } catch (error) {
        console.log(error);
    }

    return false;
}
