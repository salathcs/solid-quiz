import { Thing } from '@inrupt/solid-client';

export interface ShareLinkModel{
    shareThing: Thing,
    shareLinkThing: Thing,
    isPubliclyShared: boolean
}