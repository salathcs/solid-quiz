import React from "react";

export interface ITranslateContext {
    lang: string,
    t: (key: string) => string
  }
  
export const defaultTranslateState = {
    lang: "en",
    t: (key: string) => "Unknown"
  };
  
export const TranslateContext = React.createContext<ITranslateContext>(defaultTranslateState);