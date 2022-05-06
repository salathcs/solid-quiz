import { DatasetAndThing } from "../../../../models/DatasetAndThing";

export interface Props {
    onQuizSelected: (datasetAndThing: DatasetAndThing) => void
}