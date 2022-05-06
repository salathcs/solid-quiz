import { GameStatus } from "../../../../../../models/GameStatus";
import { Thing } from '@inrupt/solid-client';

export interface Props {
    quizThing: Thing, 
    gameResult: GameStatus
}