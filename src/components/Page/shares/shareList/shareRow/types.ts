import { ShareLinkModel } from '../../../../../models/ShareLinkModel';

export interface Props {
    shareLinkModel: ShareLinkModel,
    setSyncState: (delegate: (act: number) => number) => void
}