import React, { useContext } from 'react';
import { Props } from './types';
import './styles.scoped.css';
import { TranslateContext } from '../../../../../contexts/TranslateContext';
import { QuestionText } from './questionText';

export const QuestionTextLoader: React.FC<Props> = (props: Props) => {
	const { lang } = useContext(TranslateContext);

	const defaultValue = lang === 'hu' ? props.questionModel.textHu : props.questionModel.textEn;

	return (
		<>
			<QuestionText 
				multiLang={props.questionModel.multiLang} 
				onChange={props.onChange} 
				defaultValue={defaultValue}
				defaultValueEn={props.questionModel.textEn}
				defaultValueHu={props.questionModel.textHu} />
		</>
	);
}