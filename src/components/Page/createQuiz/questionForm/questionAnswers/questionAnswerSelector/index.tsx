import React, { useContext } from 'react';
import { Props } from './types';
import './styles.scoped.css';
import { LangQuestionAnswer } from './langQuestionAnswer';
import { TranslateContext } from '../../../../../../contexts/TranslateContext';
import { QuestionAnswer } from './questionAnswer';

export const QuestionAnswerSelector: React.FC<Props> = (props: Props) => {
	const { t, lang } = useContext(TranslateContext);

	const content = props.multiLang ? 
		<LangQuestionAnswer 
			answerId={props.answerId} 
			onCloseAnswer={props.onCloseAnswer} 
			labelEn={t("createQuiz.question.answerOptionEn")} 
			labelHu={t("createQuiz.question.answerOptionHu")} /> :
		<QuestionAnswer answerId={props.answerId} onCloseAnswer={props.onCloseAnswer} label={t("createQuiz.question.answerOption")} />

	return (
		<>
			{content}
		</>
	);
}