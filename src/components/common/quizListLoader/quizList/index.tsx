import React, { useEffect, useState, useContext } from 'react';
import { Props } from './types';
import './styles.scoped.css';
import { QuizBtn } from './quizBtn';
import { getQuizzesFromDatasets } from '../../../../helpers/QuizListHelper';
import { TranslateContext } from '../../../../contexts/TranslateContext';

export const QuizList: React.FC<Props> = (props: Props) => {
	const { t } = useContext(TranslateContext);	
	const [quizBtns, setQuizBtns] = useState<JSX.Element[]>([]);
	
	useEffect(() => {
		const quizData = getQuizzesFromDatasets(props.quizDatasets);

		setQuizBtns(
			quizData.map((datasetAndThing, indx) => 
				<QuizBtn key={indx} datasetAndThing={datasetAndThing} onQuizSelected={props.onQuizSelected} />)
		);
	}, [props.quizDatasets, props.onQuizSelected]);

	if (quizBtns.length === 0) {
		return <h2 className='empty-list-style'>{t("page.common.list.empty")}</h2>
	}

	return (
		<div className='d-grid gap-3'>
			{quizBtns}
		</div>
	);
}