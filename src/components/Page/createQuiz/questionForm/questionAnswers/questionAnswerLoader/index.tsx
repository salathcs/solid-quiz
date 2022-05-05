import React, { useContext } from 'react';
import { Props } from './types';
import './styles.scoped.css';
import { TranslateContext } from '../../../../../../contexts/TranslateContext';
import { QuestionAnswerSelector } from './questionAnswerSelector';

export const QuestionAnswerLoader: React.FC<Props> = (props: Props) => {
	const { lang } = useContext(TranslateContext);

	const defaultValue = lang === 'hu' ? props.multiLangText.textHu : props.multiLangText.textEn;

	return (
		<>
			<QuestionAnswerSelector 
				key={props.answerId} 
				answerId={props.answerId}
				correctAnswerId={props.correctAnswerId}
				multiLang={props.multiLang} 
				onChange={props.onChange}
				onCloseAnswer={props.onCloseAnswer}
				defaultValue={defaultValue}
				defaultValueEn={props.multiLangText.textEn}
				defaultValueHu={props.multiLangText.textHu} />
		</>
	);
}