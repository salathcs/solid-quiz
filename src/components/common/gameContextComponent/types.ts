import { DatasetAndThing } from "../../../models/DatasetAndThing";
import { GameStatus } from "../../../models/GameStatus";

export interface Props {
    children: string | JSX.Element | JSX.Element[],

    quizData: DatasetAndThing,
    multiLang: boolean,
    gameStatus: GameStatus
}