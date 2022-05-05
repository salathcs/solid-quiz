import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Props } from './types';
import './styles.scoped.css';
import { Button, Col, Row } from 'react-bootstrap';
import { TranslateContext } from '../../../../../contexts/TranslateContext';
import { QuestionAnswerLoader } from './questionAnswerLoader';
import { QuestionCreationContext } from '../../../../../contexts/QuestionCreationContext';
import { AnswerCreateModel } from '../../../../../models/AnswerCreateModel';

export const QuestionAnswers: React.FC<Props> = ({ questionModel, onChange }) => {
	const { t } = useContext(TranslateContext);
	const { questionNumber, answerNumber, setAnswerNumber } = useContext(QuestionCreationContext);
	const [answers, setAnswers] = useState<JSX.Element[]>([]);

	const closeAnswer = useCallback((answerId: string) => {
		onChange(model => {
			let rv = { ...model };

			const toClose = rv.answerOptions.find((item) => item.answerId === answerId);

			if (toClose === undefined) { 
				return rv;			//deref important! never return arr directly
			}

			const toCloseIndex = rv.answerOptions.indexOf(toClose); 
			rv.answerOptions = rv.answerOptions.splice(toCloseIndex, 1);

			return rv;
		})
	}, [onChange]);

	const addAnswer = useCallback(() => {
		onChange(model => {
			let rv = { ...model };

			rv.answerOptions = [...rv.answerOptions, { 
				answerId: answerNumber.toString(),
				textEn: "",
				textHu: ""
			 }]

			return rv;
		});
		
		setAnswerNumber(act => act + 1);
	}, [answerNumber, onChange, setAnswerNumber]);

	const isCloseDisabled = useCallback((answerOption: AnswerCreateModel) => {
		return answerOption.answerId === questionModel.correctAnswerId ||
			   (+(answerOption.answerId) - 1).toString() === questionModel.correctAnswerId;
	}, [questionModel.correctAnswerId]);

	useEffect(() => {
		setAnswers(
			questionModel.answerOptions.map((answerOption) => 
				<QuestionAnswerLoader 
					key={answerOption.answerId} 
					answerId={answerOption.answerId}
					correctAnswerId={questionModel.correctAnswerId}
					multiLang={questionModel.multiLang} 
					onChange={onChange}
					onCloseAnswer={isCloseDisabled(answerOption) ? undefined : closeAnswer}
					multiLangText={{ textEn: answerOption.textEn, textHu: answerOption.textHu }} />)
		);
	}, [questionNumber, closeAnswer, addAnswer, isCloseDisabled, onChange, questionModel.answerOptions, questionModel.multiLang, questionModel.correctAnswerId]);

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