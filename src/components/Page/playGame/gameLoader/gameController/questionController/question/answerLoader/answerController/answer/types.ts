import { Thing } from "@inrupt/solid-client";

export interface Props {
    answerThing: Thing,
    onAnswerSelected: (asnwerThing: Thing) => boolean,
    disabled: boolean
}