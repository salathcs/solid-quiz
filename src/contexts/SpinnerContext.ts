import React from "react";

export interface ISpinnerContext {
    showSpinner: boolean;
    toggleSpinner: () => void;
  }
  
export const defaultSpinnerState = {
    showSpinner: true,
    toggleSpinner: () => {}
  };
  
  export const SpinnerContext = React.createContext<ISpinnerContext>(defaultSpinnerState);