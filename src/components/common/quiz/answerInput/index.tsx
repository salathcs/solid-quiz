import React, { useContext, useState, useEffect } from 'react';
import { Props } from './types';
import './styles.scoped.css';
import { FloatingLabel, Form } from 'react-bootstrap';
import { QuestionCreationContext } from '../../../../contexts/QuestionCreationContext';

export const AnswerInput: React.FC<Props> = (props: Props) => {
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
		<FloatingLabel
			controlId="floatingInput"
			label={props.label}
			className="mb-3"
			>
				<Form.Control type="text" placeholder={props.label} onChange={handleChange} value={actValue} />				
		</FloatingLabel>
	);
}