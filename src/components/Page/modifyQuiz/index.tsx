import React, { useContext, useEffect, useState } from 'react';
import { Props } from './types';
import './styles.scoped.css';
import { TranslateContext } from '../../../contexts/TranslateContext';
import { PageSwitcherContext } from '../../../contexts/PageSwitcherContext';
import { Button } from 'react-bootstrap';
import * as quizService from '../../../services/QuizService';
import * as workspaceService from '../../../services/WorkspaceService';
import { useSession } from '@inrupt/solid-ui-react';
import { WorkspaceContext } from '../../../contexts/WorkspaceContext';
import { SolidDataset_Type } from '../../../helpers/SolidDatasetType';
import { SpinnerContext } from '../../../contexts/SpinnerContext';
import { QuizList } from './quizList';

export const ModifyQuiz: React.FC<Props> = (props: Props) => {
	const { session } = useSession();
	const { t } = useContext(TranslateContext);
	const { GoBack } = useContext(PageSwitcherContext);
	const { workspaceUrl } = useContext(WorkspaceContext);
	const { SpinAround } = useContext(SpinnerContext);
	const [quizDatasets, setQuizDatasets] = useState<SolidDataset_Type[]>([]);

	useEffect(() => {
		SpinAround(async () => {
			const quizzesContainerUri = await quizService.getQuizzesContainer(workspaceUrl);
			const fetchedQuizDatasets = await workspaceService.getQuizDatasets(quizzesContainerUri, session.fetch);
	
			setQuizDatasets(fetchedQuizDatasets);
		});	
	}, [workspaceUrl, session.fetch, SpinAround]);

	return (
		<>
			<h3 className='main-title'>{t("modifyQuiz.title")}</h3>

			{quizDatasets.length > 0 &&
			<QuizList quizDatasets={quizDatasets} />}

			<Button variant='light' className='back-btn' onClick={() => GoBack()}>{t("page.common.back")}</Button>
		</>
	);
}