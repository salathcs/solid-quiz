import React, { useContext, useEffect, useState } from 'react';
import { Props } from './types';
import './styles.scoped.css';
import { Alert, Button, Col, Container, Row } from 'react-bootstrap';
import { QuestionText } from './questionText';
import { TranslateContext } from '../../../../contexts/TranslateContext';
import { QuestionAnswers } from './questionAnswers';
import { QuestionCreateModel } from '../../../../models/QuestionCreateModel';
import * as questionCreateModelValidator from '../../../../helpers/QuestionCreateModelValidator'
import { QuestionCreationContext } from '../../../../contexts/QuestionCreationContext';

export const QuestionForm: React.FC<Props> = (props: Props) => {
	const { t, lang } = useContext(TranslateContext);
	const { questionNumber, increaseQuestionNumber } = useContext(QuestionCreationContext);
	const [questionModel, setQuestionModel] = useState<QuestionCreateModel>(
			{ questionNumber: questionNumber, textEn: "", textHu: "", answerOptions: [], multiLang: props.multiLang, lang }
		);
	const [alert, setAlert] = useState<string | null>(null);

	useEffect(() => {
		setQuestionModel(
			{ questionNumber: questionNumber, textEn: "", textHu: "", answerOptions: [], multiLang: props.multiLang, lang }
		);
	}, [questionNumber, props.multiLang, lang]);

	const handleNextClick = () => {
		const error = questionCreateModelValidator.validateModel(questionModel);
		if (error !== null) {
			setAlert(t(error));
			return;
		}
		
		setAlert(null);

		props.questionSubmitted(questionModel);

		increaseQuestionNumber();
	}

	return (
		<Container className="justify-content-md-center">
			<h3 className='main-title'>{questionNumber.toString()}. {t("createQuiz.question.title")}</h3>

			<QuestionText multiLang={props.multiLang} onChange={setQuestionModel} />
			<QuestionAnswers multiLang={props.multiLang} onChange={setQuestionModel} /> 

			<Row className='question-btn-row'>
				<Col>
					<Button variant="secondary" size='lg' className='question-btn'>{t("createQuiz.question.prevQuestion")}</Button>
				</Col>
				<Col>
					<Button variant="secondary" size='lg' className='question-btn' onClick={handleNextClick}>{t("createQuiz.question.nextQuestion")}</Button>
				</Col>
			</Row>
			{alert !== null && 
			<Row className='alert-row'><Alert variant='danger'>{alert}</Alert></Row>}
			<Row className='finish-btn-row'>
				<Col>
					<Button variant="success" size='lg'>{t("createQuiz.question.finishQuiz")}</Button>
				</Col>
			</Row>
		</Container>
	);
}