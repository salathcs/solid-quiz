import React, { useContext, useEffect, useState } from 'react';
import { Props } from './types';
import './styles.scoped.css';
import { Button, Row } from 'react-bootstrap';
import { TranslateContext } from '../../../../contexts/TranslateContext';
import { PageSwitcherContext } from '../../../../contexts/PageSwitcherContext';
import { getString } from './../../../../helpers/LangReader';
import { getBoolean, getInteger } from '@inrupt/solid-client';
import { TITLE, MULTI_LANGUAGE_SUPPORT, NUMBER_OF_QUESTIONS } from './../../../../constants/SolidQuizMissingValues';
import { QuizShare } from '../../../common/quizShare';

export const CreationResult: React.FC<Props> = (props: Props) => {
	const { t, lang } = useContext(TranslateContext);	
	const { GoBack } = useContext(PageSwitcherContext);
	const [title, setTitle] = useState("");
	const [questionNumber, setQuestionNumber] = useState("");

	useEffect(() => {
		const multiLang = getBoolean(props.quizData.thing, MULTI_LANGUAGE_SUPPORT) ?? false;
		const actTitle = getString(props.quizData.thing, TITLE, multiLang, lang);
		const actQuestionNumber = getInteger(props.quizData.thing, NUMBER_OF_QUESTIONS) ?? -1;

		setTitle(actTitle);
		setQuestionNumber(actQuestionNumber.toString());
	}, [props.quizData.thing, lang]);

	return (
		<>
			<h3 className='main-title'>{props.isModify ? t("createQuiz.result.modifyTitle") : t("createQuiz.result.title")}</h3>

			<Row>
				<p className='quizTitle-text'>{t("createQuiz.result.quizTitle")} {title}</p>
			</Row>
			<Row>
				<p className='questionNumber-text'>{t("createQuiz.result.questionNumber")} {questionNumber}</p>
			</Row>
			<Row>
				<p className='sharing-text'>{t("createQuiz.result.share")}</p>
			</Row>
			<Row>				
				<QuizShare datasetAndThing={props.quizData} />
			</Row>

			<Button variant='light' className='back-btn' onClick={() => GoBack()}>{t("page.common.back")}</Button>
		</>
	);
}