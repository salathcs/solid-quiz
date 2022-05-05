import React, { useState } from 'react';
import { Props } from './types';
import './styles.scoped.css';
import { defaultQuestionCreationState, QuestionCreationContext } from '../../../contexts/QuestionCreationContext';

export const QuestionCreationContextComponent: React.FC<Props> = (props: Props) => {
	const [questionNumber, setQuestionNumber] = useState(defaultQuestionCreationState.questionNumber);
	const [answerNumber, setAnswerNumber] = useState(defaultQuestionCreationState.answerNumber);
	const [correctAnswerId, setCorrectAnswerId] = useState(defaultQuestionCreationState.correctAnswerId);

	return (
		<QuestionCreationContext.Provider value={{
			questionNumber,
			setQuestionNumber,
			answerNumber,
			setAnswerNumber,
			correctAnswerId,
			setCorrectAnswerId
		}}>
			{props.children}
		</QuestionCreationContext.Provider>
	);
}