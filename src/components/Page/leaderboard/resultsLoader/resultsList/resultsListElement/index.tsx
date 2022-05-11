import React, { useContext, useEffect, useState } from 'react';
import { Props } from './types';
import './styles.scoped.css';
import { Col, Row } from 'react-bootstrap';
import { getDatetime, getInteger } from '@inrupt/solid-client';
import { NUMBER_OF_CORRECT_ANSWERS, QUIZ_RESULT_CREATED } from '../../../../../../constants/SolidQuizMissingValues';
import { TranslateContext } from '../../../../../../contexts/TranslateContext';
import { getUrl } from '@inrupt/solid-client';
import SOLIDQUIZ from './../../../../../../helpers/SOLIDQUIZ';
import { LinkWithTooltip } from '../../../../../common/linkWithTooltip';

export const ResultsListElement: React.FC<Props> = (props: Props) => {
	const { lang } = useContext(TranslateContext);	
	const [correctAnswers, setCorrectAnswers] = useState("");
	const [createdBy, setCreatedBy] = useState("");
	const [created, setCreated] = useState("");

	useEffect(() => {
		const actCorrectAnswers = getInteger(props.resultThing, NUMBER_OF_CORRECT_ANSWERS) ?? 0;
		const actCreatedBy = getUrl(props.resultThing, SOLIDQUIZ.quizResultCreatedBy.value) ?? "error";
		const actCreated = getDatetime(props.resultThing, QUIZ_RESULT_CREATED) ?? "error";

		setCorrectAnswers(actCorrectAnswers.toString());
		setCreatedBy(actCreatedBy);
		setCreated(actCreated.toLocaleString(lang));
	}, [props.resultThing, lang]);

	return (
		<Row className='row-style'>
			<Col md="3">
				<p>{props.orderId + 1}</p>
			</Col>
			<Col md="3">				
				<p>{correctAnswers}</p>
			</Col>
			<Col md="3">
				<LinkWithTooltip href={createdBy} tooltipText={createdBy} />
			</Col>
			<Col md="3">
				<p>{created}</p>				
			</Col>
		</Row>
	);
}