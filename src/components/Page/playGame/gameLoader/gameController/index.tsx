import React, { useContext } from 'react';
import { Props } from './types';
import './styles.scoped.css';
import { GameContext } from './../../../../../contexts/GameContext';

export const GameController: React.FC<Props> = (props: Props) => {
	const { gameStatus } = useContext(GameContext);

	return (
		<>
			<p>actQuestionNumber: {gameStatus.actQuestionNumber}</p>
			<p>allQuestions: {gameStatus.allQuestions}</p>
		</>
	);
}