import React from "react";
import { GameStatus } from "../models/GameStatus";
import { DatasetAndThing } from './../models/DatasetAndThing';

export interface IGameContext {
    getQuizData: () => DatasetAndThing,
    gameStatus: GameStatus,
    setGameStatus: (delegate: (val: GameStatus) => GameStatus) => void
}
  
export const defaultGameState = {
    getQuizData: () => {throw new Error("you should not call this (defaultPageSwitcherState.getQuizData)!")},
    gameStatus: { actQuestionNumber: -1, allQuestions: -1 },
    setGameStatus: () => {}
};
  
export const GameContext = React.createContext<IGameContext>(defaultGameState);