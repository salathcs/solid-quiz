import React, { useContext, useEffect, useState } from 'react';
import { Props } from './types';
import './styles.scoped.css';
import { QuestionCreationContext } from '../../../../../contexts/QuestionCreationContext';
import * as questionService from '../../../../../services/QuestionService';
import { MultiLangText } from '../../../../../models/MultiLangText';
import { TranslateContext } from '../../../../../contexts/TranslateContext';
import { QuestionText } from './questionText';

export const QuestionTextLoader: React.FC<Props> = (props: Props) => {
	const { lang } = useContext(TranslateContext);
	const { questionNumber, isCrurrentQuestionCreatedYet, getQuizContainer } = useContext(QuestionCreationContext);
	const [defaultValue, setDefaultValue] = useState("");
	const [defaultValueEn, setDefaultValueEn] = useState("");
	const [defaultValueHu, setDefaultValueHu] = useState("");
	
	useEffect(() => {
		if (isCrurrentQuestionCreatedYet()) {
			setDefaultValue("");
			setDefaultValueEn("");
			setDefaultValueHu("");
		}
		else{
			const data = questionService.getQuestionText(getQuizContainer(), questionNumber); 
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
	}, [questionNumber, isCrurrentQuestionCreatedYet, getQuizContainer, lang, props.multiLang]);

	return (
		<>
			<QuestionText 
				multiLang={props.multiLang} 
				onChange={props.onChange} 
				defaultValue={defaultValue}
				defaultValueEn={defaultValueEn}
				defaultValueHu={defaultValueHu} />
		</>
	);
}