import React, { useContext } from 'react';
import { Props } from './types';
import './styles.scoped.css';
import { FormBase } from '../../../common/formBase';
import { BasicInput } from '../../../common/formBase/basicInput';
import { TranslateContext } from '../../../../contexts/TranslateContext';
import { FormikValues } from 'formik';
import * as Yup from 'yup';
import { Checkbox } from '../../../common/formBase/checkBox';
import { Col, Row } from 'react-bootstrap';

export const QuizForm: React.FC<Props> = (props: Props) => {
	const { t } = useContext(TranslateContext);

	const schema = Yup.object({
		quizTitle: Yup.string()
					 .required(t("page.common.required"))
					 .matches(/^([0-9a-zA-ZáéiíoóöőuúüűÁÉIÍOÓÖŐUÚÜŰ])*$/, t("page.common.alphanumeric")),
	});

	const initialValues = {
		quizTitle: "",
		multiLang: false
	};

	const onSubmit = (values: FormikValues) => {
		props.afterFormSubmit(
			{
				quizTitle: values.quizTitle, 
				multiLang: values.multiLang
			});
	}

	return (
			<FormBase onSubmit={onSubmit} schema={schema} initialValues={initialValues} submitLabel={t("createQuiz.quiz.submit")}>
				<BasicInput formikId="quizTitle" label={t("createQuiz.quiz.name")} type='text' />
				<Row className="justify-content-md-center">
					<Col md="3">
						<Checkbox formikId='multiLang' label={t("createQuiz.quiz.multiLang")} />
					</Col>
				</Row>
			</FormBase>
	);
}