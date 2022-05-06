import { Thing } from "@inrupt/solid-client";

export interface Props {
    questions: Thing[],
    onCompleteGame: () => void
}