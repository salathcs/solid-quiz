import React, { useState } from 'react';
import { Props } from './types';
import './styles.scoped.css';
import { defaultQuestionCreationState, QuestionCreationContext } from '../../../contexts/QuestionCreationContext';

export const QuestionCreationContextComponent: React.FC<Props> = (props: Props) => {
	const [questionNumber, setQuestionNumber] = useState(defaultQuestionCreationState.questionNumber);
	const [answerNumber, setAnswerNumber] = useState(defaultQuestionCreationState.questionNumber);
	const [actAnswerNumber, setActAnswerNumber] = useState(defaultQuestionCreationState.questionNumber);
	const [correctAnswerId, setCorrectAnswerId] = useState(defaultQuestionCreationState.questionNumber);

	return (
		<QuestionCreationContext.Provider value={{
			questionNumber,
			setQuestionNumber,
			answerNumber,
			setAnswerNumber,
			actAnswerNumber,
			setActAnswerNumber,
			correctAnswerId,
			setCorrectAnswerId
		}}>
			{props.children}
		</QuestionCreationContext.Provider>
	);
}