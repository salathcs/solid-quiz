import React, { useState } from 'react';
import { Props } from './types';
import './styles.scoped.css';
import { defaultQuestionCreationState, QuestionCreationContext } from '../../../contexts/QuestionCreationContext';

export const QuestionCreationContextComponent: React.FC<Props> = (props: Props) => {
	const [questionNumber, setQuestionNumber] = useState(defaultQuestionCreationState.questionNumber);

	const increaseQuestionNumber = () => {
		setQuestionNumber(actNumber => actNumber + 1);
	}

	return (
		<QuestionCreationContext.Provider value={{
			questionNumber,
			increaseQuestionNumber
		}}>
			{props.children}
		</QuestionCreationContext.Provider>
	);
}