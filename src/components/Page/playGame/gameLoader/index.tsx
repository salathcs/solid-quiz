import React, { useEffect, useState } from 'react';
import { Props } from './types';
import './styles.scoped.css';
import { GameContextComponent } from '../../../common/gameContextComponent';
import { getUrlAll, getBoolean } from '@inrupt/solid-client';
import SOLIDQUIZ from './../../../../helpers/SOLIDQUIZ';
import { GameController } from './gameController';
import { GameStatus } from '../../../../models/GameStatus';
import { MULTI_LANGUAGE_SUPPORT } from '../../../../constants/SolidQuizMissingValues';

export const GameLoader: React.FC<Props> = (props: Props) => {
	const [multiLang, setMultiLang] = useState<boolean>(false);
	const [newGameStatus, setNewGameStatus] = useState<GameStatus | null>(null);

	useEffect(() => {
		const multiLang = getBoolean(props.quizData.thing, MULTI_LANGUAGE_SUPPORT) ?? false;
		const questionsCount = getUrlAll(props.quizData.thing, SOLIDQUIZ.quizQuestion.value).length;

		setMultiLang(multiLang);
		setNewGameStatus({ actQuestionIndex: 0, allQuestions: questionsCount });
	}, [props.quizData]);	

	return (
		<>
			{newGameStatus !== null &&
				<GameContextComponent 
					quizData={props.quizData}
					multiLang={multiLang}
					gameStatus={newGameStatus}>
					<GameController />
				</GameContextComponent>
			}
		</>
	);
}