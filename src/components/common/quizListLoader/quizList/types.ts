import { SolidDataset_Type } from "../../../../constants/SolidDatasetType";
import { DatasetAndThing } from "../../../../models/DatasetAndThing";

export interface Props {
    quizDatasets: SolidDataset_Type[],
    onQuizSelected: (datasetAndThing: DatasetAndThing) => void
}