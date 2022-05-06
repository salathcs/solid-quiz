import React, { useContext, useEffect, useState } from 'react';
import { Props } from './types';
import './styles.scoped.css';
import * as quizService from '../../../../services/QuizService';
import * as workspaceService from '../../../../services/WorkspaceService';
import { useSession } from '@inrupt/solid-ui-react';
import { WorkspaceContext } from '../../../../contexts/WorkspaceContext';
import { SolidDataset_Type } from '../../../../helpers/SolidDatasetType';
import { SpinnerContext } from '../../../../contexts/SpinnerContext';
import { QuizList } from './quizList';
import { getPublicDatasets } from '../../../../helpers/QuizListHelper';

export const QuizListLoader: React.FC<Props> = (props: Props) => {
	const { session } = useSession();
	const { workspaceUrl } = useContext(WorkspaceContext);
	const { SpinAround } = useContext(SpinnerContext);
	const [quizDatasets, setQuizDatasets] = useState<SolidDataset_Type[]>([]);

	useEffect(() => {
		SpinAround(async () => {
			//load locales
			const quizzesContainerUri = await quizService.getQuizzesContainer(workspaceUrl);
			const fetchedQuizDatasets = await workspaceService.getQuizDatasets(quizzesContainerUri, session.fetch);

			//load public
			const fetchedPublicQuizDatasets = await getPublicDatasets();
	
			setQuizDatasets([...fetchedQuizDatasets, ...fetchedPublicQuizDatasets]);
		});	
	}, [workspaceUrl, session.fetch, SpinAround]);

	return (
		<>
			<QuizList quizDatasets={quizDatasets} onQuizSelected={props.onQuizSelected} />
		</>
	);
}