import React from 'react';
import { Props } from './types';
import './styles.scoped.css';
import { FloatingLabel, Form } from 'react-bootstrap';
import { useField } from 'formik';

export const BasicInput: React.FC<Props> = (props: Props) => {
	const [field, meta] = useField(props.formikId);

   	return (
	 	<FloatingLabel
			controlId="floatingInput"
			label={props.label}
			className="mb-3 basic-input-style"
		>
			<Form.Control type={props.type} placeholder={props.label} {...field} isInvalid={!!meta.error} />
			<Form.Control.Feedback type="invalid">{meta.error}</Form.Control.Feedback>
		</FloatingLabel>
   	);
}