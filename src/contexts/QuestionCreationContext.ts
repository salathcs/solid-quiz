import React from "react";

export interface IQuestionCreationContext {
    questionNumber: number,
    increaseQuestionNumber: () => void
  }
  
export const defaultQuestionCreationState = {
    questionNumber: 1,
    increaseQuestionNumber: () => {}
  };
  
export const QuestionCreationContext = React.createContext<IQuestionCreationContext>(defaultQuestionCreationState);