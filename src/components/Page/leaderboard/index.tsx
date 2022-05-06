import React, { useContext, useState } from 'react';
import { Props } from './types';
import './styles.scoped.css';
import { TranslateContext } from '../../../contexts/TranslateContext';
import { QuizListLoader } from '../../common/quizListLoader';
import { DatasetAndThing } from '../../../models/DatasetAndThing';
import { ResultsLoader } from './resultsLoader';
import { Button } from 'react-bootstrap';
import { PageSwitcherContext } from '../../../contexts/PageSwitcherContext';

export const Leaderboard: React.FC<Props> = (props: Props) => {
	const { t } = useContext(TranslateContext);	
	const [selectedQuiz, setSelectedQuiz] = useState<DatasetAndThing | null>(null);
	const { GoBack } = useContext(PageSwitcherContext);

	return (
		<>
			{
				selectedQuiz === null ?
				<>
					<h3 className='main-title'>{t("leaderboard.title")}</h3>
					<QuizListLoader onQuizSelected={setSelectedQuiz} />
				</> :
				<>
					<ResultsLoader quizData={selectedQuiz} /> 
					<Button variant='light' className='back-btn' onClick={() => GoBack()}>{t("page.common.back")}</Button>
				</>
			}
		</>
	);
}