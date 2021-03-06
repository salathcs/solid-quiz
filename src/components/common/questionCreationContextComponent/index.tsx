import React, { useState } from 'react';
import { Props } from './types';
import './styles.scoped.css';
import { defaultQuestionCreationState, QuestionCreationContext } from '../../../contexts/QuestionCreationContext';

export const QuestionCreationContextComponent: React.FC<Props> = (props: Props) => {
	const [questionNumber, setQuestionNumber] = useState(defaultQuestionCreationState.questionNumber);
	const [answerNumber, setAnswerNumber] = useState(defaultQuestionCreationState.answerNumber);

	const getQuizContainer = () => {
		return props.quizContainer;
	}

	const isCrurrentQuestionCreatedYet = () => {
		return props.quizContainer.questions.length < questionNumber;		//questionNumber is larger then the length, means its not inside it
	}

	const isNextQuestionNew = () => {
		return props.quizContainer.questions.length < (questionNumber + 1);		//questionNumber is larger then the length, means its not inside it
	}

	return (
		<QuestionCreationContext.Provider value={{
			questionNumber,
			setQuestionNumber,
			answerNumber,
			setAnswerNumber,

			getQuizContainer,
			isCrurrentQuestionCreatedYet,
			isNextQuestionNew
		}}>
			{props.children}
		</QuestionCreationContext.Provider>
	);
}