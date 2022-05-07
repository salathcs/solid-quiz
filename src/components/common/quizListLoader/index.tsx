import React, { useContext, useEffect, useState } from 'react';
import { Props } from './types';
import './styles.scoped.css';
import * as quizService from '../../../services/QuizService';
import * as workspaceService from '../../../services/WorkspaceService';
import { useSession } from '@inrupt/solid-ui-react';
import { WorkspaceContext } from '../../../contexts/WorkspaceContext';
import { SolidDataset_Type } from '../../../helpers/SolidDatasetType';
import { SpinnerContext } from '../../../contexts/SpinnerContext';
import { QuizList } from './quizList';
import { getPublicDatasets, mergeQuizzes } from '../../../helpers/QuizListHelper';
import { PageSwitcherContext } from '../../../contexts/PageSwitcherContext';
import { Button } from 'react-bootstrap';
import { TranslateContext } from '../../../contexts/TranslateContext';
import SOLIDQUIZ from '../../../helpers/SOLIDQUIZ';

export const QuizListLoader: React.FC<Props> = (props: Props) => {
	const { t } = useContext(TranslateContext);
	const { session } = useSession();
	const { workspaceUrl } = useContext(WorkspaceContext);
	const { SpinAround } = useContext(SpinnerContext);
	const { GoBack } = useContext(PageSwitcherContext);
	const [quizDatasets, setQuizDatasets] = useState<SolidDataset_Type[]>([]);

	useEffect(() => {
		SpinAround(async () => {
			//load locales
			const quizzesContainerUri = await quizService.getQuizzesContainer(workspaceUrl);
			const fetchedQuizDatasets = await workspaceService.getDatasetsFromContainerBasedOnType(quizzesContainerUri, SOLIDQUIZ.Quiz.value, session.fetch);

			//load public
			const fetchedPublicQuizDatasets = await getPublicDatasets();

			//TODO: shared

			//merge
			const mergedQuizDatasets = mergeQuizzes(fetchedQuizDatasets, fetchedPublicQuizDatasets);
	
			setQuizDatasets(mergedQuizDatasets);
		});	
	}, [workspaceUrl, session.fetch, SpinAround]);

	return (
		<>
			<QuizList quizDatasets={quizDatasets} onQuizSelected={props.onQuizSelected} />

			<Button variant='light' className='back-btn' onClick={() => GoBack()}>{t("page.common.back")}</Button>
		</>
	);
}