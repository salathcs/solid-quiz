import React from 'react';
import { Props } from './types';
import './styles.scoped.css';
import { Button } from 'react-bootstrap';
import { Formik, Form } from 'formik';

export const FormBase: React.FC<Props> = (props: Props) => {

	return (
		<Formik
			validationSchema={props.schema}
			onSubmit={props.onSubmit}
			initialValues={props.initialValues}
		>
			<Form>
				{props.children}
				<Button type="submit" className='submit-btn'>{props.submitLabel}</Button>
			</Form>
		</Formik>
	);
}