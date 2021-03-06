import React, { useContext, useEffect, useState } from 'react';
import { Props } from './types';
import './styles.scoped.css';
import { useSession } from '@inrupt/solid-ui-react';
import { WorkspaceContext } from '../../../../contexts/WorkspaceContext';
import { SpinnerContext } from '../../../../contexts/SpinnerContext';
import * as quizResultsService from '../../../../services/QuizResultService';
import { getPublicQuizResultDatasets, getQuizNameFromQuizThing, getQuizResultsFromContainer, getQuizResultsFromDatasets, mergeQuizResults, sortQuizResultDatas } from '../../../../helpers/QuizResultsListHelper';
import { DatasetAndThing } from '../../../../models/DatasetAndThing';
import { ResultsList } from './resultsList';

export const ResultsLoader: React.FC<Props> = (props: Props) => {
	const { session } = useSession();
	const { workspaceUrl } = useContext(WorkspaceContext);
	const { SpinAround } = useContext(SpinnerContext);
	const [quizResultDatasets, setQuizResultDatasets] = useState<DatasetAndThing[]>([]);

	useEffect(() => {
		SpinAround(async () => {
			//load locales
			const quizName = getQuizNameFromQuizThing(props.quizData.thing);
			const quizzesContainerUri = quizResultsService.getQuizResultsContainer(workspaceUrl, quizName); 
			const fetchedQuizResultDatasets = await getQuizResultsFromContainer(quizzesContainerUri, session.fetch);
			const filteredQuizResultsData = getQuizResultsFromDatasets(fetchedQuizResultDatasets, props.quizData.thing);

			//load public
			const fetchedPublicQuizResultDatasets = await getPublicQuizResultDatasets(props.quizData.thing);

			//merge (filter out duplicates)
			const mergedQuizResultsData = mergeQuizResults(filteredQuizResultsData, fetchedPublicQuizResultDatasets);

			//sort them
			sortQuizResultDatas(mergedQuizResultsData);
	
			setQuizResultDatasets(mergedQuizResultsData);
		});	
	}, [workspaceUrl, session.fetch, SpinAround, props.quizData.thing]);
	
	return (
		<>
			<ResultsList quizData={props.quizData} quizResultDatasets={quizResultDatasets} />
		</>
	);
}