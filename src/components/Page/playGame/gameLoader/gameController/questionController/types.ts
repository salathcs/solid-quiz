import { Thing } from "@inrupt/solid-client";
import { GameStatus } from "../../../../../../models/GameStatus";

export interface Props {
    questions: Thing[],
    onCompleteGame: (gameStatus: GameStatus) => void
}