import React from 'react';
import { Props } from './types';
import './styles.scoped.css';
import { QuestionTextInput } from '../../../../../common/quiz/questionTextInput';

export const LangText: React.FC<Props> = (props: Props) => {	

	return (
		<>
			<QuestionTextInput label={props.labelEn} onChange={props.onChangeEn} defaultValue={props.defaultValueEn} />
			<QuestionTextInput label={props.labelHu} onChange={props.onChangeHu} defaultValue={props.defaultValueHu} />
		</>
	);
}