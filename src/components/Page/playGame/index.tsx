import React, { useContext, useState } from 'react';
import { Props } from './types';
import './styles.scoped.css';
import { TranslateContext } from '../../../contexts/TranslateContext';
import { DatasetAndThing } from './../../../models/DatasetAndThing';
import { QuizListLoader } from '../../common/quizListLoader';
import { GameLoader } from './gameLoader';

export const PlayGame: React.FC<Props> = (props: Props) => {
	const { t } = useContext(TranslateContext);
	const [selectedQuiz, setSelectedQuiz] = useState<DatasetAndThing | null>(null);

	return (
		<>
			{
				selectedQuiz === null ?
				<>
					<h3 className='main-title'>{t("playGame.title")}</h3>
					<QuizListLoader onQuizSelected={setSelectedQuiz} /> 
				</> :
				<GameLoader quizData={selectedQuiz} /> 
			}			
		</>
	);
}