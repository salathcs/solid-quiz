import React, { useContext } from 'react';
import { Props } from './types';
import './styles.scoped.css';
import { FormBase } from '../../../../common/formBase';
import { BasicInput } from '../../../../common/formBase/basicInput';
import { TranslateContext } from '../../../../../contexts/TranslateContext';
import * as Yup from 'yup';

export const MultiLang: React.FC<Props> = (props: Props) => {
	const { t } = useContext(TranslateContext);

	const schema = Yup.object({
		quizTitleEn: Yup.string()
					 .required(t("page.common.required"))
					 .max(50, t("createQuiz.quiz.maxExceeded"))
					 .matches(/^([ 0-9a-zA-ZáéiíoóöőuúüűÁÉIÍOÓÖŐUÚÜŰ])*$/, t("page.common.alphanumeric")),
		quizTitleHu: Yup.string()
					 .required(t("page.common.required"))
					 .max(50, t("createQuiz.quiz.maxExceeded"))
					 .matches(/^([ 0-9a-zA-ZáéiíoóöőuúüűÁÉIÍOÓÖŐUÚÜŰ])*$/, t("page.common.alphanumeric")),
	});

	const initialValues = {
		quizTitleEn: "",
		quizTitleHu: ""
	};

	return (
		<FormBase onSubmit={props.onSubmit} schema={schema} initialValues={initialValues} submitLabel={t("createQuiz.quiz.submit")}>
				<BasicInput formikId="quizTitleEn" label={t("createQuiz.quiz.nameEn")} type='text' /> 
				<BasicInput formikId="quizTitleHu" label={t("createQuiz.quiz.nameHu")} type='text' /> 
		</FormBase>
	);
}