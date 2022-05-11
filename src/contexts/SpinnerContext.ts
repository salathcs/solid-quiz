import React from "react";

export interface ISpinnerContext {
  Spinner: boolean;
  ShowSpinner: () => void;
  HideSpinner: () => void;
  SpinAround: (delegate: () => Promise<void>) => Promise<void>;
}
  
export const defaultSpinnerState = {
  Spinner: true,
  ShowSpinner: () => {},
  HideSpinner: () => {},
  SpinAround: (delegate: () => Promise<void>) => { throw new Error('This is a default value, you should not call it!') }
};
  
  export const SpinnerContext = React.createContext<ISpinnerContext>(defaultSpinnerState);