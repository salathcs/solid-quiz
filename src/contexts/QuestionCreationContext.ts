import React from "react";

export interface IQuestionCreationContext {
    questionNumber: number,
    setQuestionNumber: (delegate: (val: number) => number) => void,
    answerNumber: number,
    setAnswerNumber: (delegate: (val: number) => number) => void,
    correctAnswerId: number,
    setCorrectAnswerId: (delegate: (val: number) => number) => void
  }
  
export const defaultQuestionCreationState = {
    questionNumber: 1,
    setQuestionNumber: () => {},
    answerNumber: 3,     //head start, first two are always there (answer options)
    setAnswerNumber: () => {},
    correctAnswerId: 1,
    setCorrectAnswerId: () => {}
  };
  
export const QuestionCreationContext = React.createContext<IQuestionCreationContext>(defaultQuestionCreationState);