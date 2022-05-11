import React, { useCallback, useState } from 'react';
import { Props } from './types';
import './styles.scoped.css';
import { GameContext } from '../../../contexts/GameContext';

export const GameContextComponent: React.FC<Props> = (props: Props) => {
	const [gameStatus, setGameStatus] = useState(props.gameStatus);

	const getQuizData = useCallback(() => {
		return props.quizData;
	}, [props.quizData])

	return (
		<GameContext.Provider value={{
			getQuizData,
			multiLang: props.multiLang,
			gameStatus,
			setGameStatus
		}}>
			{props.children}
		</GameContext.Provider>
	);
}