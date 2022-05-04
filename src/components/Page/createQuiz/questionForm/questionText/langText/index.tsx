import React from 'react';
import { Props } from './types';
import './styles.scoped.css';
import { QuestionTextInput } from '../../../../../common/quiz/questionTextInput';

export const LangText: React.FC<Props> = (props: Props) => {	

	return (
		<>
			<QuestionTextInput label={props.labelEn} onChange={props.onChangeEn} />
			<QuestionTextInput label={props.labelHu} onChange={props.onChangeHu} />
		</>
	);
}