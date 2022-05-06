import React, { useContext, useEffect, useState } from 'react';
import { Props } from './types';
import './styles.scoped.css';
import { TranslateContext } from '../../../../../contexts/TranslateContext';
import { getString } from './../../../../../helpers/LangReader';
import { MULTI_LANGUAGE_SUPPORT, TITLE } from './../../../../../constants/SolidQuizMissingValues';
import { getBoolean } from '@inrupt/solid-client';
import { Col, Container, Row } from 'react-bootstrap';
import { ResultsListElement } from './resultsListElement';

export const ResultsList: React.FC<Props> = (props: Props) => {
	const { t, lang } = useContext(TranslateContext);	
	const [quizTitle, setQuizTitle] = useState("");
	const [elements, setElements] = useState<JSX.Element[]>([]);

	useEffect(() => {
		const multiLang = getBoolean(props.quizData.thing, MULTI_LANGUAGE_SUPPORT) ?? false;
		const loadedQuizTitle = getString(props.quizData.thing, TITLE, multiLang, lang);

		setQuizTitle(loadedQuizTitle);
		setElements(
			props.quizResultDatasets.map((datasetAndThing, indx) => 
				<ResultsListElement key={indx} orderId={indx} quizThing={props.quizData.thing} resultThing={datasetAndThing.thing} multiLang={multiLang} />)
		);
	}, [lang, props.quizData.thing, props.quizResultDatasets]);

	return (
		<Container>
			<h3 className='main-title'>{quizTitle} {t("leaderboard.quizResult.title")}</h3>

			<Row className='row-style'>
				<Col md="3">
					{t("leaderboard.quizResult.order")}
				</Col>
				<Col md="3">
					{t("leaderboard.quizResult.correctAnswers")}
				</Col>
				<Col md="3">
					{t("leaderboard.quizResult.createdBy")}
				</Col>
				<Col md="3">
					{t("leaderboard.quizResult.created")}
				</Col>
			</Row>

			{elements}
		</Container>
	);
}