import React, { useEffect, useState } from 'react';
import { Props } from './types';
import './styles.scoped.css';
import { QuizBtn } from './quizBtn';
import { getQuizzesFromDatasets } from '../../../../../helpers/QuizListHelper';

export const QuizList: React.FC<Props> = (props: Props) => {
	const [quizBtns, setQuizBtns] = useState<JSX.Element[]>([]);
	
	useEffect(() => {
		const quizData = getQuizzesFromDatasets(props.quizDatasets);

		setQuizBtns(
			quizData.map((datasetAndThing, indx) => 
				<QuizBtn key={indx} datasetAndThing={datasetAndThing} onQuizSelected={props.onQuizSelected} />)
		);
	}, [props.quizDatasets, props.onQuizSelected]);

	return (
		<div className='d-grid gap-3'>
			{quizBtns}
		</div>
	);
}