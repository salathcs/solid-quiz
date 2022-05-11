import React, { useContext, useState } from 'react';
import { Props } from './types';
import './styles.scoped.css';
import { TranslateContext } from '../../../../contexts/TranslateContext';
import { FormikValues } from 'formik';
import { Col, Form, Row } from 'react-bootstrap';
import { MultiLang } from './multiLang';
import { MonoLang } from './monoLang';

export const QuizForm: React.FC<Props> = (props: Props) => {
	const { t, lang } = useContext(TranslateContext);
	const [isMultiLang, setIsMultiLang] = useState(false);

	const onSubmit = (values: FormikValues) => {
		props.afterFormSubmit(
			{
				quizTitleEn: values.quizTitleEn ?? "", 
				quizTitleHu: values.quizTitleHu ?? "", 
				multiLang: isMultiLang,
				lang
			});
	};

	const handleLangChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setIsMultiLang(!!event.target.checked);
	};

	const formContent = isMultiLang ? 
		<MultiLang onSubmit={onSubmit} /> :
		<MonoLang onSubmit={onSubmit} />;

	return (
		<>
			<h3 className='main-title'>{t("createQuiz.quiz.title")}</h3>
			<Row className="justify-content-md-center checkbox-row">
				<Col md="3">				
					<Form.Check id="quizFormCheckbox" label={t("createQuiz.quiz.multiLang")} checked={isMultiLang} onChange={handleLangChange} />
				</Col>
			</Row>
			{formContent}
		</>
	);
}