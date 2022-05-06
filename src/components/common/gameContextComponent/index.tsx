import React, { useState } from 'react';
import { Props } from './types';
import './styles.scoped.css';
import { GameContext } from '../../../contexts/GameContext';

export const GameContextComponent: React.FC<Props> = (props: Props) => {
	const [gameStatus, setGameStatus] = useState(props.gameStatus);

	return (
		<GameContext.Provider value={{
			getQuizData: () => props.quizData,
			gameStatus,
			setGameStatus
		}}>
			{props.children}
		</GameContext.Provider>
	);
}