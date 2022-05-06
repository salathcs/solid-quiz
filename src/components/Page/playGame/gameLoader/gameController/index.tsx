import React, { useContext, useEffect, useState } from 'react';
import { Props } from './types';
import './styles.scoped.css';
import { GameContext } from './../../../../../contexts/GameContext';
import { generateRandomSeries } from '../../../../../helpers/GameHelper';
import * as workspaceService from '../../../../../services/WorkspaceService'
import { getUrlAll, Thing } from '@inrupt/solid-client';
import SOLIDQUIZ from '../../../../../helpers/SOLIDQUIZ';
import { GameResult } from './gameResult';
import { QuestionController } from './questionController';
import { GameContainer } from './gameContainer';

export const GameController: React.FC<Props> = (props: Props) => {
	const { getQuizData } = useContext(GameContext);
	const [questions, setQuestions] = useState<Thing[] | null>(null);
	const [gameComplete, setGameComplete] = useState(false);

	useEffect(() => {
		const quizData = getQuizData();
		const questionUris = getUrlAll(quizData.thing, SOLIDQUIZ.quizQuestion.value);		
		const questionThings = workspaceService.getAllThingByUris(quizData.dataset, questionUris);
		const series = generateRandomSeries(questionThings.length);

		const questionsInRandOrder: Thing[] = [];

		for (let i = 0; i < series.length; i++) {
			const index = series[i];
			
			questionsInRandOrder.push(questionThings[index]);
		}

		setQuestions(questionsInRandOrder);
	}, [getQuizData]);

	if (questions === null) {
		return <></>;
	}

	return (
		<>
			{
				gameComplete ?
				<GameResult /> :
				<GameContainer>
					<QuestionController questions={questions} onCompleteGame={() => setGameComplete(true)} />
				</GameContainer>
			}
		</>
	);
}