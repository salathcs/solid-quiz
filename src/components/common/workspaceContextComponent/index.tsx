import React, { useContext, useEffect, useState } from 'react';
import { Props } from './types';
import './styles.scoped.css';
import { SolidDataset_Type } from '../../../constants/SolidDatasetType';
import { defaultWorkspaceContext, WorkspaceContext } from '../../../contexts/WorkspaceContext';
import { SpinnerContext } from '../../../contexts/SpinnerContext';
import { useSession } from '@inrupt/solid-ui-react';
import * as workspaceService from '../../../services/WorkspaceService';
import * as quizService from '../../../services/QuizService';
import * as quizResultService from '../../../services/QuizResultService';
import * as sharesService from '../../../services/SharesService';

export const WorkspaceContextComponent: React.FC<Props> = (props: Props) => {
	const { session } = useSession();
	const { SpinAround } = useContext(SpinnerContext);
	const [workspace, setWorkspace] = useState<SolidDataset_Type | null>(defaultWorkspaceContext.workspace);
	const [workspaceUrl, setWorkspaceUrl] = useState(defaultWorkspaceContext.workspaceUrl);
	const [webId, setWebId] = useState(defaultWorkspaceContext.webId);

	const getWorkspace = () => {
		if (workspace === null) {
			return defaultWorkspaceContext.getWorkspace();
		}

		return workspace;
	}

	useEffect(() => {
		if (!session || !session.info.isLoggedIn) return;

		SpinAround(async () => {
			
			if (session.info.webId === undefined) {
				throw new Error("WebId cannot be determined!");
			}

			setWebId(session.info.webId);

			const profileThing = await workspaceService.getProfileThing(session.info.webId, session.fetch);

			const workSpaceLocation = workspaceService.getWorkSpaceLocation(profileThing);

			const fetchedWorkspace = await workspaceService.getOrCreateWorkSpace(workSpaceLocation, session.fetch);

			await quizService.createQuizzesContainer(workSpaceLocation, session.fetch);
			await quizResultService.createQuizResultsContainer(workSpaceLocation, session.fetch);
			await sharesService.createSharesIndexForPublic(workSpaceLocation, session.fetch);

			setWorkspaceUrl(workSpaceLocation);
			setWorkspace(fetchedWorkspace);
		});
	  }, [session, session.info.isLoggedIn, webId, SpinAround]);

	return (
		<WorkspaceContext.Provider value={{
			workspace,
			getWorkspace,
			workspaceUrl,
			webId
		}}>
			{props.children}
		</WorkspaceContext.Provider>
	);
}