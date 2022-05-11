import React, { useContext } from 'react';
import { Props } from './types';
import './styles.scoped.css';
import { TranslateContext } from '../../../../../contexts/TranslateContext';
import * as Yup from 'yup';
import { FormBase } from '../../../../common/formBase';
import { BasicInput } from '../../../../common/formBase/basicInput';
import { FormikValues } from 'formik';

export const MonoLang: React.FC<Props> = (props: Props) => {
	const { t, lang } = useContext(TranslateContext);

	const schema = Yup.object({
		quizTitle: Yup.string()
					 .required(t("page.common.required"))
					 .max(50, t("createQuiz.quiz.maxExceeded"))
					 .matches(/^([ 0-9a-zA-ZáéiíoóöőuúüűÁÉIÍOÓÖŐUÚÜŰ])*$/, t("page.common.alphanumeric")),
	});

	const initialValues = {
		quizTitle: ""
	};

	const handleOnSubmit = (values: FormikValues) => {
		let langValues: FormikValues;

		if (lang === 'hu') {
			langValues = {'quizTitleHu': values.quizTitle};
		}
		else{
			langValues = {'quizTitleEn': values.quizTitle};
		}

		props.onSubmit(langValues);
	}

	const label = lang === 'hu' ? t("createQuiz.quiz.nameHu") : t("createQuiz.quiz.nameEn");

	return (
		<FormBase onSubmit={handleOnSubmit} schema={schema} initialValues={initialValues} submitLabel={t("createQuiz.quiz.submit")}>
				<BasicInput formikId="quizTitle" label={label} type='text' /> 
		</FormBase>
	);
}