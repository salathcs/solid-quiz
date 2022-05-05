import React, { useContext, useCallback } from 'react';
import { Props } from './types';
import './styles.scoped.css';
import { LangQuestionAnswer } from './langQuestionAnswer';
import { TranslateContext } from '../../../../../../../contexts/TranslateContext';
import { QuestionAnswer } from './questionAnswer';
import * as answerArrayHelper from '../../../../../../../helpers/AnswerArrayHelper';

export const QuestionAnswerSelector: React.FC<Props> = ({ multiLang, onChange, answerId, onCloseAnswer, defaultValue, defaultValueEn, defaultValueHu }) => {
	const { t, lang } = useContext(TranslateContext);

	const handleChange = useCallback((value: string) => {
		onChange((model) => {
			let rv = {
				...model
			};

			const answerResult = answerArrayHelper.getOCreateAnswerInArray(rv.answerOptions, answerId);

			if (lang === 'hu'){
				answerResult.textHu = value;
			}
			else{
				answerResult.textEn = value;
			}

			return rv;
		});
	}, [lang, onChange, answerId]);

	const handleChangeEn = useCallback((value: string) => {
		onChange((model) => {
			let rv = {
				...model
			};

			const answerResult = answerArrayHelper.getOCreateAnswerInArray(rv.answerOptions, answerId);

			answerResult.textEn = value;

			return rv;
		});
	}, [onChange, answerId]);

	const handleChangeHu = useCallback((value: string) => {
		onChange((model) => {
			let rv = {
				...model
			};

			const answerResult = answerArrayHelper.getOCreateAnswerInArray(rv.answerOptions, answerId);

			answerResult.textHu = value;

			return rv;
		});
	}, [onChange, answerId]);

	const content = multiLang ? 
		<LangQuestionAnswer 
			answerId={answerId} 
			onCloseAnswer={onCloseAnswer} 
			labelEn={t("createQuiz.question.answerOptionEn")} 
			labelHu={t("createQuiz.question.answerOptionHu")}
			defaultValueEn={defaultValueEn}
			defaultValueHu={defaultValueHu}
			onChangeEn={handleChangeEn}
			onChangeHu={handleChangeHu} /> :
		<QuestionAnswer 
			answerId={answerId} 
			onCloseAnswer={onCloseAnswer} 
			label={t("createQuiz.question.answerOption")}
			onChange={handleChange}
			defaultValue={defaultValue} />

	return (
		<>
			{content}
		</>
	);
}