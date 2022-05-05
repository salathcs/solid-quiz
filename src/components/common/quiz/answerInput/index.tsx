import React, { useContext, useState, useEffect } from 'react';
import { Props } from './types';
import './styles.scoped.css';
import { FloatingLabel, Form } from 'react-bootstrap';
import { QuestionCreationContext } from '../../../../contexts/QuestionCreationContext';

export const AnswerInput: React.FC<Props> = ({ label, defaultValue, onChange}) => {
	const [actValue, setActValue] = useState(defaultValue);
	const { questionNumber } = useContext(QuestionCreationContext);

	useEffect(() => {
		setActValue(defaultValue);
		onChange(defaultValue);
	}, [defaultValue, questionNumber, onChange]);
	
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setActValue(event.target.value);
		onChange(event.target.value);
	}

	return (
		<FloatingLabel
			controlId="floatingInput"
			label={label}
			className="mb-3"
			>
				<Form.Control type="text" placeholder={label} onChange={handleChange} value={actValue} />				
		</FloatingLabel>
	);
}