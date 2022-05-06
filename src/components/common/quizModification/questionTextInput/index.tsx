import React, { useContext, useEffect, useState } from 'react';
import { Props } from './types';
import './styles.scoped.css';
import { FloatingLabel, Form } from 'react-bootstrap';
import { QuestionCreationContext } from '../../../../contexts/QuestionCreationContext';

export const QuestionTextInput: React.FC<Props> = ({ label, defaultValue, onChange}) => {
	const [actValue, setActValue] = useState(defaultValue);
	const { questionNumber } = useContext(QuestionCreationContext);

	useEffect(() => {
		setActValue(defaultValue);
	}, [defaultValue, questionNumber]);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setActValue(event.target.value);
		onChange(event.target.value);
	}

	return (
		<FloatingLabel controlId="floatingTextarea" label={label} className="mb-3">
			<Form.Control as="textarea"	placeholder={label} className='textarea-style' onChange={handleChange} value={actValue} />
		</FloatingLabel>
	);
}