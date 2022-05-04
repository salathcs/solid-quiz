import React, { useCallback, useContext, useState } from 'react';
import { Props } from './types';
import './styles.scoped.css';
import { Button, Col, Row } from 'react-bootstrap';
import { TranslateContext } from '../../../../../contexts/TranslateContext';
import { QuestionAnswerSelector } from './questionAnswerSelector';
import { QuestionCreationContext } from '../../../../../contexts/QuestionCreationContext';

export const QuestionAnswers: React.FC<Props> = (props: Props) => {
	const { t } = useContext(TranslateContext);
	const { answerNumber, actAnswerNumber, setActAnswerNumber } = useContext(QuestionCreationContext);
	const [answers, setAnswers] = useState<JSX.Element[]>([]);

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
				key={actAnswerNumber.toString()} 
				answerId={actAnswerNumber.toString()} 
				multiLang={props.multiLang} 
				onCloseAnswer={closeAnswer}
				onChange={props.onChange} />]);

		setActAnswerNumber(act => act + 1);
	}

	return (
		<>
			<QuestionAnswerSelector 
				key={answerNumber.toString()} 
				answerId={answerNumber.toString()}
				multiLang={props.multiLang} 
				onChange={props.onChange} />, 
			<QuestionAnswerSelector 
				key={(answerNumber + 1).toString()} 
				answerId={(answerNumber + 1).toString()} 
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