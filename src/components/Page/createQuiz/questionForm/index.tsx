import React, { useContext, useState } from 'react';
import { Props } from './types';
import './styles.scoped.css';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { QuestionText } from './questionText';
import { TranslateContext } from '../../../../contexts/TranslateContext';
import { QuestionAnswers } from './questionAnswers';
import { QuestionCreateModel } from '../../../../models/QuestionCreateModel';

export const QuestionForm: React.FC<Props> = (props: Props) => {
	const { t } = useContext(TranslateContext);
	const [questionModel, setQuestionModel] = useState<QuestionCreateModel>(
			{textEn: "", textHu: "", answerOptions: [] }
		);

	return (
		<Container className="justify-content-md-center">
			<h3 className='main-title'>1. {t("createQuiz.question.title")}</h3>

			<QuestionText multiLang={props.multiLang} onChange={setQuestionModel} />
			<QuestionAnswers multiLang={props.multiLang} />

			<Row className='question-btn-row'>
				<Col>
					<Button variant="secondary" size='lg' className='question-btn'>{t("createQuiz.question.prevQuestion")}</Button>
				</Col>
				<Col>
					<Button variant="secondary" size='lg' className='question-btn'>{t("createQuiz.question.nextQuestion")}</Button>
				</Col>
			</Row>
			<Row className='finish-btn-row'>
				<Col>
					<Button variant="success" size='lg'>{t("createQuiz.question.finishQuiz")}</Button>
				</Col>
			</Row>
		</Container>
	);
}