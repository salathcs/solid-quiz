import React, { useEffect, useState } from 'react';
import { Props } from './types';
import './styles.scoped.css';
import * as workspaceService from '../../../../services/WorkspaceService';
import SOLIDQUIZ from './../../../../helpers/SOLIDQUIZ';
import { Container } from 'react-bootstrap';
import { QuizRow } from './quizRow';
import { Thing } from '@inrupt/solid-client';

export const QuizList: React.FC<Props> = (props: Props) => {
	const [quizRows, setQuizRows] = useState<JSX.Element[]>([]);
	
	useEffect(() => {
		const quizThings: Thing[] = [];

		for (let i = 0; i < props.quizDatasets.length; i++) {
			const quizDataset = props.quizDatasets[i];
			
			const quizThing = workspaceService.getFirstThingByRDFType(quizDataset, SOLIDQUIZ.Quiz.value);

			if (quizThing !== null) {
				quizThings.push(quizThing);
			}
		}

		setQuizRows(
			quizThings.map((quizThing) => 
				<QuizRow quizThing={quizThing} />)
		);
	}, [props.quizDatasets]);

	return (
		<Container className="justify-content-md-center">
			{quizRows}
		</Container>
	);
}