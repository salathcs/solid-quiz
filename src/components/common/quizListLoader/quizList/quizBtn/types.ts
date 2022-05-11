import { DatasetAndThing } from "../../../../../models/DatasetAndThing";

export interface Props {
    datasetAndThing: DatasetAndThing,
    onQuizSelected: (datasetAndThing: DatasetAndThing) => void
}