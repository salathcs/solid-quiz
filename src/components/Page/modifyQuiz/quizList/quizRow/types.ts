import { DatasetAndThing } from "../../../../../models/DatasetAndThing";

export interface Props {
    datasetAndThing: DatasetAndThing,
    handleDelete: (datasetAndThing: DatasetAndThing) => void
}