import { GameStatus } from './GameStatus';
import { DatasetAndThing } from './DatasetAndThing';

export interface GameResultData {
    gameStatus: GameStatus,
    savedQuizResultData: DatasetAndThing
}