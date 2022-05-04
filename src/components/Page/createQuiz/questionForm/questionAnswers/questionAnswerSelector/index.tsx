import React, { useContext, useState } from 'react';
import { Props } from './types';
import './styles.scoped.css';
import { LangQuestionAnswer } from './langQuestionAnswer';
import { TranslateContext } from '../../../../../../contexts/TranslateContext';
import { QuestionAnswer } from './questionAnswer';
import * as answerArrayHelper from '../../../../../../helpers/AnswerArrayHelper';

export const QuestionAnswerSelector: React.FC<Props> = (props: Props) => {
	const { t, lang } = useContext(TranslateContext);
	const [defaultValue] = useState("");

	const handleChange = (value: string) => {
		props.onChange((model) => {
			let rv = {
				...model
			};

			const answerResult = answerArrayHelper.getOCreateAnswerInArray(rv.answerOptions, props.answerId);

			if (lang === 'hu'){
				answerResult.textHu = value;
			}
			else{
				answerResult.textEn = value;
			}

			return rv;
		});
	};

	const handleChangeEn = (value: string) => {
		props.onChange((model) => {
			let rv = {
				...model
			};

			const answerResult = answerArrayHelper.getOCreateAnswerInArray(rv.answerOptions, props.answerId);

			answerResult.textEn = value;

			return rv;
		});
	};

	const handleChangeHu = (value: string) => {
		props.onChange((model) => {
			let rv = {
				...model
			};

			const answerResult = answerArrayHelper.getOCreateAnswerInArray(rv.answerOptions, props.answerId);

			answerResult.textHu = value;

			return rv;
		});
	};

	const content = props.multiLang ? 
		<LangQuestionAnswer 
			answerId={props.answerId} 
			onCloseAnswer={props.onCloseAnswer} 
			labelEn={t("createQuiz.question.answerOptionEn")} 
			labelHu={t("createQuiz.question.answerOptionHu")}
			defaultValueEn={defaultValue}
			defaultValueHu={defaultValue}
			onChangeEn={handleChangeEn}
			onChangeHu={handleChangeHu} /> :
		<QuestionAnswer 
			answerId={props.answerId} 
			onCloseAnswer={props.onCloseAnswer} 
			label={t("createQuiz.question.answerOption")}
			onChange={handleChange}
			defaultValue={defaultValue} />

	return (
		<>
			{content}
		</>
	);
}