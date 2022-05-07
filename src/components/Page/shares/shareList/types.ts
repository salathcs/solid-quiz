import { ShareLinkModel } from "../../../../models/ShareLinkModel";

export interface Props {
    shareLinkModels: ShareLinkModel[],
    setSyncState: (delegate: (act: number) => number) => void
}