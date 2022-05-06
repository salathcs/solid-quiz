import React from 'react';
import { Props } from './types';
import './styles.scoped.css';
import { GameContextComponent } from '../../../common/gameContextComponent';
import { getUrlAll } from '@inrupt/solid-client';
import SOLIDQUIZ from './../../../../helpers/SOLIDQUIZ';
import { GameController } from './gameController';

export const GameLoader: React.FC<Props> = (props: Props) => {
	
	const questionsCount = getUrlAll(props.quizData.thing, SOLIDQUIZ.quizQuestion.value).length;

	return (
		<>
			<GameContextComponent 
				quizData={props.quizData}
				gameStatus={{ actQuestionNumber: 1, allQuestions: questionsCount }}>
				<GameController />
			</GameContextComponent>
		</>
	);
}