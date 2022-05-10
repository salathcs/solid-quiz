import { Thing } from "@inrupt/solid-client";
import { SolidDataset_Type } from "../constants/SolidDatasetType";

export interface ShareLinkFetchModel{
    resourceUri: string,
    shareLink: Thing,
    shareDataset: SolidDataset_Type | null
}