import React from "react";

export interface IPageSwitcherContext {
  ActualPage: JSX.Element | null;
  SwitchTo: (page: JSX.Element) => void;
  GoBack: () => void;
  }
  
export const defaultPageSwitcherState = {
    ActualPage: null,
    SwitchTo: (page: JSX.Element) => {},
    GoBack: () => {},
  };
  
  export const PageSwitcherContext = React.createContext<IPageSwitcherContext>(defaultPageSwitcherState);