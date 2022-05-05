import React, { useContext, useEffect, useState } from 'react';
import { Props } from './types';
import './styles.scoped.css';
import { QuestionCreationContext } from '../../../../../../contexts/QuestionCreationContext';
import * as questionService from '../../../../../../services/QuestionService';
import { MultiLangText } from '../../../../../../models/MultiLangText';
import { TranslateContext } from '../../../../../../contexts/TranslateContext';
import { QuestionAnswerSelector } from './questionAnswerSelector';

export const QuestionAnswerLoader: React.FC<Props> = (props: Props) => {
	const { lang } = useContext(TranslateContext);
	const { questionNumber, isCrurrentQuestionCreatedYet, getQuizContainer } = useContext(QuestionCreationContext);
	const [defaultValue, setDefaultValue] = useState("");
	const [defaultValueEn, setDefaultValueEn] = useState("");
	const [defaultValueHu, setDefaultValueHu] = useState("");
	
	useEffect(() => {
		if (isCrurrentQuestionCreatedYet() || !questionService.isAnswerExists(props.answerId, questionNumber, getQuizContainer())) {
			setDefaultValue("");
			setDefaultValueEn("");
			setDefaultValueHu("");
		}
		else{
			const data = questionService.getAnswerText(getQuizContainer(), questionNumber, props.answerId); 
			((data: MultiLangText) => {
				if (props.multiLang) {
					setDefaultValueEn(data.textEn);
					setDefaultValueHu(data.textHu);
				}
				else{
					const text = lang === 'hu' ? data.textHu : data.textEn;
		
					setDefaultValue(text);
				}
			})(data);
		}
	}, [questionNumber, isCrurrentQuestionCreatedYet, getQuizContainer, lang, props.multiLang, props.answerId]);

	return (
		<>
			<QuestionAnswerSelector 
				key={props.answerId} 
				answerId={props.answerId}
				multiLang={props.multiLang} 
				onChange={props.onChange}
				defaultValue={defaultValue}
				defaultValueEn={defaultValueEn}
				defaultValueHu={defaultValueHu} />, 
		</>
	);
}