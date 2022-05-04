import React, { useContext, useEffect, useState } from 'react';
import { Props } from './types';
import './styles.scoped.css';
import { FloatingLabel, Form } from 'react-bootstrap';
import { QuestionCreationContext } from '../../../../contexts/QuestionCreationContext';

export const QuestionTextInput: React.FC<Props> = (props: Props) => {
	const [actValue, setActValue] = useState(props.defaultValue);
	const { questionNumber } = useContext(QuestionCreationContext);

	useEffect(() => {
		setActValue(props.defaultValue);
	}, [props.defaultValue, questionNumber]);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setActValue(event.target.value);
		props.onChange(event.target.value);
	}

	return (
		<FloatingLabel controlId="floatingTextarea" label={props.label} className="mb-3">
			<Form.Control as="textarea"	placeholder={props.label} className='textarea-style' onChange={handleChange} value={actValue} />
		</FloatingLabel>
	);
}