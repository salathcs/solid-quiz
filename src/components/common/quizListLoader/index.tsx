import React, { useContext, useEffect, useState } from 'react';
import { Props } from './types';
import './styles.scoped.css';
import { useSession } from '@inrupt/solid-ui-react';
import { WorkspaceContext } from '../../../contexts/WorkspaceContext';
import { SolidDataset_Type } from '../../../constants/SolidDatasetType';
import { SpinnerContext } from '../../../contexts/SpinnerContext';
import { QuizList } from './quizList';
import { getLocalSharesDatasets, getOwnQuizzes, getPublicDatasets, mergeQuizzes } from '../../../helpers/QuizListHelper';
import { PageSwitcherContext } from '../../../contexts/PageSwitcherContext';
import { Button } from 'react-bootstrap';
import { TranslateContext } from '../../../contexts/TranslateContext';

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
			const fetchedQuizDatasets = await getOwnQuizzes(workspaceUrl, session.fetch);

			//load public shares
			const fetchedPublicQuizDatasets = await getPublicDatasets();

			//load local shares
			const fetchedLocalSharesQuizDatasets = await getLocalSharesDatasets(workspaceUrl, session.fetch);

			//merge
			const mergedQuizDatasets = mergeQuizzes(fetchedQuizDatasets, fetchedPublicQuizDatasets, fetchedLocalSharesQuizDatasets);
	
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