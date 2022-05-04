import React from 'react';
import { Props } from './types';
import './styles.scoped.css';
import { FloatingLabel, Form } from 'react-bootstrap';

export const QuestionTextInput: React.FC<Props> = (props: Props) => {
	
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		props.onChange(event.target.value);
	}

	return (
		<FloatingLabel controlId="floatingTextarea" label={props.label} className="mb-3">
			<Form.Control as="textarea"	placeholder={props.label} className='textarea-style' onChange={handleChange} />
		</FloatingLabel>
	);
}