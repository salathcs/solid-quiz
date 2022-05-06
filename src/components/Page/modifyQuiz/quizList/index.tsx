import React, { useEffect, useState } from 'react';
import { Props } from './types';
import './styles.scoped.css';
import { Container } from 'react-bootstrap';
import { QuizRow } from './quizRow';
import { getQuizzesFromDatasets } from '../../../../helpers/QuizListHelper';

export const QuizList: React.FC<Props> = (props: Props) => {
	const [quizRows, setQuizRows] = useState<JSX.Element[]>([]);
	
	useEffect(() => {
		const quizData = getQuizzesFromDatasets(props.quizDatasets);

		setQuizRows(
			quizData.map((datasetAndThing, indx) => 
				<QuizRow key={indx} datasetAndThing={datasetAndThing} handleDelete={props.handleDelete} />)
		);
	}, [props.quizDatasets, props.handleDelete]);

	return (
		<Container className="justify-content-md-center">
			{quizRows}
		</Container>
	);
}