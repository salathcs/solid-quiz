import React from 'react';
import { Props } from './types';
import './styles.scoped.css';
import { Form } from 'react-bootstrap';
import { useField } from 'formik';

export const Checkbox: React.FC<Props> = (props: Props) => {
	const [field, meta] = useField({ name: props.formikId, type: 'checkbox' });

	const handleChange = () => {
		if (props.onChange !== undefined) {
			props.onChange(!(field.checked ?? true));			//negated before its the prev val
		}
	  };

	return (
		<Form.Check 
			id={props.formikId} 
			{...field} 
			label={props.label} 
			feedback={meta.error} 
			feedbackType="invalid"
			isInvalid={!!meta.error}
			onClick={handleChange} />
	);
}