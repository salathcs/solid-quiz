import React, { useContext, useEffect, useState } from 'react';
import { Props } from './types';
import './styles.scoped.css';
import { Alert, Button, Row } from 'react-bootstrap';
import { getInteger } from '@inrupt/solid-client';
import { TITLE, NUMBER_OF_CORRECT_ANSWERS } from '../../../../../../constants/SolidQuizMissingValues';
import { TranslateContext } from '../../../../../../contexts/TranslateContext';
import { PageSwitcherContext } from '../../../../../../contexts/PageSwitcherContext';
import { getString } from './../../../../../../helpers/LangReader';
import { ShareGameResult } from './shareGameResult';

export const GameResult: React.FC<Props> = (props: Props) => {
	const { t, lang } = useContext(TranslateContext);
	const { GoBack } = useContext(PageSwitcherContext);
	const [quizTitle, setQuizTitle] = useState("");
	const [answersSucceded, setAnswersSucceded] = useState(0);

	useEffect(() => {
		const actualQuizTitle = getString(props.quizThing, TITLE, props.gameResult.gameStatus.multiLang, lang);
		const actualAnswersSucceded = getInteger(props.gameResult.gameStatus.quizResultThing, NUMBER_OF_CORRECT_ANSWERS) ?? -1;

		setQuizTitle(actualQuizTitle);
		setAnswersSucceded(actualAnswersSucceded);
	}, [props.gameResult, lang, props.quizThing]);

	return (
		<>
			<h3 className='main-title'>{quizTitle} {t("playGame.gameResult.title")}</h3>

			<Row>
				<Alert variant='success' className='quizOverText-style'>{t("playGame.gameResult.quizOverText")}</Alert>
			</Row>
			<Row>
				<Alert variant='info' className='quizResults-style'>
					{t("playGame.gameResult.quizResultsAll")}: {props.gameResult.gameStatus.allQuestions} 
					<br />
					{t("playGame.gameResult.quizResultsSuccess")}: {answersSucceded}</Alert>
			</Row>

			<ShareGameResult quizResultData={props.gameResult.savedQuizResultData} />

			<Button variant='light' className='back-btn' onClick={() => GoBack()}>{t("page.common.back")}</Button>
		</>
	);
}