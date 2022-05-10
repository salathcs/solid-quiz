import React, { useEffect, useState, useContext } from 'react';
import { Props } from './types';
import './styles.scoped.css';
import { Container } from 'react-bootstrap';
import { QuizRow } from './quizRow';
import { getQuizzesFromDatasets } from '../../../../helpers/QuizListHelper';
import { TranslateContext } from './../../../../contexts/TranslateContext';

export const QuizList: React.FC<Props> = (props: Props) => {
	const { t } = useContext(TranslateContext);
	const [quizRows, setQuizRows] = useState<JSX.Element[]>([]);
	
	useEffect(() => {
		const quizData = getQuizzesFromDatasets(props.quizDatasets);

		setQuizRows(
			quizData.map((datasetAndThing, indx) => 
				<QuizRow key={indx} datasetAndThing={datasetAndThing} handleDelete={props.handleDelete} />)
		);
	}, [props.quizDatasets, props.handleDelete]);

	if (quizRows.length === 0) {
		return <h2 className='empty-list-style'>{t("page.common.list.empty")}</h2>
	}

	return (
		<Container className="justify-content-md-center">
			{quizRows}
		</Container>
	);
}