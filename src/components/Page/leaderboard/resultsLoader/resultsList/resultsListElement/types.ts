import { Thing } from "@inrupt/solid-client";
import { DatasetAndThing } from "../../../../../../models/DatasetAndThing";

export interface Props {
    orderId: number,
    quizThing: Thing,
    resultThing: Thing,
    multiLang: boolean
}