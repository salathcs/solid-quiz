import { SolidDataset, WithChangeLog, WithServerResourceInfo } from "@inrupt/solid-client";

export type SolidDataset_Type = GetSolidDataset_Type| SaveSolidDataset_Type;
export type GetSolidDataset_Type = SolidDataset & WithServerResourceInfo;
export type SaveSolidDataset_Type = SolidDataset & WithServerResourceInfo & WithChangeLog;