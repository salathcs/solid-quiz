import React from "react";
import { SolidDataset_Type } from "../constants/SolidDatasetType";

export interface IWorkspaceContext {
    workspace: SolidDataset_Type | null,
    getWorkspace: () => SolidDataset_Type,
    workspaceUrl: string,
    webId: string
  }
  
export const defaultWorkspaceContext = {
    workspace: null,
    getWorkspace: () => { throw new Error('Workspace not found!') },
    workspaceUrl: "unknown",
    webId: "unknown"
  };
  
export const WorkspaceContext = React.createContext<IWorkspaceContext>(defaultWorkspaceContext);