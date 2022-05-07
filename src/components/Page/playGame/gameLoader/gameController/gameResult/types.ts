import { Thing } from '@inrupt/solid-client';
import { GameResultData } from "../../../../../../models/GameResultData";

export interface Props {
    quizThing: Thing, 
    gameResult: GameResultData
}