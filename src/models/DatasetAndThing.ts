import { Thing } from '@inrupt/solid-client';
import { SolidDataset_Type } from '../helpers/SolidDatasetType';

export interface DatasetAndThing {
    dataset: SolidDataset_Type,
    thing: Thing
}