import React, { useContext, useEffect, useState } from 'react';
import { Props } from './types';
import './styles.scoped.css';
import { GameContext } from '../../../../../../../../contexts/GameContext';
import { getUrlAll, Thing } from '@inrupt/solid-client';
import SOLIDQUIZ from '../../../../../../../../helpers/SOLIDQUIZ';
import * as workspaceService from '../../../../../../../../services/WorkspaceService';
import { generateRandomSeries } from '../../../../../../../../helpers/GameHelper';
import { AnswerController } from './answerController';

export const AnswerLoader: React.FC<Props> = (props: Props) => {
	const {  getQuizData } = useContext(GameContext);
	const [answerThings, setAnswerThings] = useState<Thing[]>([]);

	useEffect(() => {
		const answerUris = getUrlAll(props.questionThing, SOLIDQUIZ.answerOption.value);		
		const answerThings = workspaceService.getAllThingByUris(getQuizData().dataset, answerUris);
		const series = generateRandomSeries(answerThings.length);

		const answersInRandOrder: Thing[] = [];

		for (let i = 0; i < series.length; i++) {
			const index = series[i];
			
			answersInRandOrder.push(answerThings[index]);
		}

		setAnswerThings(answersInRandOrder);
	}, [getQuizData, props.questionThing]);

	return (
		<AnswerController questionThing={props.questionThing} answerThings={answerThings} />
	);
}