import React from "react";
import { QuizContainer } from './../models/QuizContainer';

export interface IQuestionCreationContext {
    questionNumber: number,     //questions order number (not for playing)
    setQuestionNumber: (delegate: (val: number) => number) => void,
    answerNumber: number,       //available answer option number (its an identificator), after use need to increase
    setAnswerNumber: (delegate: (val: number) => number) => void,

    getQuizContainer: () => QuizContainer,
    isCrurrentQuestionCreatedYet: () => boolean,
    isNextQuestionExists: () => boolean
  }
  
export const defaultQuestionCreationState = {
    questionNumber: 1,
    setQuestionNumber: () => {},
    answerNumber: 3,     //head start, first two are always there (answer options)
    setAnswerNumber: () => {},

    getQuizContainer: () => {throw new Error("you should not call this (defaultQuestionCreationState.getQuizContainer)!")},
    isCrurrentQuestionCreatedYet: () => {throw new Error("you should not call this (defaultQuestionCreationState.isCrurrentLastQuestion)!")},
    isNextQuestionExists: () => {throw new Error("you should not call this (defaultQuestionCreationState.isNextQuestionExists)!")}
  };
  
export const QuestionCreationContext = React.createContext<IQuestionCreationContext>(defaultQuestionCreationState);