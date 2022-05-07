import React, { useContext, useEffect, useState } from 'react';
import { Props } from './types';
import './styles.scoped.css';
import { Button, Row } from 'react-bootstrap';
import { TranslateContext } from '../../../../contexts/TranslateContext';
import { PageSwitcherContext } from '../../../../contexts/PageSwitcherContext';
import { getString } from './../../../../helpers/LangReader';
import { getBoolean, getInteger } from '@inrupt/solid-client';
import { TITLE, MULTI_LANGUAGE_SUPPORT, NUMBER_OF_QUESTIONS } from './../../../../constants/SolidQuizMissingValues';

export const CreationResult: React.FC<Props> = (props: Props) => {
	const { t, lang } = useContext(TranslateContext);	
	const { GoBack } = useContext(PageSwitcherContext);
	const [title, setTitle] = useState("");
	const [questionNumber, setQuestionNumber] = useState("");

	useEffect(() => {
		const multiLang = getBoolean(props.quizThing, MULTI_LANGUAGE_SUPPORT) ?? false;
		const actTitle = getString(props.quizThing, TITLE, multiLang, lang);
		const actQuestionNumber = getInteger(props.quizThing, NUMBER_OF_QUESTIONS) ?? -1;

		setTitle(actTitle);
		setQuestionNumber(actQuestionNumber.toString());
	}, [props.quizThing, lang]);

	return (
		<>
			<h3 className='main-title'>{t("createQuiz.result.title")}</h3>

			<Row>
				<p>{t("createQuiz.result.quizTitle")} {title}</p>
			</Row>
			<Row>
				<p>{t("createQuiz.result.quizQuestionNumber")} {questionNumber}</p>
			</Row>

			<Button variant='light' className='back-btn' onClick={() => GoBack()}>{t("page.common.back")}</Button>
		</>
	);
}