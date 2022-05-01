import React from "react";

export interface ISpinnerContext {
  Spinner: boolean;
  ShowSpinner: () => void;
  HideSpinner: () => void;
  }
  
export const defaultSpinnerState = {
  Spinner: true,
  ShowSpinner: () => {},
  HideSpinner: () => {},
  };
  
  export const SpinnerContext = React.createContext<ISpinnerContext>(defaultSpinnerState);