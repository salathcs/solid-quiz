import { Thing } from "@inrupt/solid-client";
import { GameResultData } from "../../../../../../models/GameResultData";

export interface Props {
    questions: Thing[],
    onCompleteGame: (gameResult: GameResultData) => void
}