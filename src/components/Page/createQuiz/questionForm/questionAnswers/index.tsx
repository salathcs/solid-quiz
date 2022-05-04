import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Props } from './types';
import './styles.scoped.css';
import { Button, Col, Row } from 'react-bootstrap';
import { TranslateContext } from '../../../../../contexts/TranslateContext';
import { QuestionAnswerSelector } from './questionAnswerSelector';
import { QuestionCreationContext } from '../../../../../contexts/QuestionCreationContext';

export const QuestionAnswers: React.FC<Props> = (props: Props) => {
	const { t } = useContext(TranslateContext);
	const { questionNumber } = useContext(QuestionCreationContext);
	const [answers, setAnswers] = useState<JSX.Element[]>([]);
	const [idCounter, setIdCounter] = useState(2);

	useEffect(() => {
		setAnswers([
			<QuestionAnswerSelector key="0" answerId="0" multiLang={props.multiLang} onChange={props.onChange} />, 
			<QuestionAnswerSelector key="1" answerId="1" multiLang={props.multiLang} onChange={props.onChange} />
		]);
	}, [questionNumber, props.multiLang, props.onChange]); 

	const closeAnswer = useCallback((answerId: string) => {
		setAnswers(arr => {
			const toClose = arr.find((item) => item.props.answerId === answerId);

			if (toClose === undefined) { 
				return [...arr];			//deref important! never return arr directly
			}

			const toCloseIndex = arr.indexOf(toClose); 

			return arr.splice(toCloseIndex, 1);
		}
	)}, []);

	const addAnswer = () => {
		setAnswers(arr => [...arr, 
			<QuestionAnswerSelector 
				key={idCounter.toString()} 
				answerId={idCounter.toString()} 
				multiLang={props.multiLang} 
				onCloseAnswer={closeAnswer}
				onChange={props.onChange} />]);
		setIdCounter(idCounter + 1);
	}

	return (
		<>
			{answers}
			<Row>
				<Col>
					<Button variant="secondary" onClick={addAnswer}>{t("createQuiz.question.addAnswerOption")}</Button>
				</Col>
			</Row>
		</>
	);
}