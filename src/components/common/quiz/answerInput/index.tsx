import React from 'react';
import { Props } from './types';
import './styles.scoped.css';
import { FloatingLabel, Form } from 'react-bootstrap';

export const AnswerInput: React.FC<Props> = (props: Props) => {
	

	return (
		<FloatingLabel
			controlId="floatingInput"
			label={props.label}
			className="mb-3"
			>
				<Form.Control type="text" placeholder={props.label} />				
		</FloatingLabel>
	);
}