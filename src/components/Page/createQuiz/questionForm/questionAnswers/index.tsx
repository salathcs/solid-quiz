import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Props } from './types';
import './styles.scoped.css';
import { Button, Col, Row } from 'react-bootstrap';
import { TranslateContext } from '../../../../../contexts/TranslateContext';
import { QuestionAnswerSelector } from './questionAnswerSelector';
import { QuestionCreationContext } from '../../../../../contexts/QuestionCreationContext';

export const QuestionAnswers: React.FC<Props> = (props: Props) => {
	const { t } = useContext(TranslateContext);
	const { questionNumber, answerNumber, setAnswerNumber, correctAnswerId } = useContext(QuestionCreationContext);
	const [answers, setAnswers] = useState<JSX.Element[]>([]);

	useEffect(() => {
		setAnswers([]);
	}, [questionNumber]);

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
				key={answerNumber.toString()} 
				answerId={answerNumber.toString()} 
				multiLang={props.multiLang} 
				onCloseAnswer={closeAnswer}
				onChange={props.onChange} />]);

		setAnswerNumber(act => act + 1);
	}

	return (
		<>
			<QuestionAnswerSelector 
				key={correctAnswerId.toString()} 
				answerId={correctAnswerId.toString()}
				multiLang={props.multiLang} 
				onChange={props.onChange} />, 
			<QuestionAnswerSelector 
				key={(correctAnswerId + 1).toString()} 
				answerId={(correctAnswerId + 1).toString()} 
				multiLang={props.multiLang} 
				onChange={props.onChange} />
			{answers}
			<Row>
				<Col>
					<Button variant="secondary" onClick={addAnswer}>{t("createQuiz.question.addAnswerOption")}</Button>
				</Col>
			</Row>
		</>
	);
}