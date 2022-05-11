import React from 'react';
import { Props } from './types';
import './styles.scoped.css';
import { QuestionTextInput } from '../../../../../../common/quizModification/questionTextInput';

export const MonoText: React.FC<Props> = (props: Props) => {	

	return (
		<>
			<QuestionTextInput label={props.label} onChange={props.onChange} defaultValue={props.defaultValue} />
		</>
	);
}