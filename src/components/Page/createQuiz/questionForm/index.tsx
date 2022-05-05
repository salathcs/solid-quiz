import React, { useContext, useState } from 'react';
import { Props } from './types';
import './styles.scoped.css';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { TranslateContext } from '../../../../contexts/TranslateContext';
import { QuestionAnswers } from './questionAnswers';
import { QuestionCreateModel } from '../../../../models/QuestionCreateModel';
import { QuestionCreationContext } from '../../../../contexts/QuestionCreationContext';
import { QuestionNavigationButtons } from './questionNavigationButtons';
import { QuestionTextLoader } from './questionTextLoader';
import * as questionService from '../../../../services/QuestionService';

export const QuestionForm: React.FC<Props> = (props: Props) => {
	const { t, lang } = useContext(TranslateContext);
	const { questionNumber, setQuestionNumber, answerNumber, setAnswerNumber, 
		correctAnswerId, setCorrectAnswerId, getQuizContainer, isNextQuestionExists } = useContext(QuestionCreationContext);
	const [questionModel, setQuestionModel] = useState<QuestionCreateModel>(
			{ questionNumber: questionNumber, textEn: "", textHu: "", answerOptions: [], correctAnswerId: correctAnswerId.toString(), multiLang: props.multiLang, lang }
		);

	const resetQuestionModel = (questionNr: number, crAnswerId: string) => {
		setQuestionModel({ 
			questionNumber: questionNr, 
			textEn: "", 
			textHu: "", 
			answerOptions: [], 
			correctAnswerId: crAnswerId, 
			multiLang: props.multiLang, 
			lang 
		});
	}

	const setToNewEmptyForm = () => {
		resetQuestionModel(questionNumber + 1, answerNumber.toString());

		setQuestionNumber(act => act + 1);
		setCorrectAnswerId(() => answerNumber);		//answerNumber is after increase, so the current value is not in use
		setAnswerNumber(act => act + 2);			//increase to the next available (after the 2 def)	
	}

	const onPrev = () => {

		const questionsCorrectnswerId = questionService.getQuestionContainer(questionNumber - 1, getQuizContainer()).questionModel.correctAnswerId;

		resetQuestionModel(questionNumber - 1, questionsCorrectnswerId);

		setQuestionNumber(act => act - 1);
		setCorrectAnswerId(() => +(questionsCorrectnswerId));			//cast to number +()
		setAnswerNumber(() => +(questionsCorrectnswerId) + 2);			//cast to number +()
	}

	const onNext = () => {

		if (isNextQuestionExists()) {
			setToNewEmptyForm();
		}
		else{
			const questionsCorrectnswerId = questionService.getQuestionContainer(questionNumber + 1, getQuizContainer()).questionModel.correctAnswerId;

			resetQuestionModel(questionNumber + 1, questionsCorrectnswerId);

			setQuestionNumber(act => act + 1);
			setCorrectAnswerId(() => +(questionsCorrectnswerId));			//cast to number +()
			setAnswerNumber(() => +(questionsCorrectnswerId) + 2);			//cast to number +()
		}
	}

	const onNextNew = () => {
		props.questionSubmitted(questionModel);

		setToNewEmptyForm();	
	}

	const handleClickFinish = () => {
		props.finishQuiz();
	}

	return (
		<Container className="justify-content-md-center">
			<h3 className='main-title'>{questionNumber.toString()}. {t("createQuiz.question.title")}</h3>

			<QuestionTextLoader multiLang={props.multiLang} onChange={setQuestionModel} />
			<QuestionAnswers multiLang={props.multiLang} onChange={setQuestionModel} /> 

			<QuestionNavigationButtons questionModel={questionModel} onPrev={onPrev} onNext={onNext} onNextNew={onNextNew} />

			<Row className='finish-btn-row'>
				<Col>
					<Button variant="success" size='lg' onClick={handleClickFinish}>{t("createQuiz.question.finishQuiz")}</Button>
				</Col>
			</Row>
		</Container>
	);
}